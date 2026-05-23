import { HashRouter, Routes, Route } from 'react-router-dom'
import { StoreProvider } from './store/StoreContext'
import PublicPage from './pages/PublicPage'
import AdminPage from './pages/AdminPage'

export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<PublicPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </HashRouter>
    </StoreProvider>
  )
}
