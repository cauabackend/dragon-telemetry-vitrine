// Cena animada de detritos orbitais (só CSS + SVG, sem bibliotecas).
// Mostra a Terra, a cápsula Dragon e lixo espacial cruzando a tela.
// Posições e tempos fixos para um movimento variado e previsível.
const DETRITOS = [
  { top: '16%', dur: '6s', delay: '0s', size: 4 },
  { top: '30%', dur: '4.6s', delay: '1.4s', size: 6 },
  { top: '44%', dur: '7.2s', delay: '0.7s', size: 3 },
  { top: '57%', dur: '5.1s', delay: '2.6s', size: 5 },
  { top: '23%', dur: '8s', delay: '3.4s', size: 4 },
  { top: '66%', dur: '5.6s', delay: '1.9s', size: 6 },
  { top: '38%', dur: '6.6s', delay: '4.2s', size: 3 },
]

function DebrisField() {
  return (
    <div className="debris-cena" aria-hidden="true">
      <div className="debris-terra"></div>

      {/* Cápsula Dragon flutuando */}
      <svg className="debris-capsula" width="60" height="60" viewBox="0 0 24 24">
        <path
          d="M12 2c3.4 3 4.9 6.8 4.9 11.4 0 2.5-.5 4.6-1.6 6.4L12 22l-3.3-2.2c-1.1-1.8-1.6-3.9-1.6-6.4C7.1 8.8 8.6 5 12 2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="11" r="2.6" fill="currentColor" />
        <path d="M7.6 18 5.4 21M16.4 18l2.2 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>

      {/* Detritos cruzando */}
      {DETRITOS.map((d, i) => (
        <span
          key={i}
          className="debris"
          style={{
            top: d.top,
            width: d.size,
            height: d.size,
            animationDuration: d.dur,
            animationDelay: d.delay,
          }}
        ></span>
      ))}

      <span className="debris-rotulo">
        <span className="ponto"></span>Zona de risco · detritos em órbita
      </span>
    </div>
  )
}

export default DebrisField
