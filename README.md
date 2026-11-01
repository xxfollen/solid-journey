# 🔥 Streak Web — Rastreador de Tarefas & Hábitos

Aplicativo web completo de gerenciamento de tarefas, rotinas e hábitos inspirado no visual e na filosofia do **[InlitX/streak](https://github.com/InlitX/streak)**.

Possui **duas versões com abas completamente separadas** acessíveis via autenticação/login:
1. **Versão Exclusiva (Pessoal)**: Área 100% privada para o usuário logado acompanhar suas rotinas diárias, histórico, heatmap de atividade visual e bater recordes de sequência inquebrável.
2. **Versão em Conjunto (Time de 3 Pessoas)**: Painel colaborativo para o trio (Emmanuel, Lucas e Beatriz), com meta compartilhada onde **o streak do time só avança se os 3 cumprirem suas tarefas**, feed de incentivos e pódio de consistência.

---

## ✨ Principais Funcionalidades

### 👤 1. Versão Exclusiva (Minha Rotina)
- **Visual InlitX / Streak Minimalist & Expressive**: Dark mode imersivo com cores vibrantes para cada categoria.
- **Contador de Streak 🔥**: Badges em tempo real de sequência atual, recorde histórico e congelamentos de sequência (Streak Freeze ❄️).
- **Mapa de Consistência (Heatmap Grid)**: Matriz visual de 98 dias (estilo GitHub / Streak) com níveis de intensidade baseados em check-ins diários.
- **Check-in em 1 Clique**: Feedback auditivo imediato (Web Audio API) e chuva de confetes 🎉 em marcos de streak.
- **Filtros Inteligentes**: Por status (Todos, Pendentes, Concluídos) e categorias (Saúde, Fitness, Foco & Carreira, Mente, etc.).
- **Criação & Edição Customizada**: Emojis dedicados, seletor de cores em disco e horários do dia.

### 👥 2. Versão em Conjunto (3 Pessoas)
- **Streak Coletivo do Trio 🔥**: Contagem unificada que cresce apenas com a cooperação e comprometimento dos 3 membros.
- **Cards de Status dos 3 Integrantes**:
  - Emmanuel (Você)
  - Lucas
  - Beatriz
- **Metas Conjuntas com Check-in Individual**: Cada integrante marca a sua própria tarefa na lista (ex: "Treino de 30m", "Sprint de Estudos 1h", "Standup Diário").
- **Mural de Atividades & Incentivos**: Feed dinâmico com reações em tempo real (🔥, 👏, ⚡, 💪) e botão de cutucar/cobrar.
- **Pódio de Consistência**: Ranking com medalhas de ouro, prata e bronze baseado na taxa de conclusão.

### ⏱️ Ferramentas Produtivas
- **Streak Focus Timer (Pomodoro)** integrado: 25min de foco profundo, 5min de pausa curta e 15min de pausa longa, com vínculo opcional a tarefas.
- **Troca Rápida de Perfil / Login**: Alterne entre os 3 integrantes instantaneamente para testar e usar.
- **Persistência Automática**: Salva tudo localmente no navegador (LocalStorage) com opção de restauração rápida.

---

## 🚀 Como Executar

Você pode iniciar o projeto de duas formas:

### Opção 1: Clicar duas vezes no executável
Basta dar dois cliques no arquivo `start.bat` dentro da pasta `streak-web`.

### Opção 2: Pelo Terminal / PowerShell
```bash
cd "C:\Users\Emmanuel\.gemini\antigravity\scratch\streak-web"
npm.cmd run dev
```

Abra o navegador no endereço indicado (geralmente [http://localhost:5173](http://localhost:5173)).
