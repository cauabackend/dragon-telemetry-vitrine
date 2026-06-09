import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import FlowDiagram from '../components/FlowDiagram.jsx'

// Links reais usados nos botões desta página.
const REPO_EDGE =
  'https://github.com/Estevo00/Dragon-Telemetry-System---Edge-Computing-Computer-Systems'
const WOKWI = 'https://wokwi.com/projects/465937213607910401'

// Página "Tecnologia": a stack do projeto apresentada em CARDS.
function Tecnologia() {
  const stack = [
    {
      icone: 'atomo',
      titulo: 'React + Vite',
      tag: 'Front-End',
      descricao: 'Interface da vitrine e do dashboard, em componentes reutilizáveis com React Router.',
    },
    {
      icone: 'wifi',
      titulo: 'MQTT',
      tag: 'Comunicação',
      descricao: 'Protocolo leve de mensagens que transporta a telemetria do dispositivo ao servidor.',
    },
    {
      icone: 'chip',
      titulo: 'ESP32',
      tag: 'Hardware',
      descricao: 'Microcontrolador com Wi-Fi que lê os sensores da cápsula e publica os dados.',
    },
    {
      icone: 'globo',
      titulo: 'FIWARE',
      tag: 'Plataforma',
      descricao: 'Componentes abertos para gerenciar o contexto e os dados de IoT da missão.',
    },
    {
      icone: 'codigo',
      titulo: 'Python',
      tag: 'Análise',
      descricao: 'Protótipo que aplica a lógica de detecção de anomalias e gera os relatórios.',
    },
    {
      icone: 'atividade',
      titulo: 'SVG nativo',
      tag: 'Visualização',
      descricao: 'Gráfico de telemetria desenhado à mão em SVG, sem bibliotecas externas.',
    },
  ]

  return (
    <div className="pagina container">
      <Reveal as="header" className="cabecalho-pagina">
        <span className="kicker">A stack da missão</span>
        <h1 className="cabecalho-titulo">Tecnologia</h1>
        <p className="cabecalho-sub">
          Do sensor na cápsula até a tela do centro de controle — siga o caminho que
          cada dado percorre.
        </p>
      </Reveal>

      {/* Diagrama animado do fluxo dos dados */}
      <Reveal>
        <FlowDiagram />
      </Reveal>

      <div className="grid-cards grid-3" style={{ marginTop: '44px' }}>
        {stack.map((t, i) => (
          <Reveal className="card" key={t.titulo} delay={i * 70}>
            <div className="tech-topo">
              <div className="card-icone">
                <Icon name={t.icone} size={26} />
              </div>
              <span className="card-tag">{t.tag}</span>
            </div>
            <h3 className="card-titulo">{t.titulo}</h3>
            <p className="card-descricao">{t.descricao}</p>
          </Reveal>
        ))}
      </div>

      {/* Botões que ligam o hardware: repositório Edge e simulação Wokwi */}
      <Reveal className="bloco-texto centralizado framed" style={{ marginTop: '44px' }}>
        <h2 className="secao-titulo">Veja o hardware funcionando</h2>
        <p>
          O sistema embarcado e a simulação do circuito fazem parte da disciplina de
          Edge Computing. Explore o código e o circuito completos:
        </p>
        <div className="hero-botoes centralizado">
          <a className="botao botao-primario" href={REPO_EDGE} target="_blank" rel="noopener noreferrer">
            <Icon name="github" size={18} /> Repositório Edge <Icon name="externo" size={16} />
          </a>
          <a className="botao botao-secundario" href={WOKWI} target="_blank" rel="noopener noreferrer">
            <Icon name="play" size={16} /> Simulação no Wokwi <Icon name="externo" size={16} />
          </a>
        </div>
      </Reveal>
    </div>
  )
}

export default Tecnologia
