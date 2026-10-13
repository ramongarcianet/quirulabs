type ContactPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  message?: unknown;
};

const clean = (value: unknown, maxLength: number) =>
  String(value ?? "").trim().slice(0, maxLength);

const stringValue = (value: string) => ({ stringValue: value });

export async function saveContact(data: ContactPayload) {
  const apiKey = process.env.FIREBASE_API_KEY;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const databaseId = process.env.FIREBASE_DATABASE_ID || "(default)";

  if (!apiKey || !projectId) {
    console.error("Firebase contact configuration is incomplete");
    return false;
  }

  const collectionId = "quirulabs_consultas";
  const endpoint =
    `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}` +
    `/databases/${encodeURIComponent(databaseId)}/documents/${collectionId}` +
    `?key=${encodeURIComponent(apiKey)}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: {
        nombre: stringValue(clean(data.name, 120)),
        empresa: stringValue(clean(data.company, 160)),
        email: stringValue(clean(data.email, 160).toLowerCase()),
        telefono: stringValue(clean(data.phone, 60)),
        servicioInteres: stringValue(clean(data.service, 120)),
        mensaje: stringValue(clean(data.message, 5000)),
        estado: stringValue("nueva"),
        origen: stringValue("sitio_web"),
        creadoEn: { timestampValue: new Date().toISOString() },
      },
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const failure = await response.json().catch(() => null);
    console.error("Firestore contact write failed", {
      status: response.status,
      code: failure?.error?.status,
    });
  }

  return response.ok;
}
