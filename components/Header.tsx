"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";

const links = [["Inicio", "#inicio"], ["Soluciones", "#soluciones"], ["IA", "#ia"], ["Industrias", "#industrias"], ["Proyectos", "#proyectos"], ["Nosotros", "#nosotros"], ["Contacto", "#contacto"]];

export function Logo() {
  return <a className="logo" href="/#inicio" aria-label="QUIRU Labs, inicio"><Image className="logo-image" src="/images/quiru-labs-logo.png" alt="QUIRU Labs — AI & Software Solutions" width={2048} height={768} priority /></a>;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 24); fn(); addEventListener("scroll", fn, { passive: true }); return () => removeEventListener("scroll", fn); }, []);
  return <header className={`header ${scrolled ? "scrolled" : ""}`}><div className="nav-shell"><Logo />
    <nav className={open ? "nav-links open" : "nav-links"} aria-label="Navegación principal">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a className="button button-small nav-mobile-cta" href="#contacto" onClick={() => setOpen(false)}>Hablemos <ArrowUpRight size={16} /></a></nav>
    <a className="button button-small nav-cta" href="#contacto">Hablemos de tu proyecto <ArrowUpRight size={16} /></a>
    <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
  </div></header>;
}
