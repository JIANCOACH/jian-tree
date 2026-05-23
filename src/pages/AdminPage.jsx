import { useState } from 'react'
import { useStore } from '../store/StoreContext'
import Navbar from '../components/admin/Navbar'
import LinksTab from '../components/admin/LinksTab'
import ProfileTab from '../components/admin/ProfileTab'
import PhonePreview from '../components/admin/PhonePreview'

const TABS = [
  { id: 'links',   label: '🔗 Links' },
  { id: 'profile', label: '👤 Perfil' },
]

export default function AdminPage() {
  const [tab, setTab] = useState('links')
  const { save } = useStore()

  return (
    <div className="flex flex-col h-screen bg-[#0d0d14] text-slate-200 font-sans overflow-hidden">
      <Navbar onSave={save} />

      <div className="flex flex-1 overflow-hidden">
        {/* Edit area */}
        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
          {/* Tabs */}
          <div className="flex border-b border-white/[0.08] bg-[#16161f] flex-shrink-0">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-4 text-[0.86rem] font-medium border-b-2 -mb-px transition-colors duration-150 cursor-pointer bg-transparent
                  ${tab === t.id
                    ? 'text-violet-400 border-violet-500'
                    : 'text-white/40 border-transparent hover:text-white/70'
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-7 scrollbar-thin">
            {tab === 'links'   && <LinksTab />}
            {tab === 'profile' && <ProfileTab />}
          </div>
        </div>

        {/* Preview */}
        <PhonePreview />
      </div>
    </div>
  )
}
