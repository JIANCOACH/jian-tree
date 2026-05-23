export default function Navbar({ onSave }) {
  return (
    <nav className="h-[60px] bg-[#16161f] border-b border-white/[0.08] flex items-center px-6 gap-3 flex-shrink-0">
      <div className="flex items-center gap-2 text-[1.05rem] font-bold">
        <span>🌿</span>
        <span>jian<span className="text-violet-400">.tree</span></span>
        <span className="text-[0.62rem] px-2 py-0.5 bg-violet-600 rounded-full font-semibold tracking-wider uppercase">
          Admin
        </span>
      </div>

      <div className="flex-1" />

      <a
        href="/"
        target="_blank"
        rel="noopener"
        className="px-3 py-1.5 text-[0.8rem] font-semibold rounded-[10px] border border-white/[0.08] text-white/40
          hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-150 no-underline"
      >
        ↗ Ver sitio
      </a>

      <button
        onClick={onSave}
        className="px-4 py-1.5 text-[0.83rem] font-semibold rounded-[10px] bg-violet-600 text-white
          hover:bg-violet-700 hover:-translate-y-px active:translate-y-0 transition-all duration-150 cursor-pointer border-none"
      >
        Guardar
      </button>
    </nav>
  )
}
