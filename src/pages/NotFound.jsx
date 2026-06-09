import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'

// Página 404: usada pela rota coringa "*" do React Router.
function NotFound() {
  return (
    <div className="pagina container nao-encontrado">
      <p className="erro-codigo num">404</p>
      <h1 className="cabecalho-titulo">Sinal perdido</h1>
      <p className="cabecalho-sub">
        A página que você procura saiu de órbita ou nunca existiu. Vamos voltar ao
        centro de controle.
      </p>
      <div className="hero-botoes centralizado" style={{ marginTop: '28px' }}>
        <Link to="/" className="botao botao-primario botao-grande">
          <Icon name="seta" size={18} /> Voltar para o início
        </Link>
        <Link to="/dashboard" className="botao botao-fantasma botao-grande">
          Ir para o Dashboard
        </Link>
      </div>
    </div>
  )
}

export default NotFound
