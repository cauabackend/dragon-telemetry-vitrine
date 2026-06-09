import { Link, useLocation } from 'react-router-dom'

// Navegação sequencial da vitrine (anterior / próxima), para dar
// "momentum" à jornada. Dashboard e 404 ficam de fora.
const SEQUENCIA = [
  { para: '/', titulo: 'Início' },
  { para: '/problema', titulo: 'O Problema' },
  { para: '/objetivos', titulo: 'Objetivos' },
  { para: '/tecnologia', titulo: 'Tecnologia' },
  { para: '/beneficios', titulo: 'Benefícios' },
  { para: '/aplicacao', titulo: 'Aplicação' },
  { para: '/projeto', titulo: 'Projeto Integrado' },
]

function PageNav() {
  const { pathname } = useLocation()
  const i = SEQUENCIA.findIndex((p) => p.para === pathname)
  if (i === -1) return null // não aparece no Dashboard nem na 404

  const anterior = i > 0 ? SEQUENCIA[i - 1] : null
  const proximo = i < SEQUENCIA.length - 1 ? SEQUENCIA[i + 1] : null

  return (
    <nav className="page-nav" aria-label="Navegação entre páginas">
      {anterior ? (
        <Link to={anterior.para} className="pn-ant">
          <span className="pn-rotulo">← Anterior</span>
          <span className="pn-titulo">{anterior.titulo}</span>
        </Link>
      ) : (
        <span />
      )}

      {proximo ? (
        <Link to={proximo.para} className="pn-prox">
          <span className="pn-rotulo">Próxima →</span>
          <span className="pn-titulo">{proximo.titulo}</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}

export default PageNav
