import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

// Marca/logo desenhada em SVG (cápsula + sinal de telemetria).
function LogoMarca() {
  return (
    <svg className="logo-marca" width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2c3.2 2.8 4.6 6.4 4.6 10.8 0 2.4-.5 4.3-1.5 6L12 22l-3.1-3.2c-1-1.7-1.5-3.6-1.5-6C7.4 8.4 8.8 4.8 12 2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.4" fill="currentColor" />
    </svg>
  )
}

// Links de marketing (vitrine). O Dashboard fica separado como CTA.
const LINKS = [
  { para: '/', texto: 'Início' },
  { para: '/problema', texto: 'Problema' },
  { para: '/objetivos', texto: 'Objetivos' },
  { para: '/tecnologia', texto: 'Tecnologia' },
  { para: '/beneficios', texto: 'Benefícios' },
  { para: '/aplicacao', texto: 'Aplicação' },
  { para: '/projeto', texto: 'Projeto' },
]

// Menu fixo no topo, presente em todas as páginas.
function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false)
  const fecharMenu = () => setMenuAberto(false)

  return (
    <header className="navbar">
      <div className="navbar-interno container">
        <Link to="/" className="navbar-logo" onClick={fecharMenu}>
          <LogoMarca />
          <span className="logo-texto">
            Dragon<strong>Telemetry</strong>
          </span>
        </Link>

        <button
          className="navbar-hamburguer"
          aria-label="Abrir ou fechar o menu"
          aria-expanded={menuAberto}
          aria-controls="menu-principal"
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          <span className={menuAberto ? 'barra barra-1' : 'barra'}></span>
          <span className={menuAberto ? 'barra barra-2' : 'barra'}></span>
          <span className={menuAberto ? 'barra barra-3' : 'barra'}></span>
        </button>

        <nav
          id="menu-principal"
          className={menuAberto ? 'navbar-links aberto' : 'navbar-links'}
        >
          {LINKS.map((link) => (
            <NavLink
              key={link.para}
              to={link.para}
              end={link.para === '/'}
              onClick={fecharMenu}
              className={({ isActive }) =>
                isActive ? 'nav-link ativo' : 'nav-link'
              }
            >
              {link.texto}
            </NavLink>
          ))}

          {/* Dashboard é o produto: vira um botão de destaque (CTA) */}
          <NavLink
            to="/dashboard"
            onClick={fecharMenu}
            aria-label="Abrir Dashboard ao vivo"
            className={({ isActive }) => (isActive ? 'nav-cta ativo' : 'nav-cta')}
          >
            <span className="ponto" aria-hidden="true"></span>
            Dashboard
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
