import { useEffect, useRef, useState } from 'react'

// Anima um número de 0 até "to" quando ele entra na tela.
// Dá um ar "ao vivo" às estatísticas, sem bibliotecas (só React nativo).
function Counter({ to, duration = 1500, prefix = '', suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const [valor, setValor] = useState(0)
  const comecou = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefereParar = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting || comecou.current) return
          comecou.current = true
          observador.unobserve(entrada.target)

          // Sem animação para quem prefere menos movimento.
          if (prefereParar) {
            setValor(to)
            return
          }

          // Conta usando requestAnimationFrame com uma curva suave (easeOutCubic).
          const inicio = performance.now()
          const passo = (agora) => {
            const p = Math.min((agora - inicio) / duration, 1)
            const suave = 1 - Math.pow(1 - p, 3)
            setValor(to * suave)
            if (p < 1) requestAnimationFrame(passo)
          }
          requestAnimationFrame(passo)
        })
      },
      { threshold: 0.4 }
    )

    observador.observe(el)
    return () => observador.disconnect()
  }, [to, duration])

  // Formata no padrão brasileiro (ex.: 36.500)
  const formatado = valor.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className="contador">
      {prefix}
      {formatado}
      {suffix}
    </span>
  )
}

export default Counter
