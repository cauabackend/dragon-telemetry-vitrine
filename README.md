# 🛰️ Dragon Telemetry — Vitrine + Dashboard ao vivo

Aplicação **React** desenvolvida para a disciplina de **Desenvolvimento Web** da
FIAP (Global Solution 2026). É a continuação do projeto criado em **Front-End
Design**, agora reconstruído em React.

O **Dragon Telemetry** é uma solução de tema espacial (inspirada na cápsula Dragon /
SpaceX) que funciona como três coisas ao mesmo tempo:

- 🪐 **Vitrine** — as páginas de apresentação do produto (Problema, Objetivos,
  Tecnologia, Benefícios e Aplicação).
- 📡 **Produto** — um **dashboard de telemetria ao vivo** que roda **dentro da própria
  aplicação** (rota `/dashboard`), simulando o monitoramento da cápsula em tempo real.
- 🧩 **Hub de integração** — conecta as outras partes do projeto (Front-End, Edge
  Computing / ESP32 e Python).

---

## 🔐 Usuários e senhas

**Não há login/usuários.** A aplicação é totalmente pública e os dados são simulados
localmente no navegador.

---

## ⚙️ Instalação e execução (passo a passo)

> Pré-requisito: ter o **Node.js 18+** instalado.

```bash
# 1. Instalar as dependências
npm install

# 2. Rodar em modo desenvolvimento
npm run dev
```

Depois abra o endereço que aparecer no terminal (normalmente
`http://localhost:5173`).

Para gerar a versão de produção:

```bash
npm run build      # gera a pasta dist/
npm run preview    # pré-visualiza a build localmente
```

---

## 🚀 Deploy

- **Link do deploy (Vercel):** `PASTE_VERCEL_LINK_HERE`
- **Repositório (GitHub):** `PASTE_GITHUB_LINK_HERE`

### Observação sobre rotas no deploy

O projeto usa `<BrowserRouter>`. Para o deploy na **Vercel**, o arquivo
[`vercel.json`](./vercel.json) já contém um *rewrite* que redireciona qualquer rota
para o `index.html` — assim, recarregar a página em `/dashboard` **não dá erro 404**.

> Se for publicar no **GitHub Pages**, troque o `<BrowserRouter>` por `<HashRouter>`
> em [`src/main.jsx`](./src/main.jsx), pois o GitHub Pages não suporta o *rewrite*
> de rotas no servidor (as URLs passam a ter `#`, ex.: `/#/dashboard`).

---

## 📊 O Dashboard (o produto)

> Esta é uma **versão de demonstração** rodando dentro da vitrine (dados simulados no
> navegador). O dashboard **completo e mais robusto** do produto está publicado em
> **https://dragontelemetry.vercel.app/** — há um botão direto para ele dentro da rota
> `/dashboard`.

A rota `/dashboard` é um painel **de verdade**, que atualiza sozinho:

- **LIVE / HOLD** — gera uma nova leitura a cada ~2 segundos (`useEffect` +
  `setInterval`); o botão pausa e retoma a transmissão.
- **Cards dos valores atuais** — Temperatura, Pressão e Velocidade, com cor de status
  (verde Normal / amarelo Alerta / vermelho Crítico).
- **Gráfico ao vivo** — linha/área das últimas ~20 leituras de temperatura, feito só
  com **SVG** (sem biblioteca de gráficos).
- **Painel de alertas** — lista as anomalias (mais recentes primeiro) e destaca os
  críticos (com aviso sonoro via Web Audio API).
- **Tabela de histórico** — últimas 60 leituras, com filtro
  (Todos / Normal / Alerta / Crítico).
- **Resumo da missão** — total de leituras, total de alertas e mín./máx./média por
  parâmetro.

### Limites de segurança (os mesmos do protótipo em Python)

| Parâmetro    | Faixa normal       | Condição de alerta/crítico        |
| ------------ | ------------------ | --------------------------------- |
| Temperatura  | até 70 °C          | > 70 °C Alerta · **> 80 °C Crítico** |
| Pressão      | 90 – 105 kPa       | fora da faixa = Alerta            |
| Velocidade   | 7500 – 8000 km/h   | fora da faixa = Alerta            |

---

## 🧩 Projeto Integrado

O Dragon Telemetry é construído por várias disciplinas. Os artefatos reais estão
listados na rota `/projeto` e também aqui:

| Artefato                         | Disciplina             | Link |
| -------------------------------- | ---------------------- | ---- |
| Dashboard completo (deploy)      | Front-End / Produto    | https://dragontelemetry.vercel.app/ |
| Código do Front-End              | Front-End Design       | https://github.com/RenanSantos0/dragon-telemetry |
| Sistema Embarcado (ESP32)        | Edge Computing         | https://github.com/Estevo00/Dragon-Telemetry-System---Edge-Computing-Computer-Systems |
| Simulação do Hardware (Wokwi)    | Edge Computing         | https://wokwi.com/projects/465937213607910401 |
| Protótipo em Python              | Computational Thinking | `PASTE_PYTHON_REPO_LINK_HERE` |

> O **dashboard ao vivo não é um link externo** — ele roda dentro desta aplicação em
> `/dashboard`.

---

## 🗺️ Rotas da aplicação (React Router DOM)

| Rota          | Página                                              |
| ------------- | --------------------------------------------------- |
| `/`           | Home (abertura + botão "Abrir Dashboard")           |
| `/problema`   | O Problema (riscos da missão / lixo espacial)       |
| `/objetivos`  | Objetivos                                           |
| `/tecnologia` | Tecnologia (cards da stack + links Edge e Wokwi)    |
| `/beneficios` | Benefícios (cards)                                  |
| `/aplicacao`  | Aplicação no dia a dia                              |
| `/dashboard`  | **Dashboard de telemetria ao vivo (o produto)**     |
| `/projeto`    | O Projeto Integrado (cards que ligam cada artefato) |
| `*`           | Página 404 (NotFound)                               |

---

## 🛠️ Tecnologias

- **React** (com **Vite**) — JavaScript + JSX
- **react-router-dom** v6
- **CSS puro** com variáveis (sem Tailwind, sem styled-components)
- **SVG nativo** para o gráfico
- **Web Audio API** para o beep de alerta crítico
- Sem backend — dados simulados localmente (JSON + geração no navegador)

## 📁 Estrutura de pastas

```
web-vitrine-gs2/
├─ public/
│  └─ dragon.svg
├─ src/
│  ├─ components/   (Navbar, Footer, Card, LinkCard, StatusBadge, LiveChart)
│  ├─ pages/        (Home, Problema, Objetivos, Tecnologia, Beneficios,
│  │                 Aplicacao, Dashboard, Projeto, NotFound)
│  ├─ data/         (telemetria.json, projetos.json)
│  ├─ App.jsx       (rotas)
│  ├─ main.jsx      (ponto de entrada + BrowserRouter)
│  └─ index.css     (estilos globais)
├─ index.html
├─ vercel.json
├─ vite.config.js
└─ package.json
```

---

## 👥 Equipe

| Nome                      | RM        |
| ------------------------- | --------- |
| Cauã Pereira da Silva     | RM568143  |
| Felipe Estevo Santos      | RM567780  |
| Igor Grave Teixeira       | RM567663  |
| Renan dos Reis Santos     | RM568540  |

**Turma:** `[PREENCHER]`

---

> ⚠️ A pasta `node_modules` **não é enviada** no projeto (está no `.gitignore`).
> Rode `npm install` para baixá-la.
