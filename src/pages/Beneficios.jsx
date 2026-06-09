import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Card from '../components/Card.jsx'
import Reveal from '../components/Reveal.jsx'
import Counter from '../components/Counter.jsx'

// 4 benefícios "padrão" (com barra de nível de impacto).
const PADRAO = [
  {
    icone: 'olho',
    titulo: 'Visão clara',
    descricao: 'Cores e gráficos transformam números crus em informação imediata.',
    nivel: '88%',
    forca: 'Alto',
  },
  {
    icone: 'banco',
    titulo: 'Histórico confiável',
    descricao: 'Toda leitura é registrada para auditar a missão e ver tendências.',
    nivel: '80%',
    forca: 'Alto',
  },
  {
    icone: 'moeda',
    titulo: 'Baixo custo',
    descricao: 'Hardware acessível (ESP32) e tecnologias abertas viabilizam o projeto.',
    nivel: '92%',
    forca: 'Muito alto',
  },
  {
    icone: 'dispositivos',
    titulo: 'Em qualquer tela',
    descricao: 'Painel responsivo: do computador do controle ao celular da equipe.',
    nivel: '85%',
    forca: 'Alto',
  },
]

function Beneficios() {
  return (
    <div className="pagina container">
      <Reveal as="header" className="cabecalho-pagina">
        <span className="kicker">O valor da solução</span>
        <h1 className="cabecalho-titulo">Benefícios</h1>
        <p className="cabecalho-sub">
          Cada segundo sem dados é um segundo cego. O Dragon Telemetry resolve isso.
        </p>
      </Reveal>

      <Reveal className="faixa-stats" delay={60}>
        <div className="faixa-stat">
          <span className="faixa-numero">&lt; 60s</span>
          <span className="faixa-rotulo">para reagir a uma anomalia</span>
        </div>
        <div className="faixa-stat">
          <Counter to={3} />
          <span className="faixa-rotulo">limites de segurança vigiados</span>
        </div>
        <div className="faixa-stat">
          <span className="faixa-numero">24/7</span>
          <span className="faixa-rotulo">monitoramento contínuo</span>
        </div>
      </Reveal>

      {/* 2 benefícios em destaque (os mais críticos para o tema) */}
      <div className="grid-cards grid-2" style={{ marginTop: '44px' }}>
        <Reveal className="card card-destaque">
          <div className="card-icone">
            <Icon name="relogio" size={30} />
          </div>
          <span className="destaque-num">&lt; 60s</span>
          <h3 className="card-titulo">Resposta rápida</h3>
          <p className="card-descricao">
            Alertas em tempo real: a equipe reage a anomalias em segundos, não em
            minutos.
          </p>
        </Reveal>

        <Reveal className="card card-destaque" delay={90}>
          <div className="card-icone">
            <Icon name="escudo" size={30} />
          </div>
          <span className="destaque-num">3 limites</span>
          <h3 className="card-titulo">Mais segurança</h3>
          <p className="card-descricao">
            Temperatura, pressão e velocidade vigiadas contra os limites críticos da
            missão.
          </p>
        </Reveal>
      </div>

      {/* 4 benefícios padrão com barra de impacto */}
      <div className="grid-cards grid-4" style={{ marginTop: '20px' }}>
        {PADRAO.map((b, i) => (
          <Reveal key={b.titulo} delay={i * 70} style={{ '--nivel': b.nivel }}>
            <Card
              icone={<Icon name={b.icone} size={26} />}
              titulo={b.titulo}
              descricao={b.descricao}
            >
              <div className="nivel">
                <div className="nivel-topo">
                  <span>Impacto</span>
                  <span>{b.forca}</span>
                </div>
                <div className="nivel-trilho">
                  <div className="nivel-fill"></div>
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>

      {/* CTA de progressão */}
      <Reveal className="bloco-texto centralizado framed" style={{ marginTop: '48px' }}>
        <h2 className="secao-titulo">E na prática?</h2>
        <p>Acompanhe o caminho de um dado, do sensor à decisão no controle.</p>
        <div className="hero-botoes centralizado">
          <Link to="/aplicacao" className="botao botao-primario botao-grande">
            Ver a aplicação <Icon name="seta" size={18} />
          </Link>
          <Link to="/dashboard" className="botao botao-fantasma botao-grande">
            Abrir Dashboard
          </Link>
        </div>
      </Reveal>
    </div>
  )
}

export default Beneficios
