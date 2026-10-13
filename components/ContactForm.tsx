"use client";
import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";

const services = ["Inteligencia Artificial", "Agentes de IA", "Automatización", "Desarrollo de Software", "Datos y Analítica", "Consultoría", "Desarrollo de Producto", "Otro"];
export default function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle"); const [message, setMessage] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) { e.preventDefault(); setState("loading"); setMessage(""); const form = e.currentTarget; const body = Object.fromEntries(new FormData(form));
    try { const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }); const data = await res.json(); if (!res.ok) throw new Error(data.error || "No pudimos procesar la consulta."); setState("success"); setMessage("Recibimos tu consulta. Te responderemos lo antes posible."); form.reset(); }
    catch (err) { setState("error"); setMessage(err instanceof Error ? err.message : "Ocurrió un error. Inténtalo nuevamente."); }
  }
  return <form className="contact-form" onSubmit={submit} noValidate><div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="field-row"><label>Nombre *<input name="name" required minLength={2} autoComplete="name" placeholder="Tu nombre" /></label><label>Empresa<input name="company" autoComplete="organization" placeholder="Nombre de tu empresa" /></label></div>
    <div className="field-row"><label>Email *<input type="email" name="email" required autoComplete="email" placeholder="tu@empresa.com" /></label><label>Teléfono<input name="phone" autoComplete="tel" placeholder="+51 999 999 999" /></label></div>
    <label>Servicio de interés<select name="service" defaultValue=""><option value="" disabled>Selecciona una opción</option>{services.map(s => <option key={s}>{s}</option>)}</select></label>
    <label>Mensaje *<textarea name="message" required minLength={20} rows={5} placeholder="Cuéntanos qué quieres mejorar, automatizar o construir." /></label>
    <input type="hidden" name="startedAt" value={Date.now()} />
    <button className="button form-button" disabled={state === "loading"}>{state === "loading" ? <Loader2 className="spin" size={18} /> : null}Enviar consulta <ArrowUpRight size={18} /></button>
    {message && <p className={`form-status ${state}`} role="status">{state === "success" && <CheckCircle2 size={18} />}{message}</p>}
  </form>;
}
