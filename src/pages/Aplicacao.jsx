import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'

// Passos da jornada de um dado, com ícone e uma frase-âncora em destaque.
const PASSOS = [
  {
    icone: 'termometro',
    titulo: 'Os sensores leem a cápsula',
    lead: 'O ESP32 coleta temperatura, pressão e velocidade',
    resto: 'a cada poucos segundos durante a missão.',
  },
  {
    icone: 'wifi',
    titulo: 'Os dados são enviados',
    lead: 'Via MQTT, cada leitura viaja',
    resto: 'do dispositivo até a plataforma de telemetria.',
  },
  {
    icone: 'atividade',
    titulo: 'O dashboard mostra ao vivo',
    lead: 'A equipe vê os valores atualizando em tempo real,',
    resto: 'com cores de status.',
  },
  {
    icone: 'alerta',
    titulo: 'O sistema detecta anomalias',
    lead: 'Um valor fora do limite vira alerta',
    resto: 'registrado e destacado na hora.',
  },
  {
    icone: 'escudo',
    titulo: 'A equipe decide e age',
    lead: 'Com a informação clara, os operadores agem rápido',
    resto: 'para proteger a tripulação.',
  },
]

function Aplicacao() {
  return (
    <div className="pagina container">
      <Reveal as="header" className="cabecalho-pagina">
        <span className="kicker">Do sensor à decisão</span>
        <h1 className="cabecalho-titulo">Aplicação no dia a dia</h1>
        <p className="cabecalho-sub">
          Siga o caminho de um dado: do sensor na cápsula até a decisão no controle.
        </p>
      </Reveal>

      <ol className="timeline">
        {PASSOS.map((p, i) => (
          <Reveal as="li" className="timeline-item" key={p.titulo} delay={i * 80}>
            <span className="timeline-numero num">{i + 1}</span>
            <div className="timeline-conteudo">
              <div className="timeline-cab">
                <span className="timeline-ico">
                  <Icon name={p.icone} size={20} />
                </span>
                <h3 className="card-titulo">{p.titulo}</h3>
              </div>
              <p>
                <strong>{p.lead}</strong> {p.resto}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal className="bloco-texto centralizado framed" style={{ marginTop: '44px' }}>
        <h2 className="secao-titulo">A missão está transmitindo agora</h2>
        <p>Entre e monitore a cápsula Dragon ao vivo.</p>
        <div className="hero-botoes centralizado">
          <span className="radar-cta">
            <Link to="/dashboard" className="botao botao-primario botao-grande">
              <Icon name="foguete" size={20} /> Abrir Dashboard
            </Link>
          </span>
        </div>
      </Reveal>
    </div>
  )
}

export default Aplicacao
