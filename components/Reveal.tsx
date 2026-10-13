"use client";
import { useEffect, useRef, useState } from "react";
export default function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null); const [visible, setVisible] = useState(false);
  useEffect(() => { const node = ref.current; if (!node) return; const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); ob.disconnect(); } }, { threshold: .12 }); ob.observe(node); return () => ob.disconnect(); }, []);
  return <div ref={ref} className={`reveal ${visible ? "revealed" : ""} ${className}`}>{children}</div>;
}
