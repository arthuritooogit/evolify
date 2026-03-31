// ─── TYPES COMMUNS ────────────────────────────────────────────────────────────

export type PriceType = 'gratuit' | 'freemium' | 'payant' | 'open-source'
export type DifficultyLevel = 'débutant' | 'intermédiaire' | 'avancé'
export type Language = 'fr' | 'en' | 'multi'
export type GenerationType = 'txt→img' | 'txt→vid' | 'txt+img→img' | 'txt+img→vid' | 'img→img' | 'upscale'
export type SkillType = 'skill' | 'plugin' | 'extension' | 'mcp' | 'api' | 'template' | 'repo'
export type ActionType = 'download' | 'copy' | 'link' | 'install'
export type ModuleKey = 'llm' | 'visual' | 'automation' | 'skills'
export type ContentType =
  | 'vidéo' | 'article' | 'documentation' | 'formation' | 'tuto'
  | 'blog-evolify' | 'news' | 'comparatif' | 'classement' | 'use-case'
  | 'podcast' | 'newsletter' | 'forum'

// ─── OUTILS IA ────────────────────────────────────────────────────────────────

export interface AiTool {
  id: string
  name: string
  slug: string
  desc_short: string
  desc_long: string
  url: string
  logo_url?: string
  functions: string[]
  uses: string[]
  price: PriceType
  price_detail?: string
  jobs: string[]
  stack: string[]
  platforms: string[]
  strengths: string[]
  limits: string[]
  tags: string[]
  score_global: number
  function_scores: Record<string, number>
  usecase_scores: Record<string, number>
  alternatives_free?: string[]
  similar_tools?: string[]
  featured: boolean
  verified: boolean
  created_at: string
  updated_at: string
}

// ─── PROMPTS LLM ──────────────────────────────────────────────────────────────

export interface LLMPrompt {
  id: string
  name: string
  slug: string
  desc_short: string
  desc_long: string
  prompt_text: string
  prompt_type: 'system' | 'user' | 'chain' | 'agent' | 'template' | 'mega-prompt'
  framework?: string
  top_models: string[]
  category: string
  subcategory?: string
  difficulty?: 'Débutant' | 'Intermédiaire' | 'Avancé'
  tone?: 'Professionnel' | 'Créatif' | 'Technique' | 'Commercial' | 'Académique' | 'Casual'
  jobs: string[]
  use_cases: string[]
  is_agent_prompt: boolean
  variables: string[]
  output_type: 'texte' | 'liste' | 'tableau' | 'code' | 'json' | 'email' | 'script' | 'rapport'
  language: Language
  tags: string[]
  score_global: number
  usecase_scores: Record<string, number>
  featured: boolean
  verified: boolean
  author?: string
  created_at: string
  updated_at: string
}

// ─── PROMPTS VISUELS ──────────────────────────────────────────────────────────

export interface VisualPrompt {
  id: string
  name: string
  slug: string
  desc_short: string
  prompt_text: string
  prompt_params?: string
  preview_url: string
  tool: string
  tools_compatible: string[]
  generation_type: GenerationType
  style: string[]
  realism: 'hyperréaliste' | 'réaliste' | 'semi-réaliste' | 'stylisé' | 'abstrait'
  render: string[]
  format: 'paysage' | 'portrait' | 'carré' | 'cinémascope' | 'vertical'
  ratio?: string
  lighting?: string
  destination: string[]
  subject: string[]
  mood: string[]
  use_case?: string
  tags: string[]
  score_global: number
  usecase_scores: Record<string, number>
  featured: boolean
  verified: boolean
  author?: string
  created_at: string
  updated_at: string
}

// ─── WORKFLOWS ────────────────────────────────────────────────────────────────

export interface Workflow {
  id: string
  name: string
  slug: string
  desc_short: string
  desc_long: string
  workflow_json?: string
  screenshot_url?: string
  platform: string
  platforms_compatible: string[]
  type: 'automatisation' | 'scraping' | 'notification' | 'sync' | 'agent' | 'pipeline' | 'autre'
  complexity: DifficultyLevel
  nodes_count?: number
  trigger: string[]
  result: string
  apps: string[]
  uses_api: boolean
  uses_mcp: boolean
  price_required: PriceType
  jobs: string[]
  use_cases: string[]
  tags: string[]
  score_global: number
  usecase_scores: Record<string, number>
  featured: boolean
  verified: boolean
  author?: string
  created_at: string
  updated_at: string
}

// ─── SKILLS & PLUGINS ─────────────────────────────────────────────────────────

export interface Skill {
  id: string
  name: string
  slug: string
  desc_short: string
  desc_long: string
  skill_type: SkillType
  content?: string
  file_url?: string
  repo_url?: string
  action_url?: string
  action_type: ActionType
  compatible_with: string[]
  category: string
  use_cases: string[]
  jobs: string[]
  language?: string
  requires_api: boolean
  is_mcp: boolean
  source_url: string
  stars?: number
  author?: string
  tags: string[]
  score_global: number
  usecase_scores: Record<string, number>
  featured: boolean
  verified: boolean
  created_at: string
  updated_at: string
}

// ─── RESSOURCES ───────────────────────────────────────────────────────────────

export interface Resource {
  id: string
  name: string
  slug: string
  desc_short: string
  desc_long?: string
  content_type: ContentType
  url: string
  source: string
  author?: string
  thumbnail_url?: string
  is_internal: boolean
  // Champs enrichis si is_internal
  content_mdx?: string
  cover_image_url?: string
  reading_time?: number
  seo_title?: string
  meta_description?: string
  table_of_contents?: string[]
  // Ciblage
  module: string[]
  category: string[]
  jobs: string[]
  use_cases: string[]
  complexity: DifficultyLevel
  duration?: string
  language: Language
  is_free: boolean
  tags: string[]
  score_global: number
  featured: boolean
  verified: boolean
  published_at?: string
  created_at: string
  updated_at: string
}

// ─── CATALOGUE GÉNÉRIQUE ──────────────────────────────────────────────────────

export type CatalogItem = AiTool | LLMPrompt | VisualPrompt | Workflow | Skill | Resource

export interface FilterDef {
  key: string
  label: string
  type: 'multiselect' | 'toggle' | 'slider'
  options?: string[]
  min?: number
  max?: number
}

export interface KanbanAxis {
  key: string
  label: string
  getValue: (item: CatalogItem) => string | string[]
}

// ─── UTILISATEUR SUPABASE ─────────────────────────────────────────────────────

export interface UserSave {
  id: string
  user_id: string
  item_id: string
  item_type: string
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: 'contribution_validated' | 'contribution_rejected' | 'new_module' | 'welcome'
  message: string
  read: boolean
  created_at: string
}

export interface Contribution {
  id: string
  user_id: string
  item_type: string
  data: Record<string, unknown>
  status: 'pending' | 'approved' | 'rejected'
  admin_note?: string
  created_at: string
  reviewed_at?: string
}
