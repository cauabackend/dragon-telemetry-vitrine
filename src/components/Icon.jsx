/* ================================================================== *
 *  Conjunto de ícones do projeto (SVG inline, traço monolinha).
 *  Usamos ícones próprios em vez de emojis para dar uma cara
 *  consistente e profissional (mission control), sem instalar libs.
 *  Todos herdam a cor do texto (currentColor) e o mesmo traço.
 * ================================================================== */

// Cada ícone é só o "miolo" do SVG (paths, círculos, etc.)
const ICONES = {
  // Telemetria / sinal de rádio
  signal: (
    <>
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M6 6a9 9 0 0 0 0 12M18 6a9 9 0 0 1 0 12" />
    </>
  ),
  // Alerta (triângulo)
  alerta: (
    <>
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <line x1="12" y1="9" x2="12" y2="13.5" />
      <line x1="12" y1="17" x2="12" y2="17" />
    </>
  ),
  // Camadas / integração
  camadas: (
    <>
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </>
  ),
  // Foguete
  foguete: (
    <>
      <path d="M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.9-.9.8-2.2-.1-3.1A2.2 2.2 0 0 0 5 15Z" />
      <path d="M13.5 14.5 9.5 10.5a13 13 0 0 1 4-8c1.6-1.6 4.3-2 5.4-1.9.1 1.1-.3 3.8-1.9 5.4a13 13 0 0 1-8 4Z" />
      <path d="M9.5 10.5H5s.6-2.8 2.2-4c1.4-1 3.8-1 3.8-1" />
      <circle cx="15.5" cy="8.5" r="1.1" />
    </>
  ),
  // Detrito / meteoro
  meteoro: (
    <>
      <circle cx="16.5" cy="7.5" r="3.5" />
      <path d="M13.5 10.5 4 20M11.5 8.5 6 14M14.5 12.5 11 16" />
    </>
  ),
  // Termômetro
  termometro: (
    <>
      <path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z" />
      <line x1="12" y1="9.5" x2="12" y2="15.5" />
    </>
  ),
  // Tendência de queda (falha)
  queda: (
    <>
      <polyline points="3 7 9 13 13 9 21 17" />
      <polyline points="21 11 21 17 15 17" />
    </>
  ),
  // Átomo (React)
  atomo: (
    <>
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4.4" />
      <ellipse cx="12" cy="12" rx="10" ry="4.4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.4" transform="rotate(120 12 12)" />
    </>
  ),
  // Wi-Fi / MQTT
  wifi: (
    <>
      <path d="M2 8.8a15 15 0 0 1 20 0" />
      <path d="M5 12.3a10 10 0 0 1 14 0" />
      <path d="M8.5 15.7a5 5 0 0 1 7 0" />
      <line x1="12" y1="19" x2="12" y2="19" />
    </>
  ),
  // Chip / microcontrolador (ESP32)
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <rect x="10" y="10" width="4" height="4" rx="0.5" />
      <path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3" />
    </>
  ),
  // Globo / rede (FIWARE)
  globo: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  // Código (Python)
  codigo: (
    <>
      <polyline points="9 8 5 12 9 16" />
      <polyline points="15 8 19 12 15 16" />
    </>
  ),
  // Atividade / gráfico
  atividade: <polyline points="3 12 7 12 10 5 14 19 17 12 21 12" />,
  // Manômetro (pressão)
  manometro: (
    <>
      <path d="M4 17a8 8 0 1 1 16 0" />
      <line x1="12" y1="17" x2="15.5" y2="11" />
      <circle cx="12" cy="17" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  // Relógio (resposta rápida)
  relogio: (
    <>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </>
  ),
  // Olho (visibilidade)
  olho: (
    <>
      <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  // Escudo (segurança)
  escudo: (
    <>
      <path d="M12 3 5 6v5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z" />
      <polyline points="9 12 11 14 15 10" />
    </>
  ),
  // Banco de dados (histórico)
  banco: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </>
  ),
  // Moeda (baixo custo)
  moeda: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10" />
      <path d="M14.5 9.3A2.4 2.4 0 0 0 12 8c-1.5 0-2.6.9-2.6 2s1 1.7 2.6 2 2.6.9 2.6 2-1.1 2-2.6 2a2.4 2.4 0 0 1-2.5-1.3" />
    </>
  ),
  // Dispositivos (responsivo)
  dispositivos: (
    <>
      <rect x="2" y="4" width="14" height="10" rx="1.5" />
      <path d="M2 17.5h14" />
      <rect x="16.5" y="9" width="5.5" height="11" rx="1.5" />
    </>
  ),
  // Play
  play: <path d="M7 5v14l11-7Z" />,
  // Pause
  pause: (
    <>
      <rect x="7" y="5" width="3.4" height="14" rx="1" />
      <rect x="13.6" y="5" width="3.4" height="14" rx="1" />
    </>
  ),
  // Reiniciar
  reiniciar: (
    <>
      <path d="M21 12a9 9 0 1 1-3-6.7" />
      <polyline points="21 3.5 21 9 15.5 9" />
    </>
  ),
  // Link externo
  externo: (
    <>
      <path d="M7.5 16.5 17 7" />
      <polyline points="8.5 7 17 7 17 15.5" />
    </>
  ),
  // Seta para a direita
  seta: (
    <>
      <line x1="4" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </>
  ),
  // Alvo (objetivos)
  alvo: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  // GitHub (preenchido, não é traço)
  github: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.34 9.34 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.78-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
    />
  ),
}

// Componente: <Icon name="termometro" /> | tamanho e traço configuráveis
function Icon({ name, size = 24, stroke = 1.5, className }) {
  const conteudo = ICONES[name]
  if (!conteudo) return null
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {conteudo}
    </svg>
  )
}

export default Icon
