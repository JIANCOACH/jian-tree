import { useStore } from '../../store/StoreContext'
import { AVATARS } from '../../data/platforms'
import logoUrl from '../../assets/logo.png'

export default function ProfileTab() {
  const { data, updateProfile, save } = useStore()
  const { profile } = data

  return (
    <div>
      <p className="text-[0.72rem] font-semibold uppercase tracking-widest text-white/40 mb-5">
        Perfil público
      </p>

      {/* Avatar picker */}
      <div className="mb-5">
        <Label>Avatar</Label>
        <div className="flex flex-wrap gap-2 mt-2">

          {/* Logo option */}
          <button
            onClick={() => updateProfile({ avatar: '__logo__' })}
            title="Logo oficial"
            className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center cursor-pointer
              bg-white transition-all duration-150 overflow-hidden
              ${profile.avatar === '__logo__'
                ? 'border-violet-500 ring-2 ring-violet-500/30'
                : 'border-white/[0.08] hover:border-violet-500/50 hover:scale-105'
              }`}
          >
            <img src={logoUrl} alt="logo" className="w-full h-full object-contain p-0.5" />
          </button>

          {/* Emoji options */}
          {AVATARS.map(emoji => (
            <button
              key={emoji}
              onClick={() => updateProfile({ avatar: emoji })}
              className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center text-[22px] cursor-pointer
                bg-[#1e1e2e] transition-all duration-150
                ${emoji === profile.avatar
                  ? 'border-violet-500 bg-violet-500/15'
                  : 'border-white/[0.08] hover:border-violet-500/50 hover:scale-105'
                }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <Field label="Nombre">
        <Input
          value={profile.name}
          onChange={e => updateProfile({ name: e.target.value })}
          placeholder="Tu nombre"
        />
      </Field>

      <Field label="Handle">
        <Input
          value={profile.handle}
          onChange={e => updateProfile({ handle: e.target.value })}
          placeholder="@tuusuario"
        />
      </Field>

      <Field label="Bio">
        <textarea
          value={profile.bio}
          onChange={e => updateProfile({ bio: e.target.value })}
          placeholder="Cuéntale algo a tu audiencia..."
          rows={3}
          className="w-full bg-[#1e1e2e] border border-white/[0.08] rounded-[10px] px-3.5 py-2.5
            text-[0.88rem] text-slate-200 font-sans outline-none resize-y
            focus:border-violet-500 transition-colors duration-150 min-h-[76px]"
        />
      </Field>

      <button
        onClick={save}
        className="mt-2 px-5 py-2 bg-violet-600 text-white text-[0.83rem] font-semibold rounded-[10px]
          hover:bg-violet-700 hover:-translate-y-px transition-all duration-150 cursor-pointer border-none"
      >
        Guardar cambios
      </button>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div className="mb-[18px]">
      <Label>{label}</Label>
      {children}
    </div>
  )
}

function Label({ children }) {
  return (
    <label className="block text-[0.8rem] font-medium text-white/65 mb-1.5">
      {children}
    </label>
  )
}

function Input({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-[#1e1e2e] border border-white/[0.08] rounded-[10px] px-3.5 py-2.5
        text-[0.88rem] text-slate-200 outline-none
        focus:border-violet-500 transition-colors duration-150"
    />
  )
}
