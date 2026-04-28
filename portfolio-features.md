# Portfolio — Mateus Vitor Silva Andrade

> **Arquivo de contexto para uso com Claude no site oficial.**
> Contém informações detalhadas sobre identidade profissional, stack técnica e features desenvolvidas. Estruturado em seções independentes para facilitar referência e atualização incremental do site.

---

## 1. Identidade Profissional

**Nome:** Mateus Vitor Silva Andrade
**Cargo:** Desenvolvedor Full Stack (Mobile, Backend & IA)
**Localização:** Brasil
**Idiomas:** Português (nativo), Inglês (avançado)
**Formação:** Bacharelado em Sistemas de Informação — Universidade Federal de Ouro Preto (UFOP), 2020-2025

**Contatos:**
- Email: mateus.vitor.andrade@gmail.com
- LinkedIn: https://www.linkedin.com/in/mateus-andrade-dev/
- GitHub: https://github.com/MattAndrade87

**Posicionamento:** Desenvolvedor Full Stack pleno com experiência projetando e implementando features complexas end-to-end (mobile, backend e dashboard) em sistemas distribuídos. Foco em arquitetura orientada a eventos, microsserviços, performance e integrações com IA em tempo real.

---

## 2. Stack Técnica

### Linguagens
TypeScript, JavaScript, C#, Python, PHP, SQL

### Frontend
React, Next.js, React Native (Expo), Zustand, TanStack Query, Tailwind CSS, MMKV

### Backend
ASP.NET Core, EF Core, Node.js, NestJS, Express, FastAPI

### Banco de Dados
PostgreSQL, MongoDB, Supabase (com Row Level Security), Redis

### Mensageria & Background Jobs
RabbitMQ, MassTransit, Hangfire, Background Services do .NET

### IA & Tempo Real
OpenAI API, WebRTC, LiveKit, ElevenLabs, AssemblyAI (STT), Google TTS

### DevOps & Infra
Docker, Caddy, Git, GitHub Actions, CI/CD, Linux, Sentry, Ansible, Infisical

### Arquitetura & Padrões
Clean Architecture, SOLID, REST APIs, Event-Driven Architecture, Microsserviços, Repository Pattern, CQRS-light

### Testes
xUnit, Testcontainers (PostgreSQL containerizado), Jest, Moq, testes unitários e de integração

### Migrations & Schema
Sqitch (migrations versionadas), modelagem de dados relacionais multi-tenant

### Outros
WebSockets, JWT, OAuth (Supabase Auth), FCM/APNs (push notifications), Stripe, Agile/Scrum, Code Review, MMKV, PostHog (analytics)

---

## 3. Empresa Atual: Woolly

**Tipo:** Plataforma educacional gamificada com tutores de IA por voz em tempo real
**Período:** Janeiro 2026 — Atual
**Cargo:** Desenvolvedor Full Stack (Mobile, Backend & IA)

**Contexto do produto:**
Woolly é um aplicativo educacional onde estudantes conversam por voz, em tempo real, com agentes de IA personalizados. O app combina pedagogia, gamificação (níveis, ranking, missões, colecionáveis, streaks) e tecnologia conversacional avançada (WebRTC, pipeline STT→LLM→TTS) para criar experiências de aprendizagem imersivas.

**Atuação end-to-end:**
- App mobile em React Native/Expo
- Backend distribuído em ASP.NET Core
- Servidor dedicado de jobs (Hangfire) em VPS próprio
- Dashboard administrativo em React
- Modelagem de banco de dados (PostgreSQL/Supabase)
- Infraestrutura (Docker, Caddy, Ansible, Infisical)

---

## 4. Features Principais Desenvolvidas

### 4.1 — Otimização de Geração de Quizzes via IA (Performance)

**Resumo executivo:**
Reduzi em 70% o tempo de geração de quizzes por IA (de 22s para 7s) ao paralelizar chamadas à OpenAI usando `Task.WhenAll`, dividindo perguntas em lotes de 2-3 e mesclando resultados.

**Problema:**
A geração de quizzes via OpenAI demorava ~22s para 5 perguntas porque o modelo precisava produzir token por token um JSON gigante com todas as perguntas, alternativas e justificativas. Combinado com polling fixo de 2s no mobile e animações que forçavam espera mínima de ~18s, a UX era prejudicial.

