"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { saveContactFromBrowser } from "@/lib/firestore-contact-client";

const services = [
  "Inteligencia Artificial",
  "Agentes de IA",
  "Automatización",
  "Desarrollo de Software",
  "Datos y Analítica",
  "Consultoría",
  "Desarrollo de Producto",
  "Otro",
];

export default function ContactFormValidated() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const body = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    setState("loading");
    setStatusMessage("");

    try {
      await saveContactFromBrowser(body);

      setState("success");
      setStatusMessage("Recibimos tu consulta. Te responderemos lo antes posible.");
      form.reset();
    } catch (error) {
      setState("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Ocurrió un error. Inténtalo nuevamente.",
      );
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="field-row">
        <label>
          Nombre *
          <input name="name" required minLength={2} maxLength={120} autoComplete="name" placeholder="Tu nombre" />
        </label>
        <label>
          Empresa
          <input name="company" maxLength={160} autoComplete="organization" placeholder="Nombre de tu empresa" />
        </label>
      </div>

      <div className="field-row">
        <label>
          Email *
          <input type="email" name="email" required maxLength={160} autoComplete="email" placeholder="tu@empresa.com" />
        </label>
        <label>
          Teléfono
          <input name="phone" maxLength={60} autoComplete="tel" placeholder="+51 999 999 999" />
        </label>
      </div>

      <label>
        Servicio de interés
        <select name="service" defaultValue="">
          <option value="" disabled>Selecciona una opción</option>
          {services.map((service) => <option key={service}>{service}</option>)}
        </select>
      </label>

      <label>
        Mensaje *
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder="Cuéntanos qué quieres mejorar, automatizar o construir (mínimo 10 caracteres)."
        />
      </label>

      <button className="button form-button" disabled={state === "loading"}>
        {state === "loading" && <Loader2 className="spin" size={18} />}
        {state === "loading" ? "Enviando…" : "Enviar consulta"}
        {state !== "loading" && <ArrowUpRight size={18} />}
      </button>

      {statusMessage && (
        <p className={`form-status ${state}`} role="status">
          {state === "success" && <CheckCircle2 size={18} />}
          {statusMessage}
        </p>
      )}
    </form>
  );
}
