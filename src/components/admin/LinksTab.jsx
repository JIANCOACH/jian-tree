import { useRef, useState } from 'react'
import { useStore } from '../../store/StoreContext'
import StatsBar from './StatsBar'
import LinkCard from './LinkCard'
import AddLinkModal from './AddLinkModal'

export default function LinksTab() {
  const { data, setLinks } = useStore()
  const { links } = data
  const [showModal, setShowModal] = useState(false)
  const dragIdx = useRef(null)

  function updateLink(id, patch) {
    setLinks(links.map(l => l.id === id ? { ...l, ...patch } : l))
  }

  function deleteLink(id) {
    if (!confirm('¿Eliminar este link?')) return
    setLinks(links.filter(l => l.id !== id))
  }

  function addLink(newLink) {
    setLinks([...links, newLink])
  }

  // Drag & drop handlers
  function onDragStart(e, index) {
    dragIdx.current = index
    e.currentTarget.style.opacity = '0.45'
    e.dataTransfer.effectAllowed = 'move'
  }

  function onDragOver(e, index) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    // Highlight target
    document.querySelectorAll('[data-drag-card]').forEach((el, i) => {
      el.style.borderColor = i === index && index !== dragIdx.current
        ? 'rgb(139 92 246)'
        : ''
    })
  }

  function onDrop(e, index) {
    e.preventDefault()
    resetDragStyles()
    if (dragIdx.current === null || dragIdx.current === index) return
    const next = [...links]
    const [moved] = next.splice(dragIdx.current, 1)
    next.splice(index, 0, moved)
    dragIdx.current = null
    setLinks(next)
  }

  function onDragLeave(e) {
    e.currentTarget.style.borderColor = ''
  }

  function onDragEnd(e) {
    e.currentTarget.style.opacity = ''
    resetDragStyles()
    dragIdx.current = null
  }

  function resetDragStyles() {
    document.querySelectorAll('[data-drag-card]').forEach(el => { el.style.borderColor = ''; el.style.opacity = '' })
  }

  return (
    <div>
      <StatsBar links={links} />

      <div className="flex items-center justify-between mb-4">
        <span className="text-[0.72rem] font-semibold uppercase tracking-widest text-white/40">
          Tus links
        </span>
        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-1.5 text-[0.8rem] font-semibold rounded-[10px] bg-violet-600 text-white
            hover:bg-violet-700 hover:-translate-y-px transition-all duration-150 cursor-pointer border-none"
        >
          + Agregar
        </button>
      </div>

      <div className="flex flex-col gap-2.5">
        {links.length === 0 ? (
          <div className="text-center py-12 text-white/30">
            <div className="text-4xl mb-3">🔗</div>
            <p className="text-[0.88rem]">Sin links todavía.<br />¡Agrega el primero!</p>
          </div>
        ) : (
          links.map((link, i) => (
            <div key={link.id} onDragEnd={onDragEnd}>
              <LinkCard
                link={link}
                index={i}
                onUpdate={patch => updateLink(link.id, patch)}
                onDelete={() => deleteLink(link.id)}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onDragLeave={onDragLeave}
              />
            </div>
          ))
        )}
      </div>

      {showModal && (
        <AddLinkModal onAdd={addLink} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}
