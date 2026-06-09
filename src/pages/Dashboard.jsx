import { useState, useEffect, useRef } from 'react'
import seed from '../data/telemetria.json'
import StatusBadge from '../components/StatusBadge.jsx'
import LiveChart from '../components/LiveChart.jsx'
import Icon from '../components/Icon.jsx'

// URL do DASHBOARD COMPLETO (o produto real, mais robusto que esta demo).
const URL_DASHBOARD_COMPLETO = 'https://dragontelemetry.vercel.app/'
// Fallback de segurança caso a URL acima volte a ser um placeholder.
const REPO_PRODUTO = 'https://github.com/RenanSantos0/dragon-telemetry'

/* ------------------------------------------------------------------ *
 * LIMITES DE SEGURANÇA
 * (os MESMOS valores do protótipo em Python — consistência entre as
 *  disciplinas do projeto integrado)
 * ------------------------------------------------------------------ */
const LIMITES = {
  TEMP_CRITICO: 80, // °C — acima disso é Crítico
  TEMP_ALERTA: 70, // °C — entre 70 e 80 é Alerta
  PRESSAO_MIN: 90, // kPa — faixa normal 90 a 105
  PRESSAO_MAX: 105,
  VELOCIDADE_MIN: 7500, // km/h — faixa normal 7500 a 8000
  VELOCIDADE_MAX: 8000,
}

// Status individual de cada parâmetro (usado para colorir cada card)
function statusTemperatura(t) {
  if (t > LIMITES.TEMP_CRITICO) return 'Critico'
  if (t > LIMITES.TEMP_ALERTA) return 'Alerta'
  return 'Normal'
}
function statusPressao(p) {
  return p < LIMITES.PRESSAO_MIN || p > LIMITES.PRESSAO_MAX ? 'Alerta' : 'Normal'
}
function statusVelocidade(v) {
  return v < LIMITES.VELOCIDADE_MIN || v > LIMITES.VELOCIDADE_MAX ? 'Alerta' : 'Normal'
}

// Status geral de uma leitura = o "pior" entre os três parâmetros
function avaliarStatus(leitura) {
  const t = statusTemperatura(leitura.temperatura)
  if (t === 'Critico') return 'Critico'
  const p = statusPressao(leitura.pressao)
  const v = statusVelocidade(leitura.velocidade)
  if (t === 'Alerta' || p === 'Alerta' || v === 'Alerta') return 'Alerta'
  return 'Normal'
}

// Sorteia um número decimal dentro de uma faixa
function aleatorio(min, max) {
  return Math.random() * (max - min) + min
}

// Gera uma nova leitura simulada.
// A maioria das leituras é Normal; às vezes Alerta; raramente Crítico
// (deixa o stream realista, com anomalias ocasionais e não o tempo todo).
function gerarLeitura(id) {
  // Sorteia o "humor" da temperatura
  const sorte = Math.random()
  let temperatura
  if (sorte < 0.1) {
    temperatura = aleatorio(80.5, 95) // ~10% pico CRÍTICO (> 80 °C)
  } else if (sorte < 0.22) {
    temperatura = aleatorio(70.5, 80) // ~12% ALERTA (70–80 °C)
  } else {
    temperatura = aleatorio(22, 68) // ~78% NORMAL
  }

  // Pressão: quase sempre dentro da faixa normal (90–105 kPa)
  const pressao = Math.random() < 0.85 ? aleatorio(92, 104) : aleatorio(85, 110)

  // Velocidade: quase sempre dentro da faixa normal (7500–8000 km/h)
  const velocidade =
    Math.random() < 0.85 ? aleatorio(7560, 7960) : aleatorio(7400, 8120)

  const leitura = {
    id,
    temperatura: Number(temperatura.toFixed(1)),
    pressao: Number(pressao.toFixed(1)),
    velocidade: Math.round(velocidade),
  }
  leitura.status = avaliarStatus(leitura)
  return leitura
}

// Calcula mínimo, máximo e média de um campo numérico
function estatisticas(lista, campo) {
  if (lista.length === 0) return { min: 0, max: 0, media: 0 }
  const valores = lista.map((l) => l[campo])
  const soma = valores.reduce((a, b) => a + b, 0)
  return {
    // usa reduce (em vez de spread "...") para não estourar a pilha com muitos dados
    min: valores.reduce((a, b) => Math.min(a, b), valores[0]),
    max: valores.reduce((a, b) => Math.max(a, b), valores[0]),
    media: Number((soma / valores.length).toFixed(1)),
  }
}

