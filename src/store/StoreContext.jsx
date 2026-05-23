import { createContext, useCallback, useContext, useState } from 'react'
import { defaultData } from '../data/defaults'

const StoreCtx = createContext(null)

function load() {
  try {
    const s = localStorage.getItem('jiantree')
    return s ? JSON.parse(s) : structuredClone(defaultData)
  } catch {
    return structuredClone(defaultData)
  }
}

export function StoreProvider({ children }) {
  const [data, setData] = useState(load)

  const updateProfile = useCallback((patch) => {
    setData(d => ({ ...d, profile: { ...d.profile, ...patch } }))
  }, [])

  const setLinks = useCallback((links) => {
    setData(d => ({ ...d, links }))
  }, [])

  const save = useCallback(() => {
    setData(current => {
      localStorage.setItem('jiantree', JSON.stringify(current))
      return current
    })
  }, [])

  return (
    <StoreCtx.Provider value={{ data, updateProfile, setLinks, save }}>
      {children}
    </StoreCtx.Provider>
  )
}

export const useStore = () => useContext(StoreCtx)