**Solução técnica:**
- Backend (`QuizAiFeaturesService.cs` em C#): método `ComputeBatches` divide N perguntas em lotes de 2-3 (ex: 5→[3,2], 10→[3,3,2,2], 15→[3,3,3,3,3]). `Task.WhenAll` dispara chamadas paralelas, cada uma com prompt enxuto. Resultados são mesclados e os IDs das perguntas re-numerados sequencialmente.
- Frontend (React Native): polling com **backoff progressivo** (1s, 2s, 3s, 4s, 5s — capado em 5s) substitui o intervalo fixo de 2s. Tempo mínimo de animações reduzido de 18s para 7s para alinhar com o tempo real de geração paralela.

**Impacto:**
- **5 perguntas:** 22s → 7-8s (-70%)
- **10 perguntas:** 40s → 8-10s (-75%)
- **15 perguntas:** 60s → 10-12s (-80%)
- Requests de polling reduzidos de ~11 para ~4-5

**Stack:** C#, ASP.NET Core, OpenAI API, `Task.WhenAll`, React Native, TanStack Query

---

### 4.2 — Arquitetura Orientada a Eventos para Gamificação

**Resumo executivo:**
Projetei e implementei a arquitetura event-driven do sistema de gamificação do Woolly usando RabbitMQ + MassTransit, com consumers idempotentes e Event Store para auditoria, garantindo desacoplamento entre módulos críticos (XP, ranking, colecionáveis, missões, streaks).

**Problema:**
Múltiplos sistemas reagem ao mesmo evento (ex: subir de nível dispara: novas missões, novos colecionáveis, atualização de tela de desbloqueio, possível envio de notificação push). Acoplar tudo no `XpService` criaria um Deus Service com responsabilidades misturadas, difícil de testar e propenso a falhas em cascata.

**Solução técnica:**
- **Eventos publicados** (records imutáveis no projeto `Contracts/Events/`):
  - `AlunoSubiuDeNivel(AlunoId, NivelAnterior, NivelNovo)` — publicado pelo `XpService` quando detecta mudança de nível
  - `AlunoPromovido(AlunoId, RankingPeriodId)` — publicado pelo `RankingAdminService` na promoção de tier
  - `RankingFinalizado(AlunoId, RankingPeriodId, ArenaId, FinalPosition)` — publicado para top 3 de cada grupo
  - `StreakMilestoneAtingido(AlunoId, StreakDays)` — publicado pelo `StreakService` em marcos especiais
- **Consumers** (em `Modules/Gamificacao/Consumers/`): cada consumer lê via MassTransit do RabbitMQ, registra no `EventStore` antes de processar (idempotência via `eventId` composto, ex: `{alunoId}:{streakDays}`), e marca como processed/failed.
- **Garantias:** at-least-once delivery, idempotência via Event Store + chave composta, retry automático em falhas de processamento, falhas em publicação são logadas mas não abortam transação principal (resiliência).

**Casos de uso reais:**
- Subir de nível dispara `AlunoSubiuDeNivelConsumer` que itera níveis intermediários (ex: pulou de 3 para 6 → processa 4, 5, 6) e chama `ColecionavelService.AwardLevelUpCollectibles` para cada nível, garantindo que pulos múltiplos não percam recompensas.
- Finalizar período de ranking publica eventos para top 3 de cada grupo; `RankingFinalizadoConsumer` valida posição (1-3), registra no Event Store e chama `AwardRankingMedals`.

**Stack:** C#, ASP.NET Core, RabbitMQ, MassTransit, EF Core, PostgreSQL, EventStore pattern customizado

---

### 4.3 — Sistema Distribuído de Push Notifications Multi-Plataforma

**Resumo executivo:**
Construí um sistema de push notifications escalável (iOS APNs + Android FCM) com 4 jobs Hangfire segmentados por horário do usuário, envio paralelo de batches via `SemaphoreSlim` (3x throughput), receipt checking assíncrono e desativação automática de tokens inválidos. 99 testes automatizados cobrem o sistema.

**Problema:**
- Enviar uma notificação push por vez para milhares de usuários é lento e estoura rate limits da Expo API
- Tokens expirados/desinstalados acumulam silenciosamente, gastando recursos
- Lembretes diários no horário errado têm baixa conversão (estudante que estuda à noite recebe lembrete às 9h)
- Operações em produção requerem visibilidade e capacidade de ação manual

**Solução técnica:**
- **Servidor Hangfire dedicado** (VPS próprio em 187.127.2.241 com Docker + Caddy/HTTPS + Caddy basic auth para o dashboard)
- **5 recurring jobs e 1 delayed job:**
  - `ProcessPendingNotificationsJob` (a cada 5min): busca até 500 pendentes via SQL com `FOR UPDATE SKIP LOCKED` (lock distribuído), envia individualmente per-aluno para tratamento correto de falhas parciais
  - `StreakWarningJob` (18h BRT): identifica alunos com streak em risco (praticaram ontem, não hoje, com push token ativo) via JOIN otimizado, cancela pendentes em batch e agenda em batch
  - `InactivityWarningJob` (17h BRT): alunos com 2+ dias sem `streaks.date`, com anti-spam de 24h dentro da própria query SQL
  - `DailyReminderJob` (4 schedules: 09h/13h/16h/21h BRT) — segmentação por preferência do usuário (`alunos.horario_lembrete`: CAFE_MANHA/ALMOCO/CAFE_TARDE/ANTES_DORMIR), cada job envia apenas para seu segmento, template selecionado em runtime por dia da semana (7 variantes)
  - `CheckPushReceiptsJob` (delayed 15min após cada envio): verifica receipts da Expo API e desativa tokens inválidos (`DeviceNotRegistered`) em batch
- **Otimizações de performance no `ExpoPushNotificationService`:**
  - Chunking automático de 100 msgs/request (limite da Expo API)
  - **Envio paralelo:** até 3 batches simultâneos via `SemaphoreSlim(3)` com `ConcurrentBag<T>` para coleta thread-safe (~3x throughput)
  - **Batch deactivation:** tokens inválidos coletados durante envio e desativados em uma única query SQL via `ExecuteUpdateAsync`
- **Soft pre-prompt para Apple Review:** modal customizada antes do dialog nativo do iOS, com persistência da preferência (`alunos.notifications_allowed_by_user` nullable boolean)
- **Templates com placeholders:** sistema de renderização com `{streak_days}`, `{aluno_nome}`, `{days_since_last}`, etc. Logs de warning quando placeholders não substituídos.
- **Race condition no token registration:** catch de `UniqueViolation` + retry como update (3x), mais hand-off de dispositivo (mesmo token mudando de aluno).
- **Rate limiting:** policy `push-tokens` (5 req/min por usuário) no endpoint de registro.

**Cobertura de testes:** 99 testes em 3 projetos (`WoollyHangfire.Tests`, `Notificacoes.Tests`, `WoollyBackend.Tests/Features/Notifications`) usando Testcontainers + xUnit + Moq.

**Stack:** C#, ASP.NET Core, Hangfire, PostgreSQL, Expo Push API, FCM, APNs, RabbitMQ/MassTransit (para eventos de milestone), Docker, Caddy, Ansible, Infisical, xUnit, Testcontainers

---

### 4.4 — Sistema de Ranking Competitivo Semanal com Auto-Finalização

**Resumo executivo:**
Desenvolvi sistema de ranking semanal completo (arenas temáticas, tiers, promoção/rebaixamento, alocação automática) com background service de auto-finalização, optimistic concurrency via coluna `xmin` do PostgreSQL e fluxo de premiação com modal de resultado pendente.

**Problema:**
Competição semanal entre alunos requer: criação automática de períodos, agrupamento em grupos de até 30, rankeamento por XP, distribuição de outcomes (promoted/demoted/stayed) ao fim do período, alocação no próximo período no tier correto e exibição de resultado quando o aluno volta ao app. Tudo idempotente, resiliente e sem necessidade de ação manual.

**Solução técnica:**
- **Modelo:** `RankingPeriod`, `Arena`, `ArenaTier` (Bronze, Prata, Ouro com `PromotionCutoff`/`DemotionCutoff`), `RankingGroup` (max 30 membros), `Ranking` (entrada individual com `CurrentScore`, `FinalPosition`, `Outcome`).
- **Background service** (`PeriodoRankingBackgroundService`): roda a cada 30min, executa em sequência:
  1. `AtivarPeriodosAsync` — ativa períodos onde `StartTime ≤ now < EndTime`
  2. `DesativarPeriodosExpiradosAsync` — desativa períodos com `EndTime ≤ now`
  3. `AutoFinalizarPeriodosAsync` (controlado por flag `Gamificacao:AutoFinalizePeriods`) — chama `FinalizePeriod` para períodos expirados não finalizados
  4. `GarantirProximoPeriodoAsync` — cria próximo período (segunda UTC, duração configurável)
- **`FinalizePeriod`:** ordena membros por score, atribui `FinalPosition` e `Outcome` (top N → promoted, bottom N → demoted, resto → stayed), publica eventos `AlunoPromovido` e `RankingFinalizado` (top 3), aloca alunos no próximo período no tier destino. Idempotente — valida `IsFinalized` antes de executar.
- **Optimistic concurrency:** `RankingGroup` usa coluna sistema `xmin` do PostgreSQL configurada via EF Core. Duas instâncias concorrentes de finalização que toquem o mesmo grupo lançam `DbUpdateConcurrencyException` na segunda — capturado com tag `module=ranking` no Sentry. Recuperação via `BackfillAllocationForPeriod` idempotente.
- **Trigger imediato:** `IPeriodTransitionTrigger` permite ao `RankingService` acordar o background service sob demanda quando detecta flag `IsActive` stale (sync inline com `ExecuteUpdateAsync`).
- **Skin fallback em cascata** no leaderboard: skin atual → default da organização → default global → primeira disponível. Único batch de `GetSignedUrls` para todas as skins distintas.
- **Modal de resultado pendente:** endpoint `GET /api/ranking/period-result` retorna 204 se nenhum, ou DTO com posição, outcome, nova arena e medalha. Mobile usa `useCompetitionResult` + `CompetitionResultModal` (transição animada `TerraScreen` → `PrizeScreen`). Após visualização, `POST .../acknowledge` marca `ResultSeenAt`.

**Decisões de design:**
- Grupos criados sob demanda — alunos só são alocados ao ganhar primeiro XP. Antes disso, `RankingGroupId` é null e o app mostra CTA.
- Medalhas em SVG local no `PrizeScreen` evitam 1 query + 1 signed URL por request (otimização do caminho crítico de abertura do app).

**Stack:** C#, ASP.NET Core, EF Core, PostgreSQL, RabbitMQ/MassTransit, BackgroundService do .NET, React Native (mobile), React (dashboard admin)

---

### 4.5 — Pipeline de Voz em Tempo Real com IA (WebRTC + STT/LLM/TTS)

**Resumo executivo:**
Integrei conversas de voz em tempo real via WebRTC/LiveKit no app mobile, conectando ao pipeline AssemblyAI (STT) → OpenAI (LLM) → Google TTS. Implementei feature de **continuação contextual de conversas**, onde a IA recebe transcrição truncada, feedback estruturado e progressão de nível da sessão anterior.

**Problema:**
Conversa por voz com IA precisa ser de baixa latência (sob 1-2s end-to-end). Além disso, retomar uma conversa antiga sem contexto frustra o aluno — a IA "esquece" o que foi discutido. Mas mandar a transcrição inteira para a LLM em toda chamada é caro e lento.

**Solução técnica:**
- **Pipeline real-time:** mobile usa LiveKit SDK em React Native; áudio capturado vai para AssemblyAI (STT streaming), texto vai para OpenAI, resposta passa pelo Google TTS e volta como áudio.
- **Continuation context** (feature mais complexa):
  - Coluna `parent_conversation_id` na tabela `transcriptions` (string flexível para compatibilidade com IDs do ElevenLabs/LiveKit)
  - **Fonte única de verdade:** o vínculo pai→filho mora na `Conversa` no banco e é gravado no momento da criação da sessão (`CreateSession`), não no payload da chamada
  - `ContinuationContextBuilder` constrói o contexto sob demanda:
    1. Valida ownership e status `analise_ia_status == "complete"`
    2. Trunca transcrição (últimos 8 turnos, max 400 chars/msg)
    3. Extrai pontos positivos, melhorias, dica (max 3 itens cada)
    4. Detecta progressão de nível (`nivelAluno` vs `proximoNivel`)
    5. Busca memória do aluno por matéria via `IAlunoMemoriaService`
    6. Monta `ResumoEstruturado` (texto formatado para a LLM)
  - Endpoint `GET /api/conversas/{conversationId}/continuation-context` retorna 404 se feedback não pronto; **cache compartilhado via TanStack Query** entre Dialog pré-conversa, tela de chamada, histórico e tela de feedback (mesma queryKey estática)
  - Hook `useLoadContinuationContext` centraliza fetchQuery + tratamento de 404 e erros de rede com Alert
  - Histórico agrupado por assunto (`GET /api/conversas/grupos`) — agrupamento case-insensitive via `LOWER(TRIM(assunto))`, divide em buckets de 10, inlina quizzes e resumos da mesma conversa

**Stack:** React Native (Expo), WebRTC, LiveKit, AssemblyAI, OpenAI API, Google TTS, ASP.NET Core, EF Core, PostgreSQL, TanStack Query

---

### 4.6 — Sistema de Colecionáveis (Skins e Medalhas) com Backfill Retroativo

**Resumo executivo:**
Implementei sistema de itens colecionáveis (skins por level-up, medalhas por ranking), com catálogo unificado, posse rastreada via tabela junction, distribuição event-driven idempotente e endpoint admin de backfill retroativo para itens criados após o evento.

**Problema:**
- Quando o aluno sobe de nível ou é promovido em ranking, deveria receber um item visual (skin, medalha) automaticamente
- Mas se um admin cria um colecionável para nível 3 hoje e o aluno já está no nível 5, ele não receberia retroativamente — o evento `AlunoSubiuDeNivel` só dispara no momento exato do level-up
- Itens precisam respeitar limites de organização (multi-tenancy)
- Aluno pode ganhar a mesma medalha em períodos diferentes (não duplicar dentro do mesmo período)

**Solução técnica:**
- **Schema:**
  - `colecionaveis` (catálogo): id, tipo (skin/medalha), raridade (comum/raro/exotico/lendario), nivel_desbloqueia, desbloqueio_trigger (level_up/promotion/ranking)
  - `aluno_colecionaveis` (posse): aluno_id, colecionavel_id, origem, recebido_at, **arena_id e ranking_period_id** (para medalhas)
  - **Índices parciais únicos** no PostgreSQL: skins têm unicidade por `(aluno_id, colecionavel_id) WHERE arena_id IS NULL`, medalhas por `(aluno_id, colecionavel_id, arena_id, ranking_period_id) WHERE arena_id IS NOT NULL` — permite mesma medalha em períodos diferentes
- **Distribuição via consumers:**
  - `AlunoSubiuDeNivelConsumer`: itera níveis intermediários (cobre pulos múltiplos), chama `AwardLevelUpCollectibles` para cada
  - `AlunoPromovidoConsumer`: chama `AwardPromotionCollectibles`
  - `RankingFinalizadoConsumer`: valida posição (1-3), mapeia para keyword (ouro/prata/bronze), chama `AwardRankingMedals`
- **Idempotência:** unique index no banco + verificação por HashSet antes de inserir + Event Store com chave composta (`{alunoId}_{arenaId}_{rankingPeriodId}` para medalhas)
- **Backfill endpoint** (`POST /api/ColecionavelAdmin/backfill`): percorre todos os alunos, calcula nível atual via XP do `xp_ledger`, concede colecionáveis retroativos. **Idempotente** — `AwardLevelUpCollectibles` filtra por posse via HashSet antes de inserir.
- **Otimização N+1:** `BackfillRankingMedals` refatorado para 4 queries de pré-carregamento (medalhas, owned entries, orgs, rankings) + 1 `SaveChangesAsync`. Antes: ~3 queries por entrada.
- **DistinctMedals por arena:** `RankingHistoryDto` inclui lista de medalhas únicas por tipo (ouro/prata/bronze) — separa preocupação "quais medalhas o aluno tem nesta arena" do histórico período-a-período.

**Stack:** C#, ASP.NET Core, EF Core, PostgreSQL (índices parciais únicos), RabbitMQ/MassTransit, Sqitch (migrations)

---

### 4.7 — Sistema de Streaks com Timezone-Aware e Marcos Celebrativos

**Resumo executivo:**
Implementei sistema de ofensivas (streaks) com regra de 120s mínimos de conversa diária, timezone-aware (`America/Sao_Paulo`), notificações push de alerta às 18h BRT, celebração de marcos via evento MassTransit e tela pós-chamada com Lottie animations.

**Problema:**
- Streak diário precisa quebrar exatamente à meia-noite no fuso horário do usuário, não UTC — alunos perderiam streaks injustamente
- Tempo mínimo de prática (120s) impede que conversas curtas/falhas contem
- Marcos especiais (3, 7, 10, 15, 25, 40, 60, 80, 100 dias) merecem celebração diferenciada

**Solução técnica:**
- **Tabela `streaks`:** `(aluno_id, type, date)` com unique constraint, RLS para acesso só pelo dono, índices em `(aluno_id, date DESC)` e `(aluno_id, type, date DESC)`.
- **`BrazilDateTime` helper:** abstrai conversão UTC → America/Sao_Paulo para todo o sistema. Usado em `StreakService`, jobs, queries.
- **`StreakService`:**
  - `RecordDailyPractice`: insere se tempo de conversa do dia (BRT) ≥ 120s, previne duplicatas
  - `GetCurrentStreak`: conta dias consecutivos de trás pra frente
  - **Marcos (`IsStreakMilestone`):** `[3, 7, 10, 15, 25, 40, 60, 80, 100]` + múltiplos de 50 acima; alinhados ao mobile
  - Em `RecordDailyPractice`, ao detectar marco, publica `StreakMilestoneAtingido` (idempotência via `EventStoreService` com `eventId` composto `{alunoId}:{streakDays}`)
- **`StreakMilestoneAtingidoConsumer`:** registra no Event Store, busca apelido do aluno (com fallback "Estudante"), monta payload do template `streak_milestone` e agenda notificação
- **`StreakWarningJob` (Hangfire, 18h BRT):**
  - Query SQL com timezone explícito identifica alunos com streak em risco (praticaram ontem, não hoje, com push token ativo, não deletados)
  - Window function calcula dias consecutivos
  - Cancela notificações anteriores do tipo em batch
  - Agenda novas em batch (`ScheduleBatch` com único `SaveChangesAsync`)
- **Tela pós-chamada (`/chamada/streak`):**
  - Lottie de fogo, frase motivacional baseada no marco
  - **Dias especiais:** mostra `StreakCalendar` (milestone anterior/atual/próximo)
  - **Dias normais:** mostra `DiaPratica` (semana com círculos)
  - Controle MMKV (`streak_shown_{userId}`) para exibir só 1x por dia
  - Tracking PostHog `streak_viewed`

**Stack:** C#, ASP.NET Core, EF Core, PostgreSQL com timezone, MassTransit, Hangfire, React Native (Expo), Lottie, MMKV, PostHog

---

### 4.8 — Sistema de Missões/Quests Periódicas

**Resumo executivo:**
Construí sistema de missões com periodicidade variável (única, diária, semanal, mensal), expiração automática via background job, integração com sistema de XP/níveis e dashboard admin para cancelamento em lote.

**Problema:**
Engajamento diário precisa de objetivos curtos com recompensas. Missões "diárias" precisam expirar à meia-noite, "semanais" no domingo, "mensais" no último dia do mês — independentemente de quando foram iniciadas.

**Solução técnica:**
- **Schema:**
  - `missao_grupos`: agrupa missões relacionadas
  - `missoes`: catálogo (titulo, requisito, requisito_meta, periodo, xp_recompensa, level_desbloqueia)
  - `missao_alunos`: progresso individual com status (`disponivel`/`em_progresso`/`concluida`/`coletada`/`expirada`)
  - `xp_ledger`: livro-razão de XP (source of truth — total nunca armazenado como campo acumulado)
- **Lógica de expiração** (heterogênea por tipo):
  - Única: nunca expira
  - Diária: 23:59:59 do dia atual (BRT)
  - Semanal: domingo 23:59:59 da semana corrente
  - Mensal: último dia do mês
- **Background job de expiração** a cada 8h: marca como `expirada` missões `em_progresso` com `ExpiresAt < now`
- **Coleta de recompensa:** `POST /api/missoes/{id}/coletar` registra no `xp_ledger`, recalcula nível, dispara level-up flow se aplicável
- **Dashboard admin (`/automatizacoes`):**
  - Lista missões com contadores por status (em progresso/expiradas/concluídas) + flag de expiração pendente
  - Cancelamento individual (`POST .../missions/{id}/cancel`) — expira em cascata todos os `MissaoAluno` não-terminais daquela missão
  - Cancelamento em lote (`POST .../missions/cancel`) — todas as missões do sistema
  - Query única com COUNT/ANY como subqueries (evita N+1), ordenação em memória
  - `ExecuteUpdateAsync` com `DeletedAt == null` explícito para batch updates eficientes
- **Atribuição automática:** ao subir de nível, consumer atribui missões com `LevelDesbloqueia = novoNivel`

**Stack:** C#, ASP.NET Core, EF Core, PostgreSQL, BackgroundService, RabbitMQ/MassTransit, React (dashboard admin)

---

### 4.9 — Multi-Tenancy com Row Level Security e Schema Versionado

**Resumo executivo:**
Modelei e mantenho banco PostgreSQL multi-tenant no Supabase com Row Level Security em 9+ tabelas críticas, 57 migrations versionadas via Sqitch e 23+ tabelas relacionais com índices compostos, soft deletes, JSONB e triggers automáticos.

**Problema:**
Plataforma educacional pode ser white-labeled para diferentes organizações (escolas, cursinhos). Cada organização tem seus alunos, agentes de IA personalizados, skins padrão. Dados não podem vazar entre organizações, mas o backend precisa ser único.

**Solução técnica:**
- **Tabelas com RLS ativo:** `alunos`, `alunos_agentes`, `user_streaks`, `streaks`, `arquivos_chamada`, `payments`, `transcriptions`, `imagens`, `agentes` (read-only autenticados)
- **Padrão de RLS:**
  ```sql
  EXISTS (
    SELECT 1 FROM alunos
    WHERE alunos.id = [tabela].aluno_id
    AND alunos.auth_id = auth.uid()::text
  )
  ```
- **Multi-tenancy explícito:** `organizations`, `alunos_organizations` (com role student/admin), `agentes_organizations`
- **Soft deletes:** `alunos`, `resumao`, `missao_alunos`, `xp_ledger` usam `deleted_at` (todas as queries filtram automaticamente via global query filter do EF Core)
- **JSONB para flexibilidade:** `transcriptions.transcription` (turnos), `quizzes.perguntas`, `imagens.tags`, `resumao.data`
- **Triggers:** `create_user_streak_on_aluno_insert` cria streak ao registrar usuário; `update_quizzes_updated_at` atualiza timestamp automaticamente
- **Índices compostos críticos:**
  - `idx_ranking_leaderboard` em `(ranking_group_id, current_score)` para leaderboard ordenado
  - `idx_ranking_aluno_group` UNIQUE em `(aluno_id, ranking_group_id)` para evitar duplicatas
  - `idx_streaks_aluno_id_type_date` em `(aluno_id, type, date DESC)`
- **Sqitch:** 57 migrations versionadas com deploy/revert/verify, rodando via Docker, integração com CI/CD

**Stack:** PostgreSQL, Supabase (Auth + Storage + Realtime), Sqitch (Docker), EF Core (com query filters globais)

---

### 4.10 — Dashboard Administrativo Completo (React)

**Resumo executivo:**
Desenvolvi dashboard admin em React para gestão completa do produto: notificações (envio one-off/bulk/broadcast, agendamento, templates), automatizações (cancelamento em lote, finalização de períodos), arenas/tiers, ranking, usuários e XP ledger.

**Páginas implementadas:**

**Notificações (`/notificacoes`):**
- Tab **Enviar:** teste rápido (1 clique), envio customizado (single/bulk/broadcast com dialog de confirmação), 14 templates prontos clicáveis (7 dias da semana × 2 variantes — Lembretes Diários / Streak & Engagement)
- Tab **Agendar:** com template (placeholders dinâmicos via `extractPlaceholders`) ou customizado, data entries via hook reutilizável `useDataEntries`
- Tab **Agendadas:** lista com filtros por aluno ID e status, cancelamento de pendentes, card expandido mostra `retryCount`, `errorMessage` e `data` JSON
- Tab **Templates:** visualização separada "manuais" vs "lembretes diários (automático)" com badge

**Automatizações (`/automatizacoes`):**
- Card **Períodos de Ranking:** lista com badges (Ativo/Aguardando/Finalizado), botão Finalizar para elegíveis
- Card **Cancelamento de Missões:** lista com contadores por status e flag de expiração pendente, botão Cancelar individual + Cancelar Todas

**Outras páginas:** Arenas/Tiers (CRUD com upload de imagem e reorder), Ranking (períodos, grupos, membros), Usuários, XP Ledger

**Stack:** React, TypeScript, TanStack Query, Tailwind CSS, lucide-react (icons)

---

### 4.11 — Servidor Hangfire em VPS Próprio (Infraestrutura)

**Resumo executivo:**
Provisionei e mantenho servidor Hangfire dedicado para jobs em VPS próprio, com Docker, Caddy (HTTPS automático via Let's Encrypt), Ansible para automação de deploy, Infisical para secrets em runtime e separação em 3 projetos .NET.

**Setup:**
- **Servidor:** VPS Linux (Ubuntu) em 187.127.2.241
- **Stack do servidor:** Docker Engine, Caddy, UFW Firewall (apenas SSH/HTTP/HTTPS abertos), systemd services
- **Imagem Docker:** `mauro613n/woolly-hangfire` com multi-stage build (net8.0), publicada no Docker Hub
- **Caddy:** reverse proxy + HTTPS automático + basic auth (bcrypt) para o dashboard `/hangfire`
- **Secrets via Infisical SDK:** `.env` contém apenas credenciais do Infisical (UniversalAuth: ClientId + ClientSecret); todos os outros secrets (connection strings, API keys da Supabase, OpenAI, Stripe) são carregados em runtime via SDK. Conversão automática de `__` para `:` (ex: `Database__ConnectionString` → `Database:ConnectionString`)
- **Ansible:** playbook completo com roles para `hangfire-firewall`, `hangfire-backend`, `hangfire-caddy` e `infisical`. Vault encriptado para secrets de bootstrap
- **Connection pool tuning:** `MaxPoolSize=20`, `MinPoolSize=2` no Hangfire para não competir com backend principal pelo Supavisor do Supabase (pool_size compartilhado de 30)
- **Filas com prioridade:** `critical` → `notifications` → `default`, com 10 workers configurados
- **CI/CD:** GitHub Actions workflow para build manual da imagem Docker

**Separação de projetos:**
- `WoollyHangfire` (ASP.NET Core Web App): jobs, dashboard, services de envio
- `Notificacoes` (Class Library): models, templates, services reutilizáveis (compartilhada entre Hangfire e WoollyBackend)
- `WoollyBackend` (ASP.NET Core API): apenas escreve em `scheduled_notifications` — não processa jobs

**Stack:** Linux, Docker, Caddy, Ansible (vault, playbooks, roles, templates Jinja2), Infisical, systemd, UFW, Let's Encrypt, GitHub Actions, .NET 8

---

## 5. Métricas de Impacto Mensuráveis

| Feature | Métrica | Antes | Depois | Ganho |
|---------|---------|-------|--------|-------|
| Geração de quiz (5 perguntas) | Latência total | 22s | 7-8s | -70% |
| Geração de quiz (10 perguntas) | Latência total | 40s | 8-10s | -75% |
| Envio de push notifications | Throughput | 1 batch/vez | 3 batches paralelos | 3x |
| Polling de quiz | Requests por geração | ~11 | ~4-5 | -60% |
| Portal Prefeitura (Sigesis) | Performance Lighthouse | base | +30% | +30% |
| Backfill de medalhas | Queries por entrada | ~3 (N+1) | 4 totais + 1 SaveChanges | drástica |
| Cobertura de testes Push Notifications | Total | 0 | 99 testes automatizados | — |

---

## 6. Outras Experiências

### Sigesis — Desenvolvedor Júnior (Mai 2025 — Jan 2026)

Liderei o front-end do Portal da Prefeitura usando Next.js (SSR, Dynamic Routing, Revalidation), atingindo +30% de performance no Lighthouse. Desenvolvi design system com componentes reutilizáveis seguindo WCAG. Integrei APIs REST e otimizei SEO técnico.

**Stack:** Next.js, React, TypeScript, Node.js, PHP, HTML, CSS

### MT Soluções — Estagiário em Desenvolvimento Full Stack (Out 2023 — Jan 2025)

Implementei fluxo completo de e-commerce (carrinho, checkout, autenticação JWT) com integração a APIs de pagamento. Desenvolvi APIs RESTful com Node.js/Express e modelagem PostgreSQL. Apliquei Clean Code e arquitetura escalável.

**Stack:** React, React Native, Node.js, Express, TypeScript, PostgreSQL, JWT

---

## 7. Certificações

- **Docker and Kubernetes: The Complete Guide** — Udemy (2024)
- **The Complete React Native + Hooks Course** — Udemy (2024)
- **Node.js, Express, MongoDB & More: The Complete Bootcamp** — Udemy (2023)

---

## 8. Como Usar Este Arquivo com Claude

Este arquivo serve como **fonte canônica** para qualquer atualização do site. Ao adicionar uma nova feature/projeto/experiência:

1. Adicione uma nova seção em **§4 — Features Principais** seguindo o padrão (Resumo executivo → Problema → Solução técnica → Stack → Métricas)
2. Atualize **§5 — Métricas** se houver número novo
3. Atualize **§2 — Stack Técnica** se introduziu nova ferramenta/biblioteca
4. Quando pedir ao Claude para atualizar o site, referencie a seção específica:
   - "Adicione a feature da §4.X ao componente Projects do site"
   - "Atualize a Hero section com o posicionamento atualizado da §1"
   - "Crie um card de blog post baseado na feature §4.5"

**Versionamento:** Última atualização — Abril 2026.
