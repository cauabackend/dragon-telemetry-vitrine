// Selo (badge) que mostra o status de uma leitura com a cor certa.
// Verde = Normal, Amarelo = Alerta, Vermelho = Crítico.
function StatusBadge({ status }) {
  const classe =
    status === 'Critico'
      ? 'badge-critico'
      : status === 'Alerta'
      ? 'badge-alerta'
      : 'badge-normal'

  // Mostra "Crítico" com acento na tela (guardamos "Critico" sem acento nos dados)
  const rotulo = status === 'Critico' ? 'Crítico' : status

  return (
    <span className={`status-badge ${classe}`}>
      <span className="ponto" aria-hidden="true"></span>
      {rotulo}
    </span>
  )
}

export default StatusBadge
