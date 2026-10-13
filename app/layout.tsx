import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://quirulabs.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "QUIRU Labs | Inteligencia Artificial y Desarrollo de Software",
  description: "Soluciones de Inteligencia Artificial, agentes de IA, automatización, desarrollo de software y analítica para empresas. Transformamos desafíos empresariales en soluciones inteligentes.",
  keywords: ["Inteligencia Artificial Perú", "Desarrollo de software", "Agentes de IA", "IA Generativa", "Automatización empresarial", "Consultoría IA", "RAG", "Machine Learning", "Software empresarial", "QUIRU Labs"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "es_PE", url: siteUrl,
    title: "QUIRU Labs | AI & Software Solutions",
    description: "Negocio, tecnología e Inteligencia Artificial para resolver desafíos reales.",
    siteName: "QUIRU Labs",
    images: [{ url: "/images/agent-platform.png", width: 1456, height: 1092, alt: "QUIRU Labs — AI & Software Solutions" }]
  },
  twitter: { card: "summary_large_image", title: "QUIRU Labs", description: "Transformamos desafíos empresariales en soluciones inteligentes.", images: ["/images/agent-platform.png"] },
  icons: { icon: "/favicon.svg" }
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#071B40" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { "@context": "https://schema.org", "@type": "Organization", name: "QUIRU Labs", url: siteUrl, logo: `${siteUrl}/images/quiru-labs-logo.png`, description: "AI & Software Solutions", areaServed: "PE", knowsAbout: ["Artificial Intelligence", "Software Engineering", "Machine Learning", "Data Analytics", "Automation"] };
  return <html lang="es"><body className={`${inter.variable} ${manrope.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />{children}</body></html>;
}
