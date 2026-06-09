import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import Counter from '../components/Counter.jsx'

// Osciloscópio do hero: um "visual de sinal" animado, só com SVG + CSS.
function SignalScope() {
  // Pontos de uma onda de telemetria (apenas decorativo).
  const pontos =
    '20,150 40,120 60,160 80,108 100,140 120,95 140,150 160,128 180,168 200,100 220,135 240,78 260,150 280,120 300,165 320,90 340,62 360,132 380,110 400,150 420,125 440,160 460,118'

  return (
    <div className="scope">
      <div className="scope-painel framed">
        <div className="scope-topo">
          <span className="scope-rotulo">Sinal de telemetria · DRAGON-GS26</span>
          <span className="scope-live">
            <Icon name="signal" size={15} /> AO VIVO
          </span>
        </div>

        <svg className="scope-svg" viewBox="0 0 480 200" preserveAspectRatio="none" aria-hidden="true">
          {/* grade do osciloscópio */}
          <g className="scope-grid">
            <line x1="0" y1="50" x2="480" y2="50" />
            <line x1="0" y1="100" x2="480" y2="100" />
            <line x1="0" y1="150" x2="480" y2="150" />
            <line x1="120" y1="0" x2="120" y2="200" />
            <line x1="240" y1="0" x2="240" y2="200" />
            <line x1="360" y1="0" x2="360" y2="200" />
          </g>
          {/* traço do sinal (desenha sozinho) */}
          <polyline className="scope-trace" points={pontos} />
          {/* linha de varredura percorrendo a tela */}
          <g className="scope-varredura">
            <line x1="0" y1="0" x2="0" y2="200" stroke="#00d4ff" strokeWidth="2" opacity="0.4" />
          </g>
        </svg>

        <div className="scope-leituras">
          <div className="scope-leitura">
            <span>Sinal</span>
            <strong>Travado</strong>
          </div>
          <div className="scope-leitura">
            <span>Uplink</span>
            <strong>Online</strong>
          </div>
          <div className="scope-leitura">
            <span>Status</span>
            <strong>Nominal</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

function Home() {
  // Destaques mostrados como cards (com Reveal ao rolar).
  const destaques = [
    {
      icone: 'signal',
      titulo: 'Telemetria ao vivo',
      texto: 'Temperatura, pressão e velocidade da cápsula atualizando em tempo real, direto no painel.',
    },
    {
      icone: 'alerta',
      titulo: 'Alertas de segurança',
      texto: 'Limites críticos detectam anomalias na hora e disparam avisos visuais e sonoros.',
    },
    {
      icone: 'camadas',
      titulo: 'Projeto integrado',
      texto: 'Front-End, Edge Computing (ESP32) e Python conectados em uma única solução.',
    },
  ]

  return (
    <div className="pagina-home">
      {/* HERO */}
      <section className="hero container">
        <div className="hero-glow" aria-hidden="true"></div>

        <div className="hero-conteudo hero-anim">
          <span className="kicker">FIAP · Global Solution 2026</span>
          <h1 className="hero-titulo">
            Controle a missão <span className="destaque">Dragon</span> em tempo real
          </h1>
          <p className="hero-sub">
            Telemetria ao vivo da cápsula: temperatura, pressão e velocidade
            monitoradas a cada segundo, com alertas antes do risco virar acidente.
          </p>
          <div className="hero-botoes">
            <Link to="/dashboard" className="botao botao-primario botao-grande">
              <Icon name="foguete" size={20} /> Abrir Dashboard
            </Link>
            <Link to="/projeto" className="botao botao-fantasma botao-grande">
              Ver projeto integrado <Icon name="seta" size={18} />
            </Link>
          </div>
        </div>

        <SignalScope />
      </section>

      {/* FAIXA DE ESTATÍSTICAS (contadores animados) */}
      <section className="container">
        <Reveal className="faixa-stats">
          <div className="faixa-stat">
            <Counter to={36500} />
            <span className="faixa-rotulo">detritos &gt; 10 cm em órbita (ESA)</span>
          </div>
          <div className="faixa-stat">
            <Counter to={28000} />
            <span className="faixa-rotulo">km/h de velocidade orbital</span>
          </div>
          <div className="faixa-stat">
            <Counter to={3} />
            <span className="faixa-rotulo">parâmetros críticos monitorados</span>
          </div>
          <div className="faixa-stat">
            <Counter to={4} />
            <span className="faixa-rotulo">disciplinas integradas na solução</span>
          </div>
        </Reveal>
      </section>

      {/* O QUE É */}
      <section className="container secao">
        <Reveal>
          <span className="kicker">O produto</span>
          <h2 className="secao-titulo" style={{ marginTop: '12px' }}>
            Uma vitrine que também é o produto
          </h2>
          <p className="secao-intro">
            O Dragon Telemetry reúne a apresentação do projeto e um dashboard de
            telemetria real funcionando dentro da própria aplicação React. Nasceu no
            Front-End Design e foi reconstruído em React para Desenvolvimento Web.
          </p>
        </Reveal>

        <div className="grid-cards grid-3" style={{ marginTop: '36px' }}>
          {destaques.map((d, i) => (
            <Reveal className="card" key={d.titulo} delay={i * 90}>
              <div className="card-icone">
                <Icon name={d.icone} size={26} />
              </div>
              <h3 className="card-titulo">{d.titulo}</h3>
              <p className="card-descricao">{d.texto}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CHAMADA FINAL */}
      <section className="container secao">
        <Reveal className="bloco-texto centralizado framed">
          <span className="kicker" style={{ justifyContent: 'center' }}>
            Centro de controle
          </span>
          <h2 className="secao-titulo" style={{ marginTop: '12px' }}>
            A missão já está transmitindo
          </h2>
          <p>
            O painel ao vivo está no ar agora, gerando leituras e detectando
            anomalias. Entre e acompanhe a cápsula.
          </p>
          <div className="hero-botoes centralizado">
            <Link to="/dashboard" className="botao botao-primario botao-grande">
              <Icon name="foguete" size={20} /> Ver painel ao vivo
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  )
}

export default Home
