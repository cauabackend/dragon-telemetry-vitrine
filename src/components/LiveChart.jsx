// Gráfico de linha/área feito SÓ com SVG (sem biblioteca de gráficos).
// Recebe um array de números (temperaturas) e desenha a evolução ao longo do tempo.
function LiveChart({ dados, limite = 80, rotulo = 'Temperatura (°C)' }) {
  // Dimensões internas do desenho (o SVG é responsivo via viewBox + width 100%)
  const largura = 600
  const altura = 240
  const margem = 34

  // Faixa do eixo Y fixa (a temperatura fica nessa janela no nosso simulador)
  const yMin = 0
  const yMax = 110

  // Sem dados ainda? Mostra um aviso.
  if (!dados || dados.length === 0) {
    return (
      <div className="grafico-vazio">Aguardando leituras de telemetria…</div>
    )
  }

  // Converte um valor (°C) na coordenada Y do SVG (invertido: maior valor = mais em cima)
  const escalaY = (valor) =>
    altura - margem - ((valor - yMin) / (yMax - yMin)) * (altura - 2 * margem)

  // Distância horizontal entre cada ponto
  const passoX = (largura - 2 * margem) / Math.max(1, dados.length - 1)

  // Monta a lista de pontos "x,y" da linha
  const pontos = dados.map((valor, i) => {
    const x = margem + i * passoX
    const y = escalaY(valor)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })

  // Polígono da área: linha + descida até a base + volta ao início
  const baseY = altura - margem
  const xInicial = margem
  const xFinal = margem + (dados.length - 1) * passoX
  const areaPontos = `${xInicial},${baseY} ${pontos.join(' ')} ${xFinal.toFixed(1)},${baseY}`

  // Posição Y da linha tracejada do limite crítico (80 °C)
  const yLimite = escalaY(limite)

  // Linhas de grade horizontais (0, 25, 50, 75, 100)
  const grades = [0, 25, 50, 75, 100]

  return (
    <svg
      className="grafico"
      viewBox={`0 0 ${largura} ${altura}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={`Gráfico de linha mostrando as últimas leituras de ${rotulo}`}
    >
      {/* Degradê usado no preenchimento da área */}
      <defs>
        <linearGradient id="gradTemp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grade de fundo */}
      {grades.map((g) => (
        <g key={g}>
          <line
            x1={margem}
            y1={escalaY(g)}
            x2={largura - margem}
            y2={escalaY(g)}
            stroke="#2a3a4d"
            strokeWidth="1"
          />
          <text x="6" y={escalaY(g) + 4} fill="#7c8a99" fontSize="11">
            {g}
          </text>
        </g>
      ))}

      {/* Linha do limite crítico (80 °C) */}
      <line
        x1={margem}
        y1={yLimite}
        x2={largura - margem}
        y2={yLimite}
        stroke="#ff4d4d"
        strokeWidth="1.5"
        strokeDasharray="6 5"
      />
      <text x={largura - margem - 4} y={yLimite - 6} fill="#ff4d4d" fontSize="11" textAnchor="end">
        Limite crítico {limite}°C
      </text>

      {/* Área preenchida sob a linha */}
      <polygon points={areaPontos} fill="url(#gradTemp)" />

      {/* A linha em si */}
      <polyline
        points={pontos.join(' ')}
        fill="none"
        stroke="#00d4ff"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Destaca o último ponto (leitura mais recente) */}
      <circle
        cx={margem + (dados.length - 1) * passoX}
        cy={escalaY(dados[dados.length - 1])}
        r="4"
        fill="#0f1419"
        stroke="#00d4ff"
        strokeWidth="2.5"
      />
    </svg>
  )
}

export default LiveChart
