import { useState } from 'react'
import { useStore } from '../store/StoreContext'
import { platforms, PlatformIcon } from '../data/platforms'
import logoUrl from '../assets/logo.png'

export default function PublicPage({ data: dataProp, preview = false }) {
  const store = useStore()
  const data = dataProp ?? store?.data

  if (!data) return null
  const { profile, links } = data
  const visible = links.filter(l => l.visible)
  const isLogo = profile.avatar === '__logo__'

  return (
    <div
      className={`relative flex items-center justify-center bg-[#0a0a0f] overflow-hidden font-sans
        ${preview ? 'min-h-[844px]' : 'min-h-screen'}`}
    >
      {/* Animated blobs — brand colors */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-[80px] animate-blob-1 -top-36 -left-36"
             style={{ background: '#1358c4' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-25 blur-[80px] animate-blob-2 -bottom-24 -right-24"
             style={{ background: '#6c6f73' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full opacity-20 blur-[80px] animate-blob-3 top-[40%] left-[55%]"
             style={{ background: '#1358c4' }} />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-[420px] mx-4 py-12 px-8 rounded-[28px] glass shadow-[0_32px_80px_rgba(0,0,0,0.5)] text-center">

        {/* Avatar */}
        <div className="relative inline-block mb-5">
          {isLogo ? (
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mx-auto overflow-hidden shadow-[0_0_0_4px_rgba(19,88,196,0.3)]">
              <img src={logoUrl} alt="logo" className="w-full h-full object-contain p-1.5" />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-[40px] mx-auto shadow-[0_0_0_6px_rgba(19,88,196,0.2)]"
                 style={{ background: 'linear-gradient(135deg, #1358c4, #6c6f73)' }}>
              {profile.avatar}
            </div>
          )}
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 rounded-full border-[3px] border-[#0a0a0f]" />
        </div>

        <h1 className="text-[1.35rem] font-bold text-slate-100 tracking-tight">{profile.name}</h1>
        <p className="text-sm text-white/40 mt-1 mb-2">{profile.handle}</p>
        <p className="text-[0.875rem] text-white/55 leading-relaxed mb-9">{profile.bio}</p>

        {/* Links */}
        <div className="flex flex-col gap-[14px]">
          {visible.map(link => <LinkBtn key={link.id} link={link} />)}
        </div>

        <p className="mt-8 text-[0.7rem] text-white/20 tracking-wide">
          Hecho con ♥ · <span className="text-white/35">jian.tree</span>
        </p>
      </div>
    </div>
  )
}

function LinkBtn({ link }) {
  const [hovered, setHovered] = useState(false)
  const p = platforms[link.platform] ?? platforms.globe

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center gap-[14px] px-5 py-4 rounded-2xl border border-white/8 overflow-hidden no-underline"
      style={{
        background: 'rgba(255,255,255,0.06)',
        transform: hovered ? 'translateY(-3px) scale(1.01)' : 'none',
        boxShadow: hovered ? `0 12px 40px ${p.shadow}` : 'none',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute inset-0 transition-opacity duration-[180ms]"
        style={{ background: p.bg, opacity: hovered ? 1 : 0 }}
      />
      <PlatformIcon platform={link.platform} size={18} className="relative z-10" />
      <div className="relative z-10 flex-1 text-left">
        <span className="block text-[0.95rem] font-semibold text-white">{link.label}</span>
        <span className="block text-[0.75rem] text-white/65 mt-0.5">{link.sub}</span>
      </div>
      <span
        className="relative z-10 text-white/40 text-lg transition-[opacity,transform] duration-[180ms]"
        style={{ opacity: hovered ? 1 : 0.4, transform: hovered ? 'translateX(3px)' : 'none' }}
      >
        →
      </span>
    </a>
  )
}
