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

export async function saveContactFromBrowser(data: ContactPayload) {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const databaseId = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID || "(default)";

  if (!apiKey || !projectId) throw new Error("La configuración de contacto no está disponible.");

  const endpoint =
    `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}` +
    `/databases/${encodeURIComponent(databaseId)}/documents/quirulabs_consultas` +
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
  });

  if (!response.ok) throw new Error("No pudimos registrar tu consulta. Inténtalo más tarde.");
}
