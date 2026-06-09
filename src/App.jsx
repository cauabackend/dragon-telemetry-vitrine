import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import PageNav from './components/PageNav.jsx'

// Páginas (cada uma é uma rota real)
import Home from './pages/Home.jsx'
import Problema from './pages/Problema.jsx'
import Objetivos from './pages/Objetivos.jsx'
import Tecnologia from './pages/Tecnologia.jsx'
import Beneficios from './pages/Beneficios.jsx'
import Aplicacao from './pages/Aplicacao.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Projeto from './pages/Projeto.jsx'
import NotFound from './pages/NotFound.jsx'

// Componente raiz: menu fixo no topo, conteúdo da rota no meio e rodapé embaixo.
function App() {
  // Efeitos de imersão (sem bibliotecas):
  // 1) brilho que segue o cursor dentro dos cards;
  // 2) leve parallax do fundo de estrelas conforme o mouse se move.
  // Atualiza só variáveis CSS (não re-renderiza o React) e respeita "menos movimento".
  useEffect(() => {
    const reduzMovimento = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const root = document.documentElement
    let raf = 0

    const aoMover = (e) => {
      // Coalesce tudo em um frame: no máximo uma leitura de layout por frame.
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0

        // brilho do card sob o cursor
        const card = e.target.closest && e.target.closest('.card, .link-card')
        if (card) {
          const r = card.getBoundingClientRect()
          card.style.setProperty('--mx', `${e.clientX - r.left}px`)
          card.style.setProperty('--my', `${e.clientY - r.top}px`)
        }

        // parallax do fundo (desligado para quem prefere menos movimento)
        if (reduzMovimento) return
        const x = (e.clientX / window.innerWidth - 0.5) * 20
        const y = (e.clientY / window.innerHeight - 0.5) * 20
        root.style.setProperty('--bgx', `${x.toFixed(1)}px`)
        root.style.setProperty('--bgy', `${y.toFixed(1)}px`)
      })
    }

    window.addEventListener('pointermove', aoMover)
    return () => {
      window.removeEventListener('pointermove', aoMover)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="app">
      <Navbar />

      <main className="conteudo">
        {/* As <Routes> escolhem qual página mostrar conforme a URL */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problema" element={<Problema />} />
          <Route path="/objetivos" element={<Objetivos />} />
          <Route path="/tecnologia" element={<Tecnologia />} />
          <Route path="/beneficios" element={<Beneficios />} />
          <Route path="/aplicacao" element={<Aplicacao />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projeto" element={<Projeto />} />
          {/* Rota coringa: qualquer URL desconhecida cai na página 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Navegação sequencial (aparece só nas páginas da vitrine) */}
        <PageNav />
      </main>

      <Footer />
    </div>
  )
}

export default App
