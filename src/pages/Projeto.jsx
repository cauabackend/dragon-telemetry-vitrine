import LinkCard from '../components/LinkCard.jsx'
import Reveal from '../components/Reveal.jsx'
// Importa o JSON local com os artefatos do projeto integrado.
import projetos from '../data/projetos.json'

// Link da simulação Wokwi (usado no iframe incorporado).
const WOKWI = 'https://wokwi.com/projects/465937213607910401'

// Página "O Projeto Integrado": grid de cards que liga cada parte da solução.
function Projeto() {
  return (
    <div className="pagina container">
      <Reveal as="header" className="cabecalho-pagina">
        <span className="kicker">Uma solução, várias disciplinas</span>
        <h1 className="cabecalho-titulo">O Projeto Integrado</h1>
        <p className="cabecalho-sub">
          O Dragon Telemetry é construído por várias frentes. Abaixo estão os
          repositórios e artefatos reais de cada parte — o dashboard ao vivo é a
          única peça que roda aqui dentro, na rota <code>/dashboard</code>.
        </p>
      </Reveal>

      {/* Renderiza um LinkCard para cada item do JSON usando .map() */}
      <div className="grid-cards grid-2">
        {projetos.map((p, i) => (
          <Reveal key={p.id} delay={i * 80}>
            <LinkCard
              titulo={p.titulo}
              disciplina={p.disciplina}
              descricao={p.descricao}
              tipo={p.tipo}
              url={p.url}
            />
          </Reveal>
        ))}
      </div>

      {/* OPCIONAL: simulação do Wokwi incorporada em um iframe responsivo.
          Se o navegador bloquear o iframe, o link continua valendo. */}
      <Reveal className="bloco-texto alinhado" style={{ marginTop: '44px' }}>
        <h2 className="secao-titulo">Simulação do hardware (Wokwi)</h2>
        <p>
          Circuito ESP32 + sensores rodando direto no simulador. Caso o quadro abaixo
          não carregue,{' '}
          <a href={WOKWI} target="_blank" rel="noopener noreferrer">
            abra a simulação no Wokwi
          </a>
          .
        </p>
        <div className="iframe-responsivo">
          <iframe
            src={WOKWI}
            title="Simulação do circuito Dragon Telemetry no Wokwi"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </Reveal>
    </div>
  )
}

export default Projeto
