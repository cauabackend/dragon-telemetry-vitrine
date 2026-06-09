# Dragon Telemetry — Vitrine e Dashboard de Telemetria

Aplicação **React** desenvolvida para a disciplina de **Desenvolvimento Web** da FIAP
(Global Solution 2026). Trata-se da continuação do projeto criado em **Front-End
Design**, agora reconstruído em React.

O **Dragon Telemetry** é uma solução de tema espacial (inspirada na cápsula Dragon, da
SpaceX) que cumpre três funções simultâneas:

- **Vitrine** — páginas institucionais de apresentação do produto (Problema, Objetivos,
  Tecnologia, Benefícios e Aplicação).
- **Produto** — um dashboard de telemetria em tempo real, executado **dentro da própria
  aplicação** (rota `/dashboard`), que simula o monitoramento da cápsula.
- **Hub de integração** — centraliza o acesso às demais frentes do projeto (Front-End,
  Edge Computing / ESP32 e Python).

---

## Usuários e senhas

Não há autenticação. A aplicação é de acesso público e os dados são simulados
localmente no navegador.

---

## Instalação e execução

Pré-requisito: **Node.js 18 ou superior**.

```bash
# 1. Instalar as dependências
npm install

# 2. Executar em modo de desenvolvimento
npm run dev
```

Em seguida, acesse o endereço exibido no terminal (normalmente
`http://localhost:5173`).

Para gerar a versão de produção:

```bash
npm run build      # gera a pasta dist/
npm run preview    # pré-visualiza a build localmente
```

---

## Deploy

- **Link do deploy (Vercel):** https://dragon-telemetry-vitrine.vercel.app/
- **Repositório (GitHub):** https://github.com/cauabackend/dragon-telemetry-vitrine

### Observação sobre o roteamento em produção

O projeto utiliza `<BrowserRouter>`. Para o deploy na **Vercel**, o arquivo
[`vercel.json`](./vercel.json) já contém um *rewrite* que redireciona qualquer rota para
o `index.html`, de modo que recarregar a página em `/dashboard` não resulte em erro 404.

Caso a publicação seja feita no **GitHub Pages**, substitua `<BrowserRouter>` por
`<HashRouter>` em [`src/main.jsx`](./src/main.jsx), pois o GitHub Pages não suporta o
*rewrite* de rotas no servidor (as URLs passam a conter `#`, por exemplo
`/#/dashboard`).

---

## O Dashboard (produto)

> Esta é uma **versão de demonstração**, executada dentro da vitrine com dados simulados
> no navegador. O dashboard completo e mais robusto do produto está publicado em
> **https://dragontelemetry.vercel.app/**, com acesso direto a partir da rota
> `/dashboard`.

A rota `/dashboard` apresenta um painel funcional, com atualização automática:

- **LIVE / HOLD** — gera uma nova leitura a cada dois segundos (`useEffect` +
  `setInterval`); o botão permite pausar e retomar a transmissão.
- **Cartões de valores atuais** — Temperatura, Pressão e Velocidade, com cor de status
  (verde Normal, amarelo Alerta, vermelho Crítico).
- **Gráfico em tempo real** — linha/área das últimas vinte leituras de temperatura,
  construído exclusivamente com **SVG** (sem biblioteca de gráficos).
- **Painel de alertas** — relaciona as anomalias (mais recentes primeiro) e destaca as
  ocorrências críticas, com aviso sonoro via Web Audio API.
- **Tabela de histórico** — últimas sessenta leituras, com filtro
  (Todos, Normal, Alerta, Crítico).
- **Resumo da missão** — total de leituras, total de alertas e mínimo, máximo e média
  por parâmetro.

### Limites de segurança (idênticos aos do protótipo em Python)

| Parâmetro    | Faixa normal       | Condição de alerta/crítico           |
| ------------ | ------------------ | ------------------------------------ |
| Temperatura  | até 70 °C          | > 70 °C Alerta · **> 80 °C Crítico** |
| Pressão      | 90 – 105 kPa       | fora da faixa = Alerta               |
| Velocidade   | 7500 – 8000 km/h   | fora da faixa = Alerta               |

---

## Projeto Integrado

O Dragon Telemetry é composto por entregas de diferentes disciplinas. Os artefatos estão
relacionados na rota `/projeto` e também abaixo:

| Artefato                         | Disciplina             | Link |
| -------------------------------- | ---------------------- | ---- |
| Vitrine + Dashboard (este app)   | Web Development        | https://dragon-telemetry-vitrine.vercel.app/ |
| Dashboard completo (produto)     | Produto                | https://dragontelemetry.vercel.app/ |
| Código do Front-End              | Front-End Design       | https://github.com/RenanSantos0/dragon-telemetry |
| Sistema Embarcado (ESP32)        | Edge Computing         | https://github.com/Estevo00/Dragon-Telemetry-System---Edge-Computing-Computer-Systems |
| Simulação do Hardware (Wokwi)    | Edge Computing         | https://wokwi.com/projects/465937213607910401 |
| Protótipo em Python              | Computational Thinking | `PASTE_PYTHON_REPO_LINK_HERE` |

> O dashboard em tempo real não é um link externo: ele é executado dentro desta
> aplicação, na rota `/dashboard`.

---

## Rotas da aplicação (React Router DOM)

| Rota          | Página                                              |
| ------------- | --------------------------------------------------- |
| `/`           | Home (abertura e acesso ao Dashboard)               |
| `/problema`   | O Problema (riscos da missão e detritos orbitais)   |
| `/objetivos`  | Objetivos                                           |
| `/tecnologia` | Tecnologia (stack e fluxo de dados)                 |
| `/beneficios` | Benefícios                                          |
| `/aplicacao`  | Aplicação no dia a dia                              |
| `/dashboard`  | Dashboard de telemetria em tempo real (produto)     |
| `/projeto`    | Projeto Integrado (artefatos das disciplinas)       |
| `*`           | Página 404 (NotFound)                               |

---

## Tecnologias

- **React** (com **Vite**) — JavaScript e JSX
- **react-router-dom** v6
- **CSS puro** com variáveis (sem Tailwind e sem styled-components)
- **SVG nativo** para o gráfico de telemetria e os elementos animados
- **Web Audio API** para o alerta sonoro de ocorrência crítica
- **IntersectionObserver** para as animações de entrada (sem bibliotecas)
- Sem backend — dados simulados localmente (JSON e geração no navegador)

---

## Estrutura de pastas

```
web-vitrine-gs2/
├─ public/
│  └─ dragon.svg
├─ src/
│  ├─ components/   Navbar, Footer, Card, LinkCard, StatusBadge, LiveChart,
│  │                Icon, Reveal, Counter, DebrisField, FlowDiagram, PageNav
│  ├─ pages/        Home, Problema, Objetivos, Tecnologia, Beneficios,
│  │                Aplicacao, Dashboard, Projeto, NotFound
│  ├─ data/         telemetria.json, projetos.json
│  ├─ App.jsx       rotas e efeitos globais
│  ├─ main.jsx      ponto de entrada e BrowserRouter
│  └─ index.css     estilos globais
├─ index.html
├─ vercel.json
├─ vite.config.js
└─ package.json
```

---

## Equipe

| Nome                      | RM        |
| ------------------------- | --------- |
| Cauã Pereira da Silva     | RM568143  |
| Felipe Estevo Santos      | RM567780  |
| Igor Grave Teixeira       | RM567663  |
| Renan dos Reis Santos     | RM568540  |

**Turma:** `[PREENCHER]`

---

A pasta `node_modules` não é versionada nem submetida (está no `.gitignore`). Execute
`npm install` para restaurá-la.
