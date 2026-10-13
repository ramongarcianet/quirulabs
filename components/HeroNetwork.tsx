const nodes = [
  { label: "AI Agents", x: 13, y: 22 }, { label: "RAG", x: 72, y: 14 }, { label: "Software", x: 78, y: 68 },
  { label: "Data", x: 14, y: 72 }, { label: "Automation", x: 45, y: 88 }, { label: "LLM", x: 44, y: 7 }, { label: "APIs", x: 91, y: 40 }
];
export default function HeroNetwork() {
  return <div className="network-wrap" aria-label="Red de capacidades de QUIRU AI" role="img"><div className="network-grid" />
    <svg className="network-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{nodes.map((n) => <line key={n.label} x1="50" y1="48" x2={n.x} y2={n.y} />)}</svg>
    <div className="core"><span className="core-pulse" /><small>INTELLIGENCE LAYER</small><b>QUIRU AI</b><em>Business · Data · Software</em></div>
    {nodes.map((n, i) => <div className="network-node" key={n.label} style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${i * -.8}s` }}><i />{n.label}</div>)}
    <div className="signal-card"><span>System status</span><b><i /> Connected</b></div>
  </div>;
}