// Opções do filtro da tabela de histórico (rótulo na tela -> valor guardado)
const OPCOES_FILTRO = [
  { rotulo: 'Todos', valor: 'Todos' },
  { rotulo: 'Normal', valor: 'Normal' },
  { rotulo: 'Alerta', valor: 'Alerta' },
  { rotulo: 'Crítico', valor: 'Critico' },
]

// Guarda só as últimas N leituras na memória (evita o array crescer sem fim
// numa transmissão longa). O gráfico, a tabela e as estatísticas usam essa janela.
const MAX_LEITURAS = 300

// Quantos alertas já existem nas leituras iniciais (seed)
const ALERTAS_INICIAIS = seed.filter((l) => avaliarStatus(l) !== 'Normal').length

/* ------------------------------------------------------------------ *
 * COMPONENTE DA PÁGINA
 * ------------------------------------------------------------------ */
function Dashboard() {
  // Começa com as leituras do JSON (seed), recalculando o status por garantia.
  const [leituras, setLeituras] = useState(() =>
    seed.map((l) => ({ ...l, status: avaliarStatus(l) }))
  )
  const [ativo, setAtivo] = useState(true) // LIVE (true) ou HOLD (false)
  const [filtro, setFiltro] = useState('Todos') // filtro da tabela

  // Guarda valores que NÃO devem causar re-render:
  // o próximo id, o total de alertas acumulado e o contexto de áudio.
  const proximoId = useRef(seed.length)
  const totalAlertas = useRef(ALERTAS_INICIAIS)
  const audioRef = useRef(null)

  // Garante que o contexto de áudio exista e esteja "destravado".
  // Os navegadores bloqueiam áudio até a 1ª interação do usuário, por isso
  // também chamamos isto no clique do botão LIVE/HOLD.
  function garantirAudio() {
    try {
      if (!audioRef.current) {
        const Ctx = window.AudioContext || window.webkitAudioContext
        audioRef.current = new Ctx()
      }
      if (audioRef.current.state === 'suspended') audioRef.current.resume()
    } catch {
      // áudio indisponível neste navegador — ignora
    }
  }

  // Toca um beep curto usando a Web Audio API (avisa quando há um Crítico).
  function tocarBeep() {
    try {
      garantirAudio()
      const ctx = audioRef.current
      if (!ctx) return
      const osc = ctx.createOscillator()
      const ganho = ctx.createGain()
      osc.type = 'square'
      osc.frequency.value = 880 // tom agudo
      ganho.gain.value = 0.04 // volume baixo
      osc.connect(ganho)
      ganho.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.18)
    } catch {
      // O navegador pode bloquear áudio antes de uma interação — ignora.
    }
  }

  // EFEITO: liga/desliga a transmissão ao vivo.
  // Cria um setInterval que gera uma leitura a cada 2s e limpa ao desmontar/pausar.
  useEffect(() => {
    if (!ativo) return // pausado (HOLD): não cria intervalo

    const intervalo = setInterval(() => {
      proximoId.current += 1
      const nova = gerarLeitura(proximoId.current)
      if (nova.status !== 'Normal') totalAlertas.current += 1
      if (nova.status === 'Critico') tocarBeep()
      // mantém apenas as últimas MAX_LEITURAS leituras na memória
      setLeituras((anteriores) => [...anteriores, nova].slice(-MAX_LEITURAS))
    }, 2000)

    // Limpeza: roda quando o componente desmonta ou quando 'ativo' muda.
    return () => clearInterval(intervalo)
  }, [ativo])

  // Fecha o contexto de áudio ao sair da página (libera o recurso).
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.close()
        audioRef.current = null
      }
    }
  }, [])

  // Reinicia a simulação para os dados iniciais (botão opcional).
  function reiniciar() {
    proximoId.current = seed.length
    totalAlertas.current = ALERTAS_INICIAIS
    setLeituras(seed.map((l) => ({ ...l, status: avaliarStatus(l) })))
    setFiltro('Todos')
  }

  /* ------------------ valores derivados (recalculados a cada render) ------------------ */
  const ultima = leituras[leituras.length - 1]

  // Últimas 20 temperaturas para o gráfico
  const ultimas20 = leituras.slice(-20).map((l) => l.temperatura)

  // Lista de alertas (Alerta + Crítico), mais novos primeiro
  const alertas = leituras.filter((l) => l.status !== 'Normal').slice().reverse()

  // Histórico: últimas 60 leituras, mais novas primeiro
  const historico = leituras.slice(-60).reverse()
  const historicoFiltrado =
    filtro === 'Todos' ? historico : historico.filter((l) => l.status === filtro)

  // Estatísticas por parâmetro (espelham a saída do protótipo em Python)
  const statsTemp = estatisticas(leituras, 'temperatura')
  const statsPress = estatisticas(leituras, 'pressao')
  const statsVel = estatisticas(leituras, 'velocidade')

  // Há um Crítico na leitura mais recente? (mostra o banner vermelho)
  const emCritico = ultima && ultima.status === 'Critico'

  // Link para o dashboard completo (usa o repo do produto enquanto não houver URL).
  const linkCompleto = URL_DASHBOARD_COMPLETO.startsWith('PASTE_')
    ? REPO_PRODUTO
    : URL_DASHBOARD_COMPLETO

  return (
    <div className="pagina container dashboard">
      {/* CABEÇALHO + CONTROLE LIVE/HOLD */}
      <header className="dash-cabecalho">
        <div>
          <span className="kicker">Produto · Telemetria ao vivo</span>
          <h1 className="cabecalho-titulo" style={{ marginTop: '12px' }}>
            Dashboard da Cápsula Dragon
          </h1>
        </div>

        <div className="dash-controles">
          <span className={ativo ? 'indicador-live ligado' : 'indicador-live'}>
            <span className="ponto" aria-hidden="true"></span>
            {ativo ? 'TRANSMITINDO' : 'PAUSADO'}
          </span>
          <button
            className={ativo ? 'botao botao-hold' : 'botao botao-live'}
            onClick={() => {
              garantirAudio() // destrava o áudio na 1ª interação do usuário
              setAtivo((a) => !a)
            }}
          >
            {ativo ? (
              <>
                <Icon name="pause" size={16} /> HOLD
              </>
            ) : (
              <>
                <Icon name="play" size={16} /> LIVE
              </>
            )}
          </button>
          <button className="botao botao-secundario" onClick={reiniciar}>
            <Icon name="reiniciar" size={16} /> Reiniciar
          </button>
        </div>
      </header>

      {/* AVISO: esta é uma demonstração; existe um painel mais completo */}
      <div className="aviso-demo">
        <span className="aviso-icone">
          <Icon name="signal" size={22} />
        </span>
        <p>
          <strong>Versão de demonstração.</strong> Este painel roda com dados
          simulados no navegador. A equipe desenvolveu um dashboard de telemetria{' '}
          <strong>mais completo e robusto</strong> no produto real — esta versão serve
          para mostrar o conceito funcionando dentro da vitrine.
        </p>
        <a
          href={linkCompleto}
          target="_blank"
          rel="noopener noreferrer"
          className="botao botao-secundario aviso-acao"
        >
          Abrir dashboard completo <Icon name="externo" size={16} />
        </a>
      </div>

      {/* BANNER DE CRÍTICO */}
      {emCritico && (
        <div className="banner-critico" role="alert">
          <Icon name="alerta" size={20} />
          ALERTA CRÍTICO — Temperatura em {ultima.temperatura} °C (acima de{' '}
          {LIMITES.TEMP_CRITICO} °C). Ação imediata recomendada.
        </div>
      )}

      {/* CARDS DOS VALORES ATUAIS */}
      <section className="dash-metricas">
        <MetricaCard
          rotulo="Temperatura"
          valor={ultima ? ultima.temperatura : '--'}
          unidade="°C"
          status={ultima ? statusTemperatura(ultima.temperatura) : 'Normal'}
          icone="termometro"
        />
        <MetricaCard
          rotulo="Pressão"
          valor={ultima ? ultima.pressao : '--'}
          unidade="kPa"
          status={ultima ? statusPressao(ultima.pressao) : 'Normal'}
          icone="manometro"
        />
        <MetricaCard
          rotulo="Velocidade"
          valor={ultima ? ultima.velocidade : '--'}
          unidade="km/h"
          status={ultima ? statusVelocidade(ultima.velocidade) : 'Normal'}
          icone="foguete"
        />
      </section>

      {/* GRÁFICO + PAINEL DE ALERTAS */}
      <section className="dash-meio">
        <div className="painel">
          <div className="painel-cabecalho">
            <h2 className="painel-titulo">Temperatura — últimas leituras</h2>
            <span className="painel-info">Limite crítico: {LIMITES.TEMP_CRITICO} °C</span>
          </div>
          <LiveChart dados={ultimas20} limite={LIMITES.TEMP_CRITICO} />
        </div>

        <div className="painel painel-alertas">
          <div className="painel-cabecalho">
            <h2 className="painel-titulo">Alertas</h2>
            <span className="painel-info">{totalAlertas.current} no total</span>
          </div>

          {alertas.length === 0 ? (
            <p className="lista-vazia">Nenhum alerta até agora. Tudo nominal.</p>
          ) : (
            <ul className="lista-alertas" aria-live="polite" aria-relevant="additions">
              {/* Mostra os 30 alertas mais recentes para manter a lista leve */}
              {alertas.slice(0, 30).map((a) => (
                <li
                  key={a.id}
                  className={
                    a.status === 'Critico' ? 'alerta-item critico' : 'alerta-item'
                  }
                >
                  <span className="alerta-ponto" aria-hidden="true"></span>
                  <div className="alerta-texto">
                    <strong>
                      Leitura #{a.id} — {a.status === 'Critico' ? 'Crítico' : 'Alerta'}
                    </strong>
                    <span>
                      {a.temperatura} °C · {a.pressao} kPa · {a.velocidade} km/h
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ESTATÍSTICAS RESUMIDAS */}
      <section className="painel">
        <div className="painel-cabecalho">
          <h2 className="painel-titulo">Resumo da missão</h2>
        </div>
        <div className="resumo-grid">
          <div className="resumo-box">
            <span className="resumo-numero">{proximoId.current}</span>
            <span className="resumo-rotulo">Leituras totais</span>
          </div>
          <div className="resumo-box">
            <span className="resumo-numero">{totalAlertas.current}</span>
            <span className="resumo-rotulo">Alertas totais</span>
          </div>
          <EstatBox titulo="Temperatura (°C)" stats={statsTemp} />
          <EstatBox titulo="Pressão (kPa)" stats={statsPress} />
          <EstatBox titulo="Velocidade (km/h)" stats={statsVel} />
        </div>
      </section>

      {/* TABELA DE HISTÓRICO + FILTRO */}
      <section className="painel">
        <div className="painel-cabecalho">
          <h2 className="painel-titulo">Histórico (últimas 60)</h2>
          <div className="filtros" role="group" aria-label="Filtrar por status">
            {OPCOES_FILTRO.map((op) => (
              <button
                key={op.valor}
                className={
                  filtro === op.valor ? 'filtro-botao ativo' : 'filtro-botao'
                }
                aria-pressed={filtro === op.valor}
                onClick={() => setFiltro(op.valor)}
              >
                {op.rotulo}
              </button>
            ))}
          </div>
        </div>

        <div className="tabela-rolagem">
          <table className="tabela">
            <thead>
              <tr>
                <th>#</th>
                <th>Temp (°C)</th>
                <th>Pressão (kPa)</th>
                <th>Velocidade (km/h)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {historicoFiltrado.length === 0 ? (
                <tr>
                  <td colSpan="5" className="lista-vazia">
                    Nenhuma leitura para esse filtro.
                  </td>
                </tr>
              ) : (
                historicoFiltrado.map((l) => (
                  <tr key={l.id}>
                    <td>{l.id}</td>
                    <td>{l.temperatura}</td>
                    <td>{l.pressao}</td>
                    <td>{l.velocidade}</td>
                    <td>
                      <StatusBadge status={l.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

/* ------------------ subcomponentes pequenos (só desta página) ------------------ */

// Card de um valor atual (Temperatura / Pressão / Velocidade)
function MetricaCard({ rotulo, valor, unidade, status, icone }) {
  const classeStatus =
    status === 'Critico'
      ? 'metrica critico'
      : status === 'Alerta'
      ? 'metrica alerta'
      : 'metrica normal'

  return (
    <article className={classeStatus} aria-label={`${rotulo}: ${valor} ${unidade}`}>
      <div className="metrica-topo">
        <span className="metrica-icone">
          <Icon name={icone} size={22} />
        </span>
        <StatusBadge status={status} />
      </div>
      <span className="metrica-rotulo">{rotulo}</span>
      <span className="metrica-valor">
        {valor}
        <small> {unidade}</small>
      </span>
    </article>
  )
}

// Caixinha de estatísticas (min / máx / média) de um parâmetro
function EstatBox({ titulo, stats }) {
  return (
    <div className="resumo-box estat">
      <span className="resumo-rotulo forte">{titulo}</span>
      <div className="estat-linha">
        <span>mín: <strong>{stats.min}</strong></span>
        <span>máx: <strong>{stats.max}</strong></span>
        <span>méd: <strong>{stats.media}</strong></span>
      </div>
    </div>
  )
}

export default Dashboard
