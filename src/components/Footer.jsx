// Rodapé padrão, exibido em todas as páginas.
// Inclui os créditos da equipe (nomes + RM) exigidos na entrega.
const EQUIPE = [
  { nome: 'Cauã Pereira da Silva', rm: 'RM568143' },
  { nome: 'Felipe Estevo Santos', rm: 'RM567780' },
  { nome: 'Igor Grave Teixeira', rm: 'RM567663' },
  { nome: 'Renan dos Reis Santos', rm: 'RM568540' },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-interno">
        <div className="footer-marca">
          <span className="footer-titulo">
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2c3.2 2.8 4.6 6.4 4.6 10.8 0 2.4-.5 4.3-1.5 6L12 22l-3.1-3.2c-1-1.7-1.5-3.6-1.5-6C7.4 8.4 8.8 4.8 12 2Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="11" r="2.4" fill="currentColor" />
            </svg>
            Dragon Telemetry
          </span>
          <span className="footer-sub">
            Global Solution 2026 — Dragon Telemetry. Centro de controle da missão,
            da vitrine ao painel de telemetria ao vivo.
          </span>
        </div>

        <div className="footer-equipe">
          <span className="footer-rotulo">Equipe</span>
          <ul>
            {EQUIPE.map((membro) => (
              <li key={membro.rm}>
                {membro.nome} — <span className="footer-rm">{membro.rm}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-base">
        © 2026 Dragon Telemetry — FIAP Global Solution. Feito por estudantes de
        Engenharia de Software.
      </div>
    </footer>
  )
}

export default Footer
