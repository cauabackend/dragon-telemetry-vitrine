import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import Counter from '../components/Counter.jsx'
import DebrisField from '../components/DebrisField.jsx'

// Página "O Problema": contexto do tema (riscos de uma missão espacial).
function Problema() {
  const riscos = [
    {
      icone: 'meteoro',
      titulo: 'Lixo espacial',
      texto: 'Detritos cruzam a órbita a velocidades absurdas. Um fragmento de centímetros perfura a cápsula.',
    },
    {
      icone: 'termometro',
      titulo: 'Calor extremo',
      texto: 'Na reentrada, o escudo térmico encara temperaturas altíssimas. Sem monitorar, a falha passa batida.',
    },
    {
      icone: 'queda',
      titulo: 'Falhas silenciosas',
      texto: 'Pressão e velocidade fora dos limites indicam problema grave. A decisão precisa vir em segundos.',
    },
  ]

  return (
    <div className="pagina container">
      <Reveal as="header" className="cabecalho-pagina">
        <span className="kicker">O contexto da missão</span>
        <h1 className="cabecalho-titulo">O espaço não perdoa</h1>
        <p className="cabecalho-sub">
          Levar uma tripulação ao espaço é uma das tarefas mais arriscadas da
          engenharia — e quase todo risco exige monitoramento em tempo real.
        </p>
      </Reveal>

      {/* Cena animada: cápsula entre detritos orbitais */}
      <Reveal>
        <DebrisField />
      </Reveal>

      {/* Números de impacto (contadores animados) */}
      <Reveal className="faixa-stats" delay={80}>
        <div className="faixa-stat">
          <Counter to={36500} />
          <span className="faixa-rotulo">objetos &gt; 10 cm rastreados em órbita</span>
        </div>
        <div className="faixa-stat">
          <span className="faixa-numero">~1 mi</span>
          <span className="faixa-rotulo">de detritos entre 1 e 10 cm</span>
        </div>
        <div className="faixa-stat">
          <Counter to={28000} />
          <span className="faixa-rotulo">km/h — a velocidade de uma colisão</span>
        </div>
        <div className="faixa-stat">
          <span className="faixa-numero">&lt; 60s</span>
          <span className="faixa-rotulo">para reagir a uma anomalia crítica</span>
        </div>
      </Reveal>

      <div className="grid-cards grid-3" style={{ marginTop: '44px' }}>
        {riscos.map((r, i) => (
          <Reveal className="card" key={r.titulo} delay={i * 90}>
            <div className="card-icone">
              <Icon name={r.icone} size={26} />
            </div>
            <h3 className="card-titulo">{r.titulo}</h3>
            <p className="card-descricao">{r.texto}</p>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export default Problema
