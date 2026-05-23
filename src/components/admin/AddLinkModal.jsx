import { useState } from 'react'
import { platforms, PlatformIcon } from '../../data/platforms'

export default function AddLinkModal({ onAdd, onClose }) {
  const [selPlat, setSelPlat] = useState('instagram')
  const [label, setLabel]     = useState('')
  const [url, setUrl]         = useState('')

  function handleAdd() {
    const p = platforms[selPlat] ?? platforms.globe
    onAdd({
      id: Date.now().toString(),
      platform: selPlat,
      label: label.trim() || p.defaultLabel,
      sub: p.defaultSub,
      url: url.trim(),
      visible: true,
    })
    onClose()
  }

  const p = platforms[selPlat] ?? platforms.globe

  return (
    <div
      className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#16161f] border border-white/[0.08] rounded-[20px] p-7 w-full max-w-[440px] shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
        <h2 className="text-[1.05rem] font-bold mb-5">Agregar link</h2>

        {/* Platform grid */}
        <label className="block text-[0.8rem] font-medium text-white/65 mb-2">Plataforma</label>
        <div className="grid grid-cols-4 gap-2 mb-5">
          {Object.entries(platforms).map(([key, pl]) => (
            <button
              key={key}
              onClick={() => setSelPlat(key)}
              className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 cursor-pointer
                bg-[#1e1e2e] transition-all duration-150
                ${key === selPlat
                  ? 'border-violet-500 bg-violet-500/15'
                  : 'border-white/[0.08] hover:border-violet-500/40 hover:scale-[1.03]'
                }`}
            >
              <PlatformIcon platform={key} size={17} />
              <span className={`text-[0.65rem] font-medium text-center leading-tight
                ${key === selPlat ? 'text-slate-200' : 'text-white/40'}`}>
                {pl.name}
              </span>
            </button>
          ))}
        </div>

        {/* Label */}
        <div className="mb-4">
          <label className="block text-[0.8rem] font-medium text-white/65 mb-1.5">
            Etiqueta <span className="text-white/30 font-normal">(opcional)</span>
          </label>
          <input
            type="text"
            value={label}
            onChange={e => setLabel(e.target.value)}
            placeholder={`Ej: ${p.defaultLabel}`}
            className="w-full bg-[#1e1e2e] border border-white/[0.08] rounded-[10px] px-3.5 py-2.5
              text-[0.88rem] text-slate-200 outline-none focus:border-violet-500 transition-colors duration-150"
          />
        </div>

        {/* URL */}
        <div className="mb-6">
          <label className="block text-[0.8rem] font-medium text-white/65 mb-1.5">URL</label>
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder={p.placeholder}
            className="w-full bg-[#1e1e2e] border border-white/[0.08] rounded-[10px] px-3.5 py-2.5
              text-[0.88rem] text-slate-200 outline-none focus:border-violet-500 transition-colors duration-150"
          />
        </div>

        {/* Footer */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[0.83rem] font-semibold rounded-[10px] bg-transparent
              border border-white/[0.08] text-white/40 hover:text-white hover:border-white/20
              hover:bg-white/5 transition-all duration-150 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 text-[0.83rem] font-semibold rounded-[10px] bg-violet-600 text-white
              hover:bg-violet-700 transition-colors duration-150 cursor-pointer border-none"
          >
            Agregar link
          </button>
        </div>
      </div>
    </div>
  )
}
