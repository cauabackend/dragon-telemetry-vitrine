import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import Counter from '../components/Counter.jsx'

// Objetivos divididos em 2 grupos: operação (tempo real) e fundação.
const OBJETIVOS = [
  { titulo: 'Monitorar em tempo real', texto: 'Temperatura, pressão e velocidade exibidas continuamente.' },
  { titulo: 'Detectar anomalias', texto: 'Cada leitura é classificada em Normal, Alerta ou Crítico.' },
  { titulo: 'Avisar a equipe', texto: 'Alertas visuais e sonoros no instante do valor crítico.' },
  { titulo: 'Registrar o histórico', texto: 'Leituras guardadas com mínimo, máximo e média.' },
  { titulo: 'Integrar disciplinas', texto: 'Front-End, Edge e Python numa só solução coesa.' },
  { titulo: 'Acessível e responsivo', texto: 'Funciona em desktop, tablet e celular, com acessibilidade.' },
]

// Circunferência do anel do gauge (2 · π · raio, com raio = 26)
const CIRC = 163.36

// Card com mostrador radial (gauge) animado.
function CardObjetivo({ indice }) {
  const o = OBJETIVOS[indice]
  const numero = String(indice + 1).padStart(2, '0')
  // O anel preenche proporcional ao número do objetivo (progressão da missão).
  const alvo = (CIRC * (1 - (indice + 1) / OBJETIVOS.length)).toFixed(2)

  return (
    <Reveal
      className="card card-gauge"
      delay={(indice % 3) * 90}
      style={{ '--alvo': alvo }}
    >
      <div className="gauge">
        <svg viewBox="0 0 70 70" aria-hidden="true">
          <circle className="gauge-ring" cx="35" cy="35" r="26" />
          <circle className="gauge-arc" cx="35" cy="35" r="26" />
        </svg>
        <span className="gauge-num">{numero}</span>
      </div>
      <h3 className="card-titulo">{o.titulo}</h3>
      <p className="card-descricao">{o.texto}</p>
    </Reveal>
  )
}

function Objetivos() {
  return (
    <div className="pagina container">
      <Reveal as="header" className="cabecalho-pagina">
        <span className="kicker">As metas da missão</span>
        <h1 className="cabecalho-titulo">Objetivos</h1>
        <p className="cabecalho-sub">
          Seis metas, dois tempos: o que acontece ao vivo e o que sustenta a solução.
        </p>
      </Reveal>

      <Reveal className="faixa-stats" delay={60}>
        <div className="faixa-stat">
          <Counter to={6} />
          <span className="faixa-rotulo">objetivos da missão</span>
        </div>
        <div className="faixa-stat">
          <Counter to={3} />
          <span className="faixa-rotulo">parâmetros monitorados</span>
        </div>
        <div className="faixa-stat">
          <Counter to={4} />
          <span className="faixa-rotulo">disciplinas integradas</span>
        </div>
      </Reveal>

      {/* Grupo 1: operação em tempo real */}
      <Reveal className="grupo-rotulo" style={{ marginTop: '48px' }}>
        <span className="kicker">Em tempo real</span>
      </Reveal>
      <div className="grid-cards grid-3">
        {[0, 1, 2].map((i) => (
          <CardObjetivo key={i} indice={i} />
        ))}
      </div>

      {/* Grupo 2: fundação da solução */}
      <Reveal className="grupo-rotulo" style={{ marginTop: '40px' }}>
        <span className="kicker">Fundação</span>
      </Reveal>
      <div className="grid-cards grid-3">
        {[3, 4, 5].map((i) => (
          <CardObjetivo key={i} indice={i} />
        ))}
      </div>

      {/* CTA de progressão (mantém o usuário no funil) */}
      <Reveal className="bloco-texto centralizado framed" style={{ marginTop: '48px' }}>
        <h2 className="secao-titulo">Como tudo isso funciona?</h2>
        <p>Veja a stack que liga o sensor na cápsula à tela do controle.</p>
        <div className="hero-botoes centralizado">
          <Link to="/tecnologia" className="botao botao-primario botao-grande">
            Conhecer a tecnologia <Icon name="seta" size={18} />
          </Link>
          <Link to="/dashboard" className="botao botao-fantasma botao-grande">
            Abrir Dashboard
          </Link>
        </div>
      </Reveal>
    </div>
  )
}

export default Objetivos
