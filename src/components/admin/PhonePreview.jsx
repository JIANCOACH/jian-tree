import { useStore } from '../../store/StoreContext'
import PublicPage from '../../pages/PublicPage'

export default function PhonePreview() {
  const { data } = useStore()

  return (
    <div className="w-[370px] flex-shrink-0 bg-[#08080f] border-l border-white/[0.08] flex flex-col items-center justify-center gap-4 p-5">
      <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-white/30 self-start">
        Vista previa
      </span>

      {/* Phone frame */}
      <div
        className="relative rounded-[36px] bg-[#111] overflow-hidden flex-shrink-0"
        style={{
          width: 260,
          height: 548,
          border: '3px solid #252535',
          boxShadow: '0 40px 100px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        {/* Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[72px] h-[18px] bg-[#111] rounded-b-xl z-10" />

        {/* Scaled content */}
        <div
          style={{
            width: 390,
            height: 844,
            transform: 'scale(0.6667)',
            transformOrigin: 'top left',
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          <PublicPage data={data} preview />
        </div>
      </div>

      <a
        href="/"
        target="_blank"
        rel="noopener"
        className="px-3 py-1.5 text-[0.8rem] font-semibold rounded-[10px] border border-white/[0.08]
          text-white/40 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-150
          no-underline"
      >
        ↗ Abrir sitio
      </a>
    </div>
  )
}
