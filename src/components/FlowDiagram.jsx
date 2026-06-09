import { Fragment } from 'react'
import Icon from './Icon.jsx'

// Diagrama do caminho dos dados, com "pacotes" percorrendo o fluxo (CSS).
// Conta a arquitetura de forma visual, sem parágrafos.
const NOS = [
  { icone: 'termometro', titulo: 'Sensores', sub: 'na cápsula' },
  { icone: 'chip', titulo: 'ESP32', sub: 'edge' },
  { icone: 'wifi', titulo: 'MQTT', sub: 'transporte' },
  { icone: 'globo', titulo: 'FIWARE', sub: 'plataforma' },
  { icone: 'atividade', titulo: 'Dashboard', sub: 'controle' },
]

function FlowDiagram() {
  return (
    <div
      className="fluxo"
      role="img"
      aria-label="Caminho dos dados: sensores na cápsula, ESP32, MQTT, FIWARE e dashboard"
    >
      {NOS.map((no, i) => (
        <Fragment key={no.titulo}>
          <div className="fluxo-no">
            <span className="fluxo-circulo">
              <Icon name={no.icone} size={26} />
            </span>
            <strong>{no.titulo}</strong>
            <span>{no.sub}</span>
          </div>
          {/* Conector com o "pacote" de dados (exceto após o último nó) */}
          {i < NOS.length - 1 && <div className="fluxo-linha"></div>}
        </Fragment>
      ))}
    </div>
  )
}

export default FlowDiagram
