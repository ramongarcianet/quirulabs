import { NextResponse } from "next/server";
import { saveContact } from "@/lib/firestore-contact";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (data.website) return NextResponse.json({ ok: true });
    if (!data.name || String(data.name).trim().length < 2) return NextResponse.json({ error: "Ingresa un nombre válido de al menos 2 caracteres." }, { status: 400 });
    if (!emailPattern.test(String(data.email || "").trim())) return NextResponse.json({ error: "Ingresa una dirección de email válida." }, { status: 400 });
    if (String(data.message || "").trim().length < 10) return NextResponse.json({ error: "El mensaje debe tener al menos 10 caracteres." }, { status: 400 });
    const elapsed = Date.now() - Number(data.startedAt || 0); if (!Number.isFinite(elapsed) || elapsed < 2500) return NextResponse.json({ error: "No pudimos validar el formulario. Inténtalo nuevamente." }, { status: 429 });
    const saved = await saveContact(data);
    if (!saved) return NextResponse.json({ error: "No pudimos registrar tu consulta. Inténtalo más tarde." }, { status: 502 });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch { return NextResponse.json({ error: "No pudimos procesar tu consulta." }, { status: 500 }); }
}
