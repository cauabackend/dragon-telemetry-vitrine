// Card reutilizável (usado na página de Benefícios).
// Mostra um ícone, um título, uma tag opcional e a descrição.
function Card({ icone, titulo, tag, descricao, children }) {
  return (
    <article className="card">
      {icone && <div className="card-icone">{icone}</div>}
      {tag && <span className="card-tag">{tag}</span>}
      <h3 className="card-titulo">{titulo}</h3>
      {descricao && <p className="card-descricao">{descricao}</p>}
      {children}
    </article>
  )
}

export default Card
