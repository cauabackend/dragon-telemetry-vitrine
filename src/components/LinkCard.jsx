import Icon from './Icon.jsx'

// Escolhe o ícone conforme o "tipo" do artefato.
const ICONE_POR_TIPO = {
  github: 'github',
  simulacao: 'play',
  chip: 'chip',
}

// Card reutilizável que faz a "ponte" para cada parte do projeto integrado.
// Props: { titulo, disciplina, descricao, tipo, url }
function LinkCard({ titulo, disciplina, descricao, tipo, url }) {
  // Detecta se a URL ainda é um placeholder (ex.: repositório Python não publicado).
  const indisponivel = !url || url.trim().startsWith('PASTE_')
  const nomeIcone = ICONE_POR_TIPO[tipo] || 'externo'

  return (
    <article className={indisponivel ? 'link-card indisponivel' : 'link-card'}>
      <div className="link-card-topo">
        <span className="link-card-icone">
          <Icon name={nomeIcone} size={26} />
        </span>
        <span className="link-card-tag">{disciplina}</span>
      </div>

      <h3 className="link-card-titulo">{titulo}</h3>
      <p className="link-card-descricao">{descricao}</p>

      {indisponivel ? (
        // Estado "Em breve": botão desabilitado em vez de link quebrado
        <button className="botao botao-desabilitado" disabled>
          Em breve
        </button>
      ) : (
        // Links externos sempre abrem em nova aba com segurança (noopener)
        <a
          className="botao botao-primario"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir <Icon name="externo" size={18} />
        </a>
      )}
    </article>
  )
}

export default LinkCard
