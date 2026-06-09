import { useEffect, useRef, useState } from 'react'

// Revela o conteúdo com um fade + leve subida quando ele entra na tela.
// Usa IntersectionObserver, que é nativo do navegador (sem bibliotecas).
// Deixa a leitura mais viva conforme a pessoa rola a página.
function Reveal({ children, delay = 0, as: Tag = 'div', className = '', style }) {
  const ref = useRef(null)
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respeita quem prefere menos movimento: mostra direto, sem animar.
    const prefereParar = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefereParar) {
      setVisivel(true)
      return
    }

    // Observa quando o elemento aparece na viewport.
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            setVisivel(true)
            observador.unobserve(entrada.target) // anima só uma vez
          }
        })
      },
      { threshold: 0.15 }
    )

    observador.observe(el)
    return () => observador.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visivel ? 'visivel' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  )
}

export default Reveal
