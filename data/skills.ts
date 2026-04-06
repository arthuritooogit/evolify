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
  {
    id: 'sk16', name: 'MCP Figma', slug: 'mcp-figma',
    desc_short: 'Accède aux designs Figma depuis Claude : composants, styles et variables.',
    desc_long: 'MCP Figma connecte Claude à vos fichiers Figma pour lire les composants, extraire les tokens de design, générer du code à partir des frames et synchroniser les design systems avec le code.',
    skill_type: 'mcp',
    repo_url: 'https://github.com/GLips/Figma-Context-MCP',
    action_type: 'install',
    compatible_with: ['Claude Code', 'Cursor', 'Windsurf'],
    category: 'Design',
    use_cases: ['Design to code', 'Figma', 'Design system', 'UI'],
    jobs: ['Développeur', 'Designer', 'Fullstack'],
    requires_api: true, is_mcp: true,
    source_url: 'https://github.com/GLips/Figma-Context-MCP',
    stars: 2400,
    tags: ['MCP', 'Figma', 'Design', 'UI', 'Design system'],
    score_global: 9.2,
    usecase_scores: { 'Design to code': 9.5, Figma: 9.3, 'Design system': 9.0 },
    featured: true, verified: true,
    created_at: '2024-09-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk17', name: 'MCP Linear', slug: 'mcp-linear',
    desc_short: 'Gère vos issues Linear et sprints directement depuis Claude.',
    desc_long: 'MCP Linear permet à Claude de créer des issues, mettre à jour les statuts, assigner des tâches, gérer les cycles et sprints, et lire le backlog Linear sans quitter votre éditeur.',
    skill_type: 'mcp',
    repo_url: 'https://github.com/linear/linear-mcp',
    action_type: 'install',
    compatible_with: ['Claude Code', 'Cursor', 'Claude Desktop'],
    category: 'Gestion de projet',
    use_cases: ['Linear', 'Issues', 'Sprint', 'Gestion de projet'],
    jobs: ['Développeur', 'Tech Lead', 'Product Manager'],
    requires_api: true, is_mcp: true,
    source_url: 'https://linear.app/docs/mcp',
    stars: 980,
    tags: ['MCP', 'Linear', 'Issues', 'Sprint', 'Agile'],
    score_global: 8.9,
    usecase_scores: { Linear: 9.3, 'Gestion de projet': 9.0, Sprint: 8.8 },
    featured: false, verified: true,
    created_at: '2024-09-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk18', name: 'MCP Google Drive', slug: 'mcp-google-drive',
    desc_short: 'Lit et écrit dans Google Drive depuis Claude : Docs, Sheets, Slides.',
    desc_long: 'MCP Google Drive connecte Claude à votre espace Drive pour lire des documents, extraire des données de Sheets, créer des fichiers et organiser votre stockage cloud directement depuis le chat.',
    skill_type: 'mcp',
    repo_url: 'https://github.com/modelcontextprotocol/servers',
    action_type: 'install',
    compatible_with: ['Claude Code', 'Claude Desktop', 'Cursor'],
    category: 'Productivité',
    use_cases: ['Google Drive', 'Google Docs', 'Google Sheets', 'Cloud'],
    jobs: ['Tous profils', 'Manager', 'Marketeur'],
    requires_api: true, is_mcp: true,
    source_url: 'https://developers.google.com/drive',
    stars: 720,
    tags: ['MCP', 'Google Drive', 'Google Docs', 'Sheets', 'Cloud'],
    score_global: 8.8,
    usecase_scores: { 'Google Drive': 9.2, 'Google Sheets': 9.0, 'Google Docs': 8.9 },
    featured: false, verified: true,
    created_at: '2024-09-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk19', name: 'MCP Stripe', slug: 'mcp-stripe',
    desc_short: 'Gère paiements, abonnements et clients Stripe depuis Claude.',
    desc_long: 'MCP Stripe officiel : accède aux données clients, crée des produits et prix, gère les abonnements, consulte les transactions et diagnostique les erreurs de paiement directement depuis votre IA.',
    skill_type: 'mcp',
    repo_url: 'https://github.com/stripe/agent-toolkit',
    action_type: 'install',
    compatible_with: ['Claude Code', 'Cursor'],
    category: 'Paiements',
    use_cases: ['Stripe', 'Paiements', 'Abonnements', 'E-commerce'],
    jobs: ['Développeur', 'Fondateur', 'Entrepreneur'],
    requires_api: true, is_mcp: true,
    source_url: 'https://stripe.com/docs/agents',
    stars: 1560,
    tags: ['MCP', 'Stripe', 'Paiements', 'SaaS', 'E-commerce'],
    score_global: 9.1,
    usecase_scores: { Stripe: 9.4, Paiements: 9.2, Abonnements: 9.0 },
    featured: true, verified: true,
    created_at: '2024-09-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk20', name: 'CLAUDE.md Expert Commercial', slug: 'claude-md-expert-commercial',
    desc_short: 'Claude Code configuré en expert sales : prospection, closing et CRM.',
    desc_long: 'Fichier CLAUDE.md orienté vente B2B : méthodologies MEDDIC/SPIN/Challenger Sale, scripts de prospection, gestion pipeline CRM, objections courantes et techniques de closing.',
    skill_type: 'skill',
    content: `# Claude Code — Expert Commercial B2B

## Mon profil
- Secteur : [SECTEUR]
- Cycle de vente : [DURÉE CYCLE]
- Panier moyen : [MONTANT]
- CRM : [HubSpot / Salesforce / Pipedrive]

## Méthodologies maîtrisées
- MEDDIC (Metrics, Economic Buyer, Decision Criteria...)
- SPIN Selling (Situation, Problem, Implication, Need-Payoff)
- Challenger Sale (Teach, Tailor, Take Control)
- Social Selling LinkedIn

## Ce que tu fais avec moi
- Tu rédiges des emails de prospection personnalisés
- Tu prépares les objections et réponses
- Tu analyses les deals bloqués et proposes des actions
- Tu génères des scripts d'appels adaptés au persona
- Tu rédiges des proposals et decks commerciaux

## KPIs à optimiser
- Taux de réponse cold email > 5%
- Taux de transformation démo → deal > 20%
- Durée cycle de vente < [OBJECTIF]

## Tonalité
- Professionnel, direct, orienté valeur client
- Jamais de jargon inutile
- Chiffres et preuves sociales toujours`,
    action_type: 'copy',
    compatible_with: ['Claude Code', 'Claude Desktop'],
    category: 'Vente',
    use_cases: ['Sales', 'Prospection', 'CRM', 'Closing'],
    jobs: ['Commercial', 'Business Developer', 'Fondateur'],
    requires_api: false, is_mcp: false,
    source_url: 'https://docs.anthropic.com/claude-code',
    tags: ['CLAUDE.md', 'Sales', 'Commercial', 'Prospection', 'CRM'],
    score_global: 8.9,
    usecase_scores: { Sales: 9.2, Prospection: 9.0, CRM: 8.8 },
    featured: false, verified: true,
    created_at: '2024-09-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk21', name: 'CLAUDE.md Content Creator', slug: 'claude-md-content-creator',
    desc_short: 'Claude configuré pour créer du contenu viral : posts, scripts, newsletters.',
    desc_long: 'Fichier CLAUDE.md pour créateur de contenu : calendrier éditorial, formats par plateforme (LinkedIn, X, YouTube, TikTok), tonalité de marque, hooks viraux et stratégie d\'engagement.',
    skill_type: 'skill',
    content: `# Claude Code — Content Creator Expert

## Ma marque personnelle
- Nom : [PRÉNOM NOM]
- Niche : [SUJET PRINCIPAL]
- Audience cible : [PERSONA]
- Ton : [PROFESSIONNEL / INSPIRANT / ÉDUCATIF / HUMORISTIQUE]

## Plateformes actives
- LinkedIn : [OUI/NON] — objectif [ABONNÉS]
- X/Twitter : [OUI/NON] — objectif [FOLLOWERS]
- YouTube : [OUI/NON] — objectif [ABONNÉS]
- Newsletter : [OUI/NON] — objectif [LECTEURS]

## Formules de contenu qui fonctionnent
- Hook : Chiffre surprenant / Question provocante / Contre-intuition
- Corps : Story → Leçon → Actionnable
- CTA : Une seule action claire

## Règles éditoriales
- Jamais de bullet points sur LinkedIn (ou avec parcimonie)
- Phrases courtes, aération visuelle
- Personal story > conseil générique
- Données et sources toujours citées
- Toujours finir par une question pour l'engagement

## Formats récurrents
- Lundi : [FORMAT 1]
- Mercredi : [FORMAT 2]
- Vendredi : [FORMAT 3]`,
    action_type: 'copy',
    compatible_with: ['Claude Code', 'Claude Desktop'],
    category: 'Création de contenu',
    use_cases: ['Content creation', 'LinkedIn', 'Newsletter', 'Social media'],
    jobs: ['Créateur de contenu', 'Marketeur', 'Entrepreneur'],
    requires_api: false, is_mcp: false,
    source_url: 'https://docs.anthropic.com/claude-code',
    tags: ['CLAUDE.md', 'Content', 'LinkedIn', 'Newsletter', 'Social Media'],
    score_global: 9.0,
    usecase_scores: { 'Content creation': 9.3, LinkedIn: 9.1, Newsletter: 9.0 },
    featured: true, verified: true,
    created_at: '2024-09-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk22', name: 'CLAUDE.md Data Analyst', slug: 'claude-md-data-analyst',
    desc_short: 'Configuration Claude pour l\'analyse business : SQL, dashboards et insights.',
    desc_long: 'Fichier CLAUDE.md orienté Data Analyst business : SQL avancé, Power BI / Tableau / Metabase, storytelling data, KPIs métier et recommandations actionnables pour les décideurs.',
    skill_type: 'skill',
    content: `# Claude Code — Data Analyst Business

## Stack analytique
- SQL : PostgreSQL / BigQuery / Snowflake
- BI : [Power BI / Tableau / Metabase / Looker]
- Python : Pandas, Plotly, Streamlit
- Sheets : Google Sheets + formules avancées

## Contexte business
- Secteur : [SECTEUR]
- Métriques clés : [KPI 1], [KPI 2], [KPI 3]
- Sources de données : [CRM, Analytics, ERP...]
- Audience des rapports : [DIRECTION / ÉQUIPE / CLIENT]

## Standards de qualité
- Toujours valider les données avant d'analyser
- Documenter les hypothèses et limites
- Visualisations : simplicité > complexité
- Recommandation = insight + action + impact attendu

## Format des livrables
- Executive summary : 3 bullets max
- Graphiques : titre = la conclusion, pas la description
- Annexes pour le détail méthodologique
- Toujours proposer le "so what ?" pour chaque finding

## Ce que tu fais avec moi
- Tu écris du SQL optimisé
- Tu identifies les biais dans les données
- Tu transformes les chiffres en narration business
- Tu proposes des métriques alternatives si pertinent`,
    action_type: 'copy',
    compatible_with: ['Claude Code', 'Cursor'],
    category: 'Analytics',
    use_cases: ['Data analysis', 'SQL', 'BI', 'Reporting'],
    jobs: ['Data Analyst', 'Business Analyst', 'Manager'],
    requires_api: false, is_mcp: false,
    source_url: 'https://docs.anthropic.com/claude-code',
    tags: ['CLAUDE.md', 'Data', 'SQL', 'BI', 'Analytics'],
    score_global: 9.1,
    usecase_scores: { 'Data analysis': 9.3, SQL: 9.2, Reporting: 9.0 },
    featured: false, verified: true,
    created_at: '2024-09-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk23', name: 'CLAUDE.md DevOps Engineer', slug: 'claude-md-devops-engineer',
    desc_short: 'Claude Code en mode DevOps : CI/CD, infra as code, monitoring et sécurité.',
    desc_long: 'Fichier CLAUDE.md pour ingénieurs DevOps/SRE : Docker, Kubernetes, Terraform, GitHub Actions, observabilité avec Grafana/Datadog, gestion des incidents et automatisation infra.',
    skill_type: 'skill',
    content: `# Claude Code — DevOps / SRE Engineer

## Stack infrastructure
- Containers : Docker + Kubernetes (EKS / GKE / AKS)
- IaC : Terraform + Terragrunt
- CI/CD : GitHub Actions / GitLab CI
- Cloud : [AWS / GCP / Azure]
- Monitoring : Grafana + Prometheus / Datadog
- Logs : Loki / ELK Stack

## Conventions
- Infrastructure as Code always (jamais de clic console en prod)
- Immutable infrastructure mindset
- Secrets via Vault ou secrets manager natif
- Naming: [env]-[service]-[resource] (ex: prod-api-db)

## Sécurité
- Least privilege principle partout
- Scan images Docker (Trivy)
- SAST dans la CI
- Rotation automatique des secrets

## Ce que tu fais avec moi
- Tu écris des Dockerfiles optimisés et sécurisés
- Tu génères des configs Kubernetes production-ready
- Tu crées des pipelines CI/CD complets
- Tu diagnostiques les incidents à partir des logs
- Tu proposes des optimisations de coût cloud

## SLOs par défaut
- Disponibilité : 99.9% (43min downtime/mois max)
- Latence p99 < 500ms
- MTTR < 30min`,
    action_type: 'copy',
    compatible_with: ['Claude Code', 'Cursor'],
    category: 'DevOps',
    use_cases: ['DevOps', 'Kubernetes', 'CI/CD', 'Infrastructure'],
    jobs: ['DevOps', 'SRE', 'Cloud Engineer'],
    requires_api: false, is_mcp: false,
    source_url: 'https://docs.anthropic.com/claude-code',
    tags: ['CLAUDE.md', 'DevOps', 'Kubernetes', 'Terraform', 'CI/CD'],
    score_global: 9.3,
    usecase_scores: { DevOps: 9.5, Kubernetes: 9.3, 'CI/CD': 9.2 },
    featured: true, verified: true,
    created_at: '2024-09-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk24', name: 'CLAUDE.md UX Designer', slug: 'claude-md-ux-designer',
    desc_short: 'Claude configuré en UX Designer : research, wireframes et design system.',
    desc_long: 'Fichier CLAUDE.md pour UX/Product Designer : user research, personas, user journeys, wireframing, accessibilité WCAG, design system et handoff développeur.',
    skill_type: 'skill',
    content: `# Claude Code — UX / Product Designer

## Mon contexte
- Produit : [NOM DU PRODUIT]
- Utilisateurs cibles : [PERSONAS PRINCIPAUX]
- Phase actuelle : [Discovery / Definition / Design / Test]
- Design tool : [Figma / Sketch / Adobe XD]

## Principes UX
- User-centered design always
- Double Diamond : Discover → Define → Develop → Deliver
- Jobs To Be Done > features
- Test tôt, test souvent (même avec 5 utilisateurs)
- Accessibilité WCAG 2.1 AA minimum

## Livrables courants
- User research : guides d'entretien, synthèses
- Personas + Jobs To Be Done
- User journeys et service blueprints
- Wireframes annotés (low → mid → high fidelity)
- Specs de design pour développeurs
- Rapports de tests utilisateurs

## Ce que tu fais avec moi
- Tu rédiges des guides d'entretien utilisateur
- Tu analyses les feedbacks et identifies les patterns
- Tu rédiges des user stories en format BDD
- Tu vérifies l'accessibilité des composants
- Tu rédiges la documentation du design system

## Standards
- Composants : Atomic Design (Atoms → Molecules → Organisms)
- Tokens : couleurs, typographie, espacements, ombres
- Handoff : toujours annoter l'intention UX`,
    action_type: 'copy',
    compatible_with: ['Claude Code', 'Claude Desktop'],
    category: 'Design',
    use_cases: ['UX Design', 'User research', 'Design system', 'Wireframing'],
    jobs: ['UX Designer', 'Product Designer', 'Product Manager'],
    requires_api: false, is_mcp: false,
    source_url: 'https://docs.anthropic.com/claude-code',
    tags: ['CLAUDE.md', 'UX', 'Design', 'User research', 'Figma'],
    score_global: 8.9,
    usecase_scores: { 'UX Design': 9.2, 'User research': 9.1, 'Design system': 8.9 },
    featured: false, verified: true,
    created_at: '2024-09-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk25', name: 'Custom GPT : Expert SEO', slug: 'custom-gpt-expert-seo',
    desc_short: 'GPT spécialisé SEO : audit, keywords, contenu optimisé et link building.',
    desc_long: 'System prompt pour un Custom GPT SEO expert : audit technique, recherche de mots-clés, optimisation on-page, stratégie de contenu, analyse de concurrents et suivi des positions.',
    skill_type: 'template',
    content: `Tu es un expert SEO avec 10 ans d'expérience, spécialisé en SEO technique, éditorial et local.

Tu maîtrises parfaitement :
- Audit SEO technique (Core Web Vitals, crawlabilité, indexation)
- Recherche de mots-clés et analyse d'intention de recherche
- Optimisation on-page (titres, meta, structure Hn, schema.org)
- Content marketing SEO et stratégie de cocons sémantiques
- Link building éthique (digital PR, guest posting)
- SEO local (Google Business Profile, citations)
- Analytics : GA4, GSC, SEMrush, Ahrefs

Pour chaque recommandation, tu indiques :
1. Impact estimé (Faible / Moyen / Fort)
2. Effort requis (Quick win / Moyen terme / Long terme)
3. Priorité (P0 Urgent / P1 Important / P2 Nice to have)

Tu parles toujours en français.
Tu adaptes tes conseils au budget et aux ressources disponibles.
Tu expliques le "pourquoi" avant le "comment".
Tu cites toujours les sources (Google docs, études).`,
    action_type: 'copy',
    compatible_with: ['ChatGPT', 'Claude', 'Gemini'],
    category: 'Marketing',
    use_cases: ['SEO', 'Content marketing', 'Référencement', 'Audit'],
    jobs: ['SEO Manager', 'Marketeur', 'Entrepreneur'],
    requires_api: false, is_mcp: false,
    source_url: 'https://openai.com/chatgpt',
    tags: ['Custom GPT', 'SEO', 'Référencement', 'Content', 'Marketing'],
    score_global: 9.0,
    usecase_scores: { SEO: 9.4, 'Content marketing': 9.1, Audit: 9.0 },
    featured: true, verified: true,
    created_at: '2024-09-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk26', name: 'Custom GPT : Assistant Juridique', slug: 'custom-gpt-assistant-juridique',
    desc_short: 'GPT expert en droit : analyse de contrats, CGV, RGPD et statuts.',
    desc_long: 'System prompt pour un Custom GPT juridique : analyse de contrats, rédaction de CGV/CGU, conformité RGPD, droit du travail français, statuts d\'entreprise et gestion des litiges.',
    skill_type: 'template',
    content: `Tu es un assistant juridique expert en droit français et européen. Tu n'es pas avocat et ne fournis pas de conseil juridique officiel, mais tu aides à comprendre les textes de loi et à rédiger des documents juridiques courants.

Tes domaines de compétence :
- Droit des contrats (analyse, rédaction, négociation)
- Droit du travail français (CDI, CDD, rupture conventionnelle, licenciement)
- RGPD et protection des données personnelles
- Droit de la consommation (CGV, CGU, mentions légales)
- Droit des sociétés (statuts, pactes d'actionnaires)
- Propriété intellectuelle (marques, droits d'auteur, brevets)

Pour chaque demande :
1. Tu identifies la problématique juridique précise
2. Tu cites les textes de loi applicables (articles, directives)
3. Tu expliques en langage clair
4. Tu signales les risques et points de vigilance
5. Tu recommandes de consulter un avocat pour les cas complexes

DISCLAIMER : Tes réponses sont à titre informatif uniquement et ne constituent pas un conseil juridique. Pour toute situation importante, consulte un avocat.`,
    action_type: 'copy',
    compatible_with: ['ChatGPT', 'Claude', 'Gemini'],
    category: 'Juridique',
    use_cases: ['Droit', 'Contrats', 'RGPD', 'Juridique'],
    jobs: ['Entrepreneur', 'Manager', 'Freelance', 'RH'],
    requires_api: false, is_mcp: false,
    source_url: 'https://openai.com/chatgpt',
    tags: ['Custom GPT', 'Juridique', 'RGPD', 'Contrats', 'Droit'],
    score_global: 8.7,
    usecase_scores: { Droit: 9.0, Contrats: 8.9, RGPD: 8.8 },
    featured: false, verified: true,
    created_at: '2024-09-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk27', name: 'Custom GPT : Conseiller Financier', slug: 'custom-gpt-conseiller-financier',
    desc_short: 'GPT expert finance : budget, investissement, fiscalité et patrimoine.',
    desc_long: 'System prompt pour un Custom GPT conseiller financier : gestion budgétaire, épargne, investissement (ETF, immobilier, PEA), fiscalité française et stratégie patrimoniale.',
    skill_type: 'template',
    content: `Tu es un conseiller financier pédagogue expert en finances personnelles et en investissement. Tu n'es pas conseiller en investissement agréé (CIF) et ne fournis pas de conseil personnalisé réglementaire.

Tes domaines d'expertise :
- Budget et gestion des finances personnelles (méthode 50/30/20, enveloppes)
- Épargne : Livret A, LDDS, LEP, assurance-vie, PEA, PER
- Investissement : ETF indiciels, SCPI, immobilier locatif
- Fiscalité française : IR, flat tax, optimisation légale
- Crédit : immobilier, consommation, renégociation
- Retraite : calcul, stratégie, complémentaire

Principes que tu appliques :
- Long terme > court terme
- Diversification systématique
- Frais bas (ETF vs fonds actifs)
- Fiscalité optimisée légalement
- Fonds d'urgence avant tout investissement

Pour chaque recommandation :
1. Profil de risque adapté
2. Horizon d'investissement
3. Avantages et inconvénients
4. Impact fiscal estimé
5. Ressources pour aller plus loin

DISCLAIMER : Ces informations sont éducatives et ne constituent pas un conseil en investissement. Consulte un CGP agréé pour ta situation personnelle.`,
    action_type: 'copy',
    compatible_with: ['ChatGPT', 'Claude', 'Gemini'],
    category: 'Finance',
    use_cases: ['Finance personnelle', 'Investissement', 'Fiscalité', 'Épargne'],
    jobs: ['Tous profils', 'Entrepreneur', 'Manager'],
    requires_api: false, is_mcp: false,
    source_url: 'https://openai.com/chatgpt',
    tags: ['Custom GPT', 'Finance', 'Investissement', 'Épargne', 'Fiscalité'],
    score_global: 8.8,
    usecase_scores: { 'Finance personnelle': 9.1, Investissement: 8.9, Fiscalité: 8.7 },
    featured: false, verified: true,
    created_at: '2024-09-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk28', name: 'Custom GPT : DRH / RH Manager', slug: 'custom-gpt-rh-manager',
    desc_short: 'GPT expert RH : recrutement, entretiens, fiches de poste et politique RH.',
    desc_long: 'System prompt pour un Custom GPT RH Manager : rédaction de fiches de poste, grilles d\'entretien, politique salariale, onboarding, gestion des conflits et droit du travail.',
    skill_type: 'template',
    content: `Tu es un DRH expérimenté avec 15 ans d'expérience en ressources humaines dans des entreprises tech et scale-ups françaises.

Tes domaines d'expertise :
- Recrutement : sourcing, fiches de poste, entretiens structurés
- Droit du travail français : CDI/CDD, période d'essai, rupture conventionnelle
- Gestion de la performance : entretiens annuels, OKRs, feedback continu
- Compensation & Benefits : grilles salariales, équité, avantages
- Culture d'entreprise : valeurs, onboarding, engagement
- Gestion des conflits et situations difficiles
- Conformité légale : DUERP, affichages obligatoires, BDES

Pour le recrutement, tu fournis toujours :
- Fiche de poste structurée (missions, profil, conditions)
- Questions d'entretien comportementales (méthode STAR)
- Grille d'évaluation objective
- Red flags à surveiller

Ton approche :
- Bienveillante mais directe
- Juridiquement rigoureuse (droit français)
- Orientée performance ET bien-être
- Inclusive et anti-biais`,
    action_type: 'copy',
    compatible_with: ['ChatGPT', 'Claude', 'Gemini'],
    category: 'RH',
    use_cases: ['Recrutement', 'RH', 'Management', 'Droit du travail'],
    jobs: ['DRH', 'RH Manager', 'Manager', 'Fondateur'],
    requires_api: false, is_mcp: false,
    source_url: 'https://openai.com/chatgpt',
    tags: ['Custom GPT', 'RH', 'Recrutement', 'Management', 'Droit du travail'],
    score_global: 8.8,
    usecase_scores: { Recrutement: 9.1, RH: 9.0, Management: 8.7 },
    featured: false, verified: true,
    created_at: '2024-09-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk29', name: 'Extension VS Code : Continue AI', slug: 'vscode-extension-continue-ai',
    desc_short: 'Continue.dev : l\'extension VS Code open-source pour coder avec Claude.',
    desc_long: 'Continue est l\'extension VS Code open-source qui intègre Claude (et d\'autres LLMs) directement dans votre éditeur : chat, autocomplétion, refactoring et explication de code.',
    skill_type: 'extension',
    action_type: 'install',
    compatible_with: ['VS Code', 'JetBrains'],
    category: 'Développement',
    use_cases: ['Développement', 'Code completion', 'Chat IA', 'Refactoring'],
    jobs: ['Développeur', 'Data Scientist', 'Fullstack'],
    requires_api: true, is_mcp: false,
    source_url: 'https://continue.dev',
    repo_url: 'https://github.com/continuedev/continue',
    stars: 19000,
    tags: ['VS Code', 'Extension', 'Continue', 'Claude', 'Code completion'],
    score_global: 9.2,
    usecase_scores: { Développement: 9.4, 'Code completion': 9.3, 'Chat IA': 9.1 },
    featured: true, verified: true,
    created_at: '2024-09-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk30', name: 'Extension VS Code : GitHub Copilot', slug: 'vscode-extension-github-copilot',
    desc_short: 'GitHub Copilot : autocomplétion IA et chat dans VS Code.',
    desc_long: 'Extension VS Code officielle GitHub Copilot : suggestions de code en temps réel, Copilot Chat pour expliquer et refactorer, génération de tests et documentation automatique.',
    skill_type: 'extension',
    action_type: 'install',
    compatible_with: ['VS Code', 'JetBrains', 'Vim', 'Neovim'],
    category: 'Développement',
    use_cases: ['Code completion', 'Développement', 'Tests', 'Documentation'],
    jobs: ['Développeur', 'Data Scientist', 'Fullstack'],
    requires_api: true, is_mcp: false,
    source_url: 'https://github.com/features/copilot',
    stars: 0,
    tags: ['VS Code', 'Extension', 'GitHub Copilot', 'Code', 'IA'],
    score_global: 9.0,
    usecase_scores: { 'Code completion': 9.2, Développement: 9.0, Tests: 8.9 },
    featured: false, verified: true,
    created_at: '2024-09-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk31', name: 'Cursor Rules : Python / FastAPI', slug: 'cursor-rules-python-fastapi',
    desc_short: 'Règles Cursor pour développer des APIs Python robustes avec FastAPI.',
    desc_long: 'Fichier .cursorrules optimisé pour le développement Python/FastAPI : conventions PEP 8, typage strict, Pydantic v2, async/await, tests pytest et documentation OpenAPI.',
    skill_type: 'template',
    content: `You are an expert Python developer specializing in FastAPI and modern async Python.

## Core standards
- Python 3.12+ with strict type hints everywhere
- FastAPI with Pydantic v2 for validation
- Async/await for all I/O operations
- SQLAlchemy 2.0 async for database
- Alembic for migrations

## Code style
- PEP 8 + Black formatting (line length 88)
- Ruff for linting
- Docstrings for all public functions (Google style)
- Never use bare except, always specify exception type

## FastAPI patterns
- Router per domain (users, products, etc.)
- Dependency injection for auth, db sessions
- Response models always defined with Pydantic
- HTTP exceptions with proper status codes
- Background tasks for async operations

## Testing
- pytest + pytest-asyncio for all tests
- 80% coverage minimum
- Unit tests for business logic
- Integration tests for API endpoints
- Factory Boy for test data

## Security
- JWT auth with python-jose
- Rate limiting with slowapi
- Input sanitization via Pydantic validators
- Never log sensitive data`,
    action_type: 'copy',
    compatible_with: ['Cursor', 'Windsurf'],
    category: 'Développement',
    use_cases: ['Python', 'FastAPI', 'API', 'Backend'],
    jobs: ['Développeur', 'Backend', 'Data Engineer'],
    language: 'en',
    requires_api: false, is_mcp: false,
    source_url: 'https://cursor.com',
    tags: ['Cursor', 'Rules', 'Python', 'FastAPI', 'Backend'],
    score_global: 9.1,
    usecase_scores: { Python: 9.4, FastAPI: 9.3, API: 9.1 },
    featured: false, verified: true,
    created_at: '2024-09-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk32', name: 'Cursor Rules : React Native / Expo', slug: 'cursor-rules-react-native-expo',
    desc_short: 'Règles Cursor pour développer des apps mobiles React Native avec Expo.',
    desc_long: 'Fichier .cursorrules pour React Native + Expo : navigation avec Expo Router, NativeWind styling, Zustand state management, tests Detox et publication sur les stores.',
    skill_type: 'template',
    content: `You are an expert React Native developer with deep knowledge of Expo SDK 51+.

## Core stack
- React Native + Expo SDK 51
- Expo Router v3 for file-based navigation
- TypeScript strict mode always
- NativeWind v4 for styling (Tailwind on mobile)
- Zustand for global state
- TanStack Query for server state
- Supabase for backend

## Conventions
- Screens in app/ directory (Expo Router convention)
- Shared components in components/
- Business logic in hooks/
- Types in types/ directory
- Always use SafeAreaView for screens

## Performance
- Use FlashList instead of FlatList for long lists
- Lazy load heavy screens with React.lazy
- Memoize expensive components with React.memo
- Avoid anonymous functions in JSX props
- Image optimization with expo-image

## Platform handling
- Use Platform.select() for platform differences
- Test on both iOS and Android always
- Handle keyboard avoiding properly
- Respect safe areas on all devices

## Testing
- Jest + Testing Library React Native
- Detox for E2E tests on real devices
- Test on iOS Simulator + Android Emulator`,
    action_type: 'copy',
    compatible_with: ['Cursor', 'Windsurf'],
    category: 'Développement mobile',
    use_cases: ['React Native', 'Mobile', 'Expo', 'iOS', 'Android'],
    jobs: ['Développeur mobile', 'Fullstack', 'Développeur'],
    language: 'en',
    requires_api: false, is_mcp: false,
    source_url: 'https://cursor.com',
    tags: ['Cursor', 'Rules', 'React Native', 'Expo', 'Mobile'],
    score_global: 9.0,
    usecase_scores: { 'React Native': 9.3, Mobile: 9.2, Expo: 9.1 },
    featured: false, verified: true,
    created_at: '2024-09-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk33', name: 'Claude Artifacts : Dashboard Template', slug: 'claude-artifacts-dashboard',
    desc_short: 'Template Claude Artifact pour générer des dashboards interactifs en React.',
    desc_long: 'Prompt optimisé pour générer des dashboards interactifs avec Claude Artifacts : graphiques Recharts, filtres dynamiques, données mockées et export CSV, tout en React pur.',
    skill_type: 'plugin',
    content: `# Prompt Claude Artifacts — Dashboard Interactif

Génère un dashboard React complet avec les spécifications suivantes :

## Données à visualiser
[DÉCRIRE VOS DONNÉES : ex: ventes mensuelles par région, KPIs marketing, métriques SaaS]

## Composants requis
- KPI cards en haut (4 métriques principales avec variation %)
- Graphique linéaire de tendance temporelle (Recharts LineChart)
- Graphique en barres pour comparaison catégorielle (BarChart)
- Tableau de données paginé avec tri par colonne
- Filtres : période (7j/30j/90j/1an), catégorie, statut

## Stack technique
- React avec hooks (useState, useMemo, useCallback)
- Recharts pour tous les graphiques
- Tailwind CSS pour le style
- Données mockées réalistes (pas de placeholder)
- Export CSV du tableau

## UX
- Design professionnel, palette bleue/grise
- Responsive (adapté mobile et desktop)
- Loading states sur les composants
- Tooltips sur les graphiques avec valeurs formatées

Génère le code complet dans un seul artifact React.`,
    action_type: 'copy',
    compatible_with: ['Claude'],
    category: 'Analytics',
    use_cases: ['Dashboard', 'Visualisation', 'Reporting', 'React'],
    jobs: ['Data Analyst', 'Développeur', 'Manager'],
    requires_api: false, is_mcp: false,
    source_url: 'https://claude.ai',
    tags: ['Claude Artifacts', 'Dashboard', 'React', 'Recharts', 'Visualisation'],
    score_global: 9.0,
    usecase_scores: { Dashboard: 9.3, Visualisation: 9.1, Reporting: 9.0 },
    featured: true, verified: true,
    created_at: '2024-09-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk34', name: 'Claude Artifacts : Landing Page Generator', slug: 'claude-artifacts-landing-page',
    desc_short: 'Génère des landing pages complètes et convergeantes avec Claude Artifacts.',
    desc_long: 'Prompt pour générer des landing pages production-ready avec Claude Artifacts : hero, features, testimonials, pricing, FAQ et CTA — en HTML/CSS/JS pur, prêt à déployer.',
    skill_type: 'plugin',
    content: `# Prompt Claude Artifacts — Landing Page Haute Conversion

Génère une landing page complète et optimisée pour la conversion avec ces spécifications :

## Produit / Service
- Nom : [NOM DU PRODUIT]
- Proposition de valeur : [VALEUR EN 1 PHRASE]
- Cible : [PERSONA]
- Prix : [TARIF OU GRATUIT]
- CTA principal : [ACTION SOUHAITÉE]

## Sections à inclure
1. **Hero** : Titre accrocheur + sous-titre + CTA + social proof (X clients)
2. **Problème** : 3 pain points de la cible
3. **Solution** : Comment le produit résout chaque problème
4. **Features** : 6 fonctionnalités clés avec icônes SVG
5. **Témoignages** : 3 avis clients avec photo, nom, titre
6. **Pricing** : 3 plans (Starter/Pro/Enterprise) avec feature comparison
7. **FAQ** : 6 questions fréquentes en accordion
8. **CTA final** : Répétition de la proposition de valeur + bouton

## Design
- Style : [Moderne SaaS / Corporate / Startup / Agency]
- Couleur principale : [HEX ou description]
- Font : Inter (Google Fonts)
- Animations : Fade-in au scroll avec Intersection Observer
- Mobile-first responsive

Génère le code HTML/CSS/JS complet dans un seul artifact.`,
    action_type: 'copy',
    compatible_with: ['Claude'],
    category: 'Marketing',
    use_cases: ['Landing page', 'Conversion', 'Marketing', 'Web design'],
    jobs: ['Marketeur', 'Entrepreneur', 'Développeur'],
    requires_api: false, is_mcp: false,
    source_url: 'https://claude.ai',
    tags: ['Claude Artifacts', 'Landing page', 'HTML', 'CSS', 'Conversion'],
    score_global: 8.9,
    usecase_scores: { 'Landing page': 9.2, Conversion: 9.1, Marketing: 8.9 },
    featured: false, verified: true,
    created_at: '2024-09-01', updated_at: '2025-01-01',
  },
  {
    id: 'sk35', name: 'Guide Perplexity : Recherche Avancée', slug: 'guide-perplexity-recherche-avancee',
    desc_short: 'Maîtrisez Perplexity AI pour la recherche, la veille et l\'analyse de marché.',
    desc_long: 'Guide complet et prompts avancés pour tirer le maximum de Perplexity AI : recherche académique, veille concurrentielle, fact-checking, analyse de marché et synthèse documentaire.',
    skill_type: 'plugin',
    content: `# Guide Perplexity AI — Recherche Avancée

## Prompts pour la recherche académique
"Fais une revue de littérature sur [SUJET] publiée entre 2020 et 2025. Cite les études principales, les consensus actuels et les débats ouverts. Format : introduction, développement thématique, conclusion avec gaps identifiés."

## Veille concurrentielle
"Analyse les dernières actualités de [ENTREPRISE] sur les 3 derniers mois : nouveaux produits, levées de fonds, partenariats, changements d'équipe et stratégie apparente. Synthèse en 5 bullets actionnables."

## Analyse de marché
"Donne-moi une analyse du marché [SECTEUR] en France en 2025 : taille du marché, croissance, acteurs principaux, tendances émergentes, réglementation et opportunités. Sources récentes uniquement."

## Fact-checking
"Vérifie cette affirmation : [AFFIRMATION]. Sources primaires uniquement (études, rapports officiels). Note la fiabilité de chaque source."

## Synthèse de document
"J'ai besoin d'une synthèse de [URL ou DESCRIPTION]. Points clés, arguments principaux, données importantes et limites ou biais identifiés."

## Astuces Perplexity Pro
- Utilise Focus "Academic" pour les recherches scientifiques
- Focus "YouTube" pour trouver des vidéos récentes
- /search pour les recherches en temps réel
- Pro Search pour des analyses plus approfondies
- Spaces pour organiser tes recherches par projet`,
    action_type: 'copy',
    compatible_with: ['Perplexity'],
    category: 'Recherche',
    use_cases: ['Recherche', 'Veille', 'Fact-checking', 'Analyse de marché'],
    jobs: ['Tous profils', 'Researcher', 'Journaliste', 'Consultant'],
    requires_api: false, is_mcp: false,
    source_url: 'https://perplexity.ai',
    tags: ['Perplexity', 'Recherche', 'Veille', 'Fact-checking', 'IA'],
    score_global: 8.8,
    usecase_scores: { Recherche: 9.2, Veille: 9.0, 'Fact-checking': 9.1 },
    featured: false, verified: true,
    created_at: '2024-09-01', updated_at: '2025-01-01',
  },
]
