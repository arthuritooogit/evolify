import type { Skill } from '@/types'

export const SKILLS: Skill[] = [
  {
    id: 'sk1', name: 'CLAUDE.md Développeur Web', slug: 'claude-md-developpeur-web',
    desc_short: 'Instructions système Claude Code optimisées pour le développement web moderne.',
    desc_long: 'Fichier CLAUDE.md complet qui configure Claude Code en développeur web senior : conventions de code, stack préférée, règles ESLint, tests automatiques et workflow git.',
    skill_type: 'skill',
    content: `# Claude Code — Développeur Web Senior

## Stack par défaut
- Frontend: Next.js 15 + TypeScript strict + Tailwind CSS
- Backend: Supabase / Prisma
- Tests: Vitest + Testing Library

## Conventions
- Composants en PascalCase, fonctions en camelCase
- Props toujours typées avec interface
- Pas de any, prefer unknown
- Commenter uniquement le "pourquoi", jamais le "quoi"

## Workflow
1. Lire avant de modifier
2. Tests avant deploy
3. Commits atomiques en anglais`,
    action_type: 'copy',
    compatible_with: ['Claude Code', 'Cursor'],
    category: 'Développement',
    use_cases: ['Développement web', 'Next.js', 'TypeScript'],
    jobs: ['Développeur', 'Fullstack'],
    requires_api: false, is_mcp: false,
    source_url: 'https://docs.anthropic.com/claude-code',
    tags: ['Claude Code', 'CLAUDE.md', 'Développement', 'Next.js', 'Configuration'],
    score_global: 9.4,
    usecase_scores: { 'Développement web': 9.5, 'Next.js': 9.4 },
    featured: true, verified: true,
    created_at: '2024-01-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk2', name: 'MCP Supabase', slug: 'mcp-supabase',
    desc_short: 'Connecte Claude directement à votre base Supabase pour requêtes et migrations.',
    desc_long: 'Model Context Protocol qui permet à Claude Code de lire le schéma, exécuter des requêtes SQL, créer des migrations et gérer vos tables Supabase directement depuis le chat.',
    skill_type: 'mcp',
    repo_url: 'https://github.com/supabase/mcp-server-supabase',
    action_type: 'install',
    compatible_with: ['Claude Code', 'Cursor', 'Windsurf'],
    category: 'Base de données',
    use_cases: ['Supabase', 'SQL', 'Migration', 'Développement'],
    jobs: ['Développeur', 'Data Engineer'],
    requires_api: true, is_mcp: true,
    source_url: 'https://github.com/supabase/mcp-server-supabase',
    stars: 1200,
    tags: ['MCP', 'Supabase', 'SQL', 'Database', 'Claude Code'],
    score_global: 9.2,
    usecase_scores: { Supabase: 9.5, SQL: 9.2, Migration: 9.0 },
    featured: true, verified: true,
    created_at: '2024-01-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk3', name: 'Custom GPT : Expert Marketing Digital', slug: 'custom-gpt-expert-marketing',
    desc_short: 'Instructions système pour transformer ChatGPT en expert marketing senior.',
    desc_long: 'System prompt complet pour un Custom GPT marketing : frameworks AIDA/PAS/SPIN, connaissance des canaux 2025, templates pour chaque format, analyse concurrentielle.',
    skill_type: 'template',
    content: `Tu es un expert en marketing digital avec 15 ans d'expérience en France et à l'international.

Ton expertise couvre :
- Growth hacking et acquisition payante (Meta Ads, Google Ads, TikTok Ads)
- SEO/SEA et content marketing
- Email marketing (taux ouverture >30%)
- Social media et personal branding
- Copywriting persuasif (AIDA, PAS, StoryBrand)
- Analytics et attribution multi-touch

Tu parles toujours en français, avec un ton professionnel mais accessible.
Tu donnes des exemples concrets et actionnables.
Tu mentionnes toujours les métriques à suivre.
Tu proposes systématiquement 3 alternatives quand tu recommandes quelque chose.`,
    action_type: 'copy',
    compatible_with: ['ChatGPT', 'Claude', 'Gemini'],
    category: 'Marketing',
    use_cases: ['Marketing digital', 'Stratégie', 'Copywriting'],
    jobs: ['Marketeur', 'Entrepreneur', 'Freelance'],
    requires_api: false, is_mcp: false,
    source_url: 'https://openai.com/chatgpt',
    tags: ['Custom GPT', 'Marketing', 'System Prompt', 'ChatGPT', 'Expert'],
    score_global: 8.8,
    usecase_scores: { 'Marketing digital': 9.2, Stratégie: 8.8 },
    featured: false, verified: true,
    created_at: '2024-01-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk4', name: 'MCP Firecrawl', slug: 'mcp-firecrawl',
    desc_short: 'Scraping web avancé directement depuis Claude avec Firecrawl.',
    desc_long: 'MCP qui connecte Claude à Firecrawl pour scraper n\'importe quel site web, extraire du contenu structuré, crawler des domaines entiers et monitorer des pages.',
    skill_type: 'mcp',
    repo_url: 'https://github.com/mendableai/firecrawl-mcp-server',
    action_type: 'install',
    compatible_with: ['Claude Code', 'Cursor'],
    category: 'Scraping',
    use_cases: ['Scraping', 'Veille', 'Extraction de données'],
    jobs: ['Développeur', 'Data Analyst', 'Growth Hacker'],
    requires_api: true, is_mcp: true,
    source_url: 'https://github.com/mendableai/firecrawl-mcp-server',
    stars: 890,
    tags: ['MCP', 'Scraping', 'Firecrawl', 'Web', 'Data'],
    score_global: 9.0,
    usecase_scores: { Scraping: 9.4, Veille: 9.0 },
    featured: false, verified: true,
    created_at: '2024-01-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk5', name: 'Extension Cursor : AI Pair Programmer', slug: 'cursor-ai-pair-programmer',
    desc_short: 'Configuration Cursor ultra-optimisée pour le pair programming IA.',
    desc_long: 'Fichier .cursorrules complet qui transforme Cursor en pair programmer senior : review automatique, suggestions proactives, gestion des erreurs et refactoring intelligent.',
    skill_type: 'template',
    content: `You are an expert software engineer acting as a pair programmer.

Rules:
- Always explain your reasoning before writing code
- Write clean, testable code following SOLID principles
- Flag potential security issues immediately
- Suggest performance optimizations
- Ask for clarification on ambiguous requirements
- Reference relevant docs when suggesting libraries

When reviewing code:
- Check for edge cases
- Identify potential bugs
- Suggest better patterns
- Never break existing tests`,
    action_type: 'copy',
    compatible_with: ['Cursor', 'Windsurf'],
    category: 'Développement',
    use_cases: ['Code review', 'Pair programming', 'Refactoring'],
    jobs: ['Développeur', 'Tech Lead'],
    language: 'en',
    requires_api: false, is_mcp: false,
    source_url: 'https://cursor.com',
    tags: ['Cursor', 'Rules', 'Développement', 'Code', 'Pair Programming'],
    score_global: 9.1,
    usecase_scores: { 'Code review': 9.3, 'Pair programming': 9.2 },
    featured: true, verified: true,
    created_at: '2024-01-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk6', name: 'MCP GitHub', slug: 'mcp-github',
    desc_short: 'Gère vos repos GitHub directement depuis Claude : PRs, issues, code.',
    desc_long: 'Model Context Protocol GitHub officiel — liste les repos, lit le code, crée des issues, commente des PRs et gère les branches sans quitter votre interface IA.',
    skill_type: 'mcp',
    repo_url: 'https://github.com/github/github-mcp-server',
    action_type: 'install',
    compatible_with: ['Claude Code', 'Cursor', 'Windsurf'],
    category: 'Développement',
    use_cases: ['GitHub', 'Code review', 'Issues', 'PRs'],
    jobs: ['Développeur', 'Tech Lead'],
    requires_api: true, is_mcp: true,
    source_url: 'https://github.com/github/github-mcp-server',
    stars: 3200,
    tags: ['MCP', 'GitHub', 'Git', 'Développement', 'Claude Code'],
    score_global: 9.3,
    usecase_scores: { GitHub: 9.5, 'Code review': 9.2 },
    featured: true, verified: true,
    created_at: '2024-06-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk7', name: 'CLAUDE.md Data Scientist', slug: 'claude-md-data-scientist',
    desc_short: 'Configuration Claude Code pour l\'analyse de données, ML et visualisation.',
    desc_long: 'Fichier CLAUDE.md orienté Data Science : Python/Pandas/Polars, notebooks Jupyter, bonnes pratiques ML, visualisation avec Plotly et déploiement de modèles.',
    skill_type: 'skill',
    content: `# Claude Code — Data Scientist Senior

## Stack par défaut
- Python 3.12 + uv (package manager)
- Data: Pandas, Polars, NumPy
- ML: scikit-learn, XGBoost, PyTorch
- Viz: Plotly, Matplotlib, Seaborn
- Notebooks: Jupyter, Marimo

## Conventions
- Docstrings NumPy style
- Type hints partout
- Tests avec pytest
- Reproductibilité : random_state=42 always

## Data workflow
1. Exploration → profiling (ydata-profiling)
2. Nettoyage → validation (Great Expectations)
3. Features → pipeline sklearn
4. Évaluation → MLflow tracking
5. Deploy → API FastAPI ou Streamlit app`,
    action_type: 'copy',
    compatible_with: ['Claude Code', 'Cursor'],
    category: 'Data Science',
    use_cases: ['Data Science', 'Machine Learning', 'Python', 'Analytics'],
    jobs: ['Data Scientist', 'Data Analyst', 'ML Engineer'],
    requires_api: false, is_mcp: false,
    source_url: 'https://docs.anthropic.com/claude-code',
    tags: ['Data Science', 'CLAUDE.md', 'Python', 'ML', 'Analytics'],
    score_global: 9.2,
    usecase_scores: { 'Data Science': 9.4, 'Machine Learning': 9.2 },
    featured: true, verified: true,
    created_at: '2024-06-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk8', name: 'MCP Playwright', slug: 'mcp-playwright',
    desc_short: 'Automatise le navigateur web avec Playwright directement depuis Claude.',
    desc_long: 'MCP Playwright permet à Claude de naviguer sur le web, remplir des formulaires, prendre des screenshots et scraper des sites avec JavaScript activé.',
    skill_type: 'mcp',
    repo_url: 'https://github.com/microsoft/playwright-mcp',
    action_type: 'install',
    compatible_with: ['Claude Code', 'Cursor'],
    category: 'Automatisation',
    use_cases: ['Scraping', 'Tests E2E', 'Automatisation web', 'Screenshot'],
    jobs: ['Développeur', 'QA', 'Growth Hacker'],
    requires_api: false, is_mcp: true,
    source_url: 'https://github.com/microsoft/playwright-mcp',
    stars: 2100,
    tags: ['MCP', 'Playwright', 'Browser', 'Automatisation', 'Tests'],
    score_global: 9.1,
    usecase_scores: { Scraping: 9.3, 'Tests E2E': 9.2 },
    featured: false, verified: true,
    created_at: '2024-06-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk9', name: 'Custom GPT : Coach Productivité', slug: 'custom-gpt-coach-productivite',
    desc_short: 'Assistant productivité personnalisé avec les meilleures méthodes 2025.',
    desc_long: 'System prompt pour un GPT coach en productivité : GTD, Time Blocking, Deep Work, Pomodoro, priorités Eisenhower, gestion des distractions et optimisation du flow.',
    skill_type: 'template',
    content: `Tu es un coach en productivité personnelle expert certifié en GTD et Deep Work.

Tu maîtrises parfaitement :
- Getting Things Done (GTD) de David Allen
- Deep Work et concentration intensive (Cal Newport)
- Time Blocking et Themed Days
- Méthode PARA (Projects, Areas, Resources, Archives)
- Gestion de l'énergie (pas seulement du temps)
- Techniques anti-procrastination

Ta philosophie :
- La productivité n'est pas sur-optimisation, c'est faire ce qui compte
- L'énergie > le temps
- Systèmes > volonté
- Repos = partie intégrante de la performance

Format de réponse :
1. Diagnostic de la situation
2. Principe applicable
3. Plan d'action concret (3 étapes max)
4. Métrique de succès`,
    action_type: 'copy',
    compatible_with: ['ChatGPT', 'Claude', 'Gemini'],
    category: 'Productivité',
    use_cases: ['Productivité', 'Organisation', 'GTD', 'Time management'],
    jobs: ['Tous profils'],
    requires_api: false, is_mcp: false,
    source_url: 'https://openai.com/chatgpt',
    tags: ['Productivité', 'GTD', 'Coaching', 'Time management', 'Organisation'],
    score_global: 8.7,
    usecase_scores: { Productivité: 9.0, Organisation: 8.8 },
    featured: false, verified: true,
    created_at: '2024-06-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk10', name: 'MCP Notion', slug: 'mcp-notion',
    desc_short: 'Lit et écrit dans Notion depuis Claude — pages, bases de données, blocs.',
    desc_long: 'MCP officiel Notion : crée des pages, met à jour des bases de données, recherche du contenu et gère votre workspace Notion directement depuis Claude ou Cursor.',
    skill_type: 'mcp',
    repo_url: 'https://github.com/makenotion/notion-mcp-server',
    action_type: 'install',
    compatible_with: ['Claude Code', 'Cursor', 'Claude Desktop'],
    category: 'Productivité',
    use_cases: ['Notion', 'Documentation', 'Base de données', 'Notes'],
    jobs: ['Tous profils', 'Développeur', 'Marketeur'],
    requires_api: true, is_mcp: true,
    source_url: 'https://github.com/makenotion/notion-mcp-server',
    stars: 1850,
    tags: ['MCP', 'Notion', 'Base de données', 'Documentation', 'Productivité'],
    score_global: 9.0,
    usecase_scores: { Notion: 9.4, Documentation: 9.1 },
    featured: true, verified: true,
    created_at: '2024-06-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk11', name: 'Windsurf Rules — Next.js Expert', slug: 'windsurf-rules-nextjs',
    desc_short: 'Règles Windsurf pour construire des apps Next.js 15 de qualité production.',
    desc_long: 'Fichier .windsurfrules optimisé pour Next.js 15 : App Router, Server Components, streaming, Tailwind v4, Supabase auth et patterns de performance avancés.',
    skill_type: 'template',
    content: `# Windsurf Rules — Next.js 15 Expert

You are an expert Next.js 15 developer with deep knowledge of the App Router.

## Core principles
- Always use Server Components by default, Client Components only when necessary
- Prefer streaming with Suspense for better UX
- Use server actions for mutations, never client-side API calls to your own app
- Implement proper error boundaries and loading states

## Patterns
- Data fetching: async server components, cache() for deduplication
- Mutations: server actions with useFormState/useFormStatus
- Auth: middleware.ts with Supabase SSR
- Styling: Tailwind v4 with @theme directive
- State: Zustand for complex client state, URL params for shareable state

## File conventions
- page.tsx, layout.tsx, loading.tsx, error.tsx
- _components/ for co-located components
- Never use useEffect for data fetching`,
    action_type: 'copy',
    compatible_with: ['Windsurf'],
    category: 'Développement',
    use_cases: ['Next.js', 'Développement web', 'App Router'],
    jobs: ['Développeur', 'Fullstack'],
    language: 'en',
    requires_api: false, is_mcp: false,
    source_url: 'https://windsurf.com',
    tags: ['Windsurf', 'Rules', 'Next.js', 'React', 'Développement'],
    score_global: 9.0,
    usecase_scores: { 'Next.js': 9.3, 'Développement web': 9.1 },
    featured: false, verified: true,
    created_at: '2024-06-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk12', name: 'MCP Brave Search', slug: 'mcp-brave-search',
    desc_short: 'Recherche web en temps réel depuis Claude sans traceurs Google.',
    desc_long: 'MCP Brave Search : permet à Claude de faire des recherches web en temps réel, accéder aux actualités récentes et trouver des informations sans les biais Google.',
    skill_type: 'mcp',
    repo_url: 'https://github.com/modelcontextprotocol/servers',
    action_type: 'install',
    compatible_with: ['Claude Code', 'Claude Desktop', 'Cursor'],
    category: 'Recherche',
    use_cases: ['Recherche web', 'Actualités', 'Veille', 'Fact-checking'],
    jobs: ['Tous profils', 'Journaliste', 'Researcher'],
    requires_api: true, is_mcp: true,
    source_url: 'https://brave.com/search/api/',
    stars: 780,
    tags: ['MCP', 'Recherche', 'Web', 'Brave', 'Temps réel'],
    score_global: 8.9,
    usecase_scores: { 'Recherche web': 9.2, Actualités: 9.0 },
    featured: false, verified: true,
    created_at: '2024-06-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk13', name: 'Plugin ChatGPT — Advanced Data Analysis', slug: 'plugin-chatgpt-advanced-data',
    desc_short: 'Configuration optimale de l\'outil d\'analyse de données de ChatGPT.',
    desc_long: 'Guide et prompts pour tirer le maximum de l\'Advanced Data Analysis de ChatGPT : uploads CSV, génération de graphiques, analyse statistique et création de dashboards.',
    skill_type: 'template',
    content: `# Prompts pour Advanced Data Analysis ChatGPT

## Upload et analyse initiale
"Analyse ce fichier CSV et fournis : 1) Résumé des données (lignes, colonnes, types), 2) Valeurs manquantes et outliers, 3) Distributions des variables clés, 4) Corrélations intéressantes, 5) 3 insights business actionnables"

## Visualisation
"Crée un dashboard avec : un graphique de tendance temporelle, un top 10 par [MÉTRIQUE], une heatmap de corrélation, et un camembert des catégories. Utilise une palette de couleurs professionnelle."

## Prédiction simple
"Sur la base de ces données historiques, entraîne un modèle de régression pour prédire [VARIABLE CIBLE]. Affiche les métriques de performance et les features les plus importantes."

## Rapport automatique
"Génère un rapport PDF avec : executive summary, méthodologie, visualisations et recommandations. Format Consulting (BCG/McKinsey style)."`,
    action_type: 'copy',
    compatible_with: ['ChatGPT'],
    category: 'Analytics',
    use_cases: ['Data analysis', 'Visualisation', 'Reporting'],
    jobs: ['Data Analyst', 'Marketeur', 'Manager'],
    requires_api: false, is_mcp: false,
    source_url: 'https://openai.com/chatgpt',
    tags: ['ChatGPT', 'Data', 'Analyse', 'Visualisation', 'CSV'],
    score_global: 8.6,
    usecase_scores: { 'Data analysis': 8.9, Visualisation: 8.7 },
    featured: false, verified: true,
    created_at: '2024-06-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk14', name: 'MCP Slack', slug: 'mcp-slack',
    desc_short: 'Lit et envoie des messages Slack depuis Claude pour une automatisation totale.',
    desc_long: 'MCP Slack permet à Claude de lire les canaux, envoyer des messages, créer des threads et gérer les workflows Slack directement, idéal pour les agents IA.',
    skill_type: 'mcp',
    repo_url: 'https://github.com/modelcontextprotocol/servers',
    action_type: 'install',
    compatible_with: ['Claude Code', 'Claude Desktop'],
    category: 'Communication',
    use_cases: ['Slack', 'Notifications', 'Agent IA', 'Automatisation'],
    jobs: ['Développeur', 'Manager', 'Ops'],
    requires_api: true, is_mcp: true,
    source_url: 'https://api.slack.com/',
    stars: 650,
    tags: ['MCP', 'Slack', 'Communication', 'Automatisation', 'Agent'],
    score_global: 8.8,
    usecase_scores: { Slack: 9.1, Notifications: 9.0 },
    featured: false, verified: true,
    created_at: '2024-06-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk15', name: 'CLAUDE.md Startup Founder', slug: 'claude-md-startup-founder',
    desc_short: 'Claude Code configuré pour un fondateur : code + business + strategy.',
    desc_long: 'CLAUDE.md qui donne à Claude le contexte d\'un fondateur de startup : stack technique, contexte business, personas utilisateurs et objectifs, pour un assistant vraiment pertinent.',
    skill_type: 'skill',
    content: `# Claude Code — Mode Fondateur Startup

## Mon contexte
- Startup : [NOM] — [SECTEUR]
- Stade : [PRE-SEED/SEED]
- Stack : [TECH STACK]
- ICP (client idéal) : [DESCRIPTION]

## Principes de travail
- Speed > Perfection (MVP mindset)
- Valider avant de construire
- Une seule chose à la fois
- Data-driven, pas HiPPO-driven

## Priorités actuelles
1. [PRIORITÉ 1]
2. [PRIORITÉ 2]
3. [PRIORITÉ 3]

## Ce que tu fais avec moi
- Tu poses des questions avant de coder
- Tu identifies les risques business, pas que technique
- Tu proposes le minimum viable qui teste l'hypothèse
- Tu alerte si je sur-ingénierie
- Tu connais mon contexte métier

## Contraintes
- Budget : [BUDGET]
- Timeline : [DEADLINE]
- Équipe : [TAILLE ÉQUIPE]`,
    action_type: 'copy',
    compatible_with: ['Claude Code'],
    category: 'Startup',
    use_cases: ['Startup', 'Fondateur', 'MVP', 'Développement'],
    jobs: ['Fondateur', 'CTO', 'Entrepreneur'],
    requires_api: false, is_mcp: false,
    source_url: 'https://docs.anthropic.com/claude-code',
    tags: ['CLAUDE.md', 'Startup', 'Fondateur', 'MVP', 'Entrepreneur'],
    score_global: 9.1,
    usecase_scores: { Startup: 9.4, MVP: 9.2 },
    featured: true, verified: true,
    created_at: '2024-06-01', updated_at: '2025-01-01',
  },
]
