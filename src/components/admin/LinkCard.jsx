import { useState } from 'react'
import { platforms, PlatformIcon } from '../../data/platforms'

export default function LinkCard({ link, index, onUpdate, onDelete, onDragStart, onDragOver, onDrop, onDragLeave }) {
  const [open, setOpen] = useState(false)
  const p = platforms[link.platform] ?? platforms.globe

  return (
    <div
      draggable
      onDragStart={e => onDragStart(e, index)}
      onDragOver={e => onDragOver(e, index)}
      onDrop={e => onDrop(e, index)}
      onDragLeave={onDragLeave}
      className={`rounded-[13px] border overflow-hidden transition-colors duration-150
        ${link.visible ? '' : 'opacity-50'}
        border-white/[0.08] bg-[#1e1e2e]`}
      data-drag-card
    >
      {/* Header row */}
      <div
        className="flex items-center px-4 py-3.5 gap-3 cursor-pointer select-none"
        onClick={() => setOpen(o => !o)}
      >
        {/* Drag handle */}
        <span
          className="text-white/30 cursor-grab active:cursor-grabbing text-base px-1 flex-shrink-0"
          onClick={e => e.stopPropagation()}
          onMouseDown={e => e.stopPropagation()}
        >
          ⠿
        </span>

        <PlatformIcon platform={link.platform} size={17} />

        <div className="flex-1 min-w-0">
          <div className="text-[0.88rem] font-semibold truncate">{link.label}</div>
          <div className="text-[0.73rem] text-white/40 truncate mt-0.5">{link.url || 'Sin URL'}</div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0" onClick={e => e.stopPropagation()}>
          {/* Toggle visible */}
          <label className="relative w-9 h-5 flex-shrink-0 cursor-pointer">
            <input
              type="checkbox"
              checked={link.visible}
              onChange={e => onUpdate({ visible: e.target.checked })}
              className="sr-only peer"
            />
            <span className="absolute inset-0 rounded-full bg-white/10 peer-checked:bg-violet-600 transition-colors duration-200" />
            <span className="absolute top-[3px] left-[3px] w-3.5 h-3.5 rounded-full bg-white transition-transform duration-200 peer-checked:translate-x-4" />
          </label>

          {/* Delete */}
          <button
            onClick={() => onDelete()}
            className="w-[30px] h-[30px] rounded-[7px] flex items-center justify-center text-[0.85rem]
              text-white/30 hover:bg-red-500/15 hover:text-red-400 transition-all duration-150 cursor-pointer border-none bg-transparent"
            title="Eliminar"
          >
            🗑
          </button>
        </div>

        <span
          className="text-white/30 text-[0.75rem] transition-transform duration-200 flex-shrink-0"
          style={{ transform: open ? 'rotate(180deg)' : 'none' }}
        >
          ▾
        </span>
      </div>

      {/* Expanded body */}
      {open && (
        <div className="px-4 pb-4 border-t border-white/[0.08]">
          <div className="mt-4 space-y-4">
            {/* Platform select */}
            <Field label="Plataforma">
              <select
                value={link.platform}
                onChange={e => {
                  const pl = platforms[e.target.value] ?? platforms.globe
                  onUpdate({ platform: e.target.value, label: pl.defaultLabel, sub: pl.defaultSub })
                }}
                className="w-full bg-[#1e1e2e] border border-white/[0.08] rounded-[10px] px-3.5 py-2.5
                  text-[0.88rem] text-slate-200 outline-none focus:border-violet-500 transition-colors
                  duration-150 cursor-pointer"
              >
                {Object.entries(platforms).map(([k, pl]) => (
                  <option key={k} value={k} style={{ background: '#1e1e2e' }}>{pl.name}</option>
                ))}
              </select>
            </Field>

            <Field label="Etiqueta">
              <TextInput value={link.label} onChange={v => onUpdate({ label: v })} placeholder="Nombre del link" />
            </Field>

            <Field label="Subtítulo">
              <TextInput value={link.sub} onChange={v => onUpdate({ sub: v })} placeholder="Descripción corta" />
            </Field>

            <Field label="URL">
              <TextInput value={link.url} onChange={v => onUpdate({ url: v })} placeholder={p.placeholder} type="url" />
            </Field>

            <button
              onClick={() => onDelete()}
              className="px-3 py-1.5 text-[0.8rem] font-semibold rounded-[10px] cursor-pointer border-none
                bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors duration-150"
            >
              Eliminar link
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-[0.8rem] font-medium text-white/65 mb-1.5">{label}</label>
      {children}
    </div>
  )
}

function TextInput({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[#1e1e2e] border border-white/[0.08] rounded-[10px] px-3.5 py-2.5
        text-[0.88rem] text-slate-200 outline-none focus:border-violet-500 transition-colors duration-150"
    />
  )
}
