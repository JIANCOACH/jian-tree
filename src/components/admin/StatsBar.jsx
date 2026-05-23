export default function StatsBar({ links }) {
  const total   = links.length
  const visible = links.filter(l => l.visible).length
  const hidden  = total - visible

  const stats = [
    { num: total,   label: 'Links totales' },
    { num: visible, label: 'Visibles' },
    { num: hidden,  label: 'Ocultos' },
  ]

  return (
    <div className="flex gap-3 mb-5">
      {stats.map(s => (
        <div key={s.label} className="flex-1 bg-[#1e1e2e] border border-white/[0.08] rounded-xl px-4 py-3">
          <div className="text-[1.5rem] font-bold text-slate-100">{s.num}</div>
          <div className="text-[0.72rem] text-white/40 mt-0.5">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
