import type { LLMPrompt } from '@/types'

export const LLM_PROMPTS: LLMPrompt[] = [
  {
    id: 'lp1', name: 'Mega-Prompt Copywriting Persuasif', slug: 'mega-prompt-copywriting-persuasif',
    desc_short: 'Génère des textes de vente ultra-persuasifs avec les meilleures frameworks copywriting.',
    desc_long: 'Ce mega-prompt intègre AIDA, PAS, Before/After/Bridge et StoryBrand pour créer des textes de vente percutants. Idéal pour landing pages, emails et publicités.',
    prompt_text: `Tu es un expert en copywriting avec 15 ans d'expérience. Tu maîtrises les frameworks AIDA, PAS, et StoryBrand.

Ta mission : créer un texte de vente pour [PRODUIT/SERVICE].

Contexte :
- Audience cible : [AUDIENCE]
- Problème principal : [PROBLÈME]
- Solution proposée : [SOLUTION]
- Prix : [PRIX]

Utilise la structure suivante :
1. Hook accrocheur (première ligne critique)
2. Identification du problème (empathie)
3. Aggravation (conséquences d'inaction)
4. Solution + bénéfices clés
5. Preuve sociale
6. Offre irrésistible
7. CTA urgent

Ton : [professionnel/décontracté/urgent]
Longueur : [court/moyen/long]`,
    prompt_type: 'mega-prompt',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o', 'Gemini 1.5 Pro'],
    category: 'Copywriting',
    subcategory: 'Vente',
    jobs: ['Marketeur', 'Entrepreneur', 'Rédacteur'],
    use_cases: ['Landing page', 'Email marketing', 'Publicité'],
    is_agent_prompt: false,
    variables: ['PRODUIT/SERVICE', 'AUDIENCE', 'PROBLÈME', 'SOLUTION', 'PRIX'],
    output_type: 'texte',
    language: 'fr',
    tags: ['Copywriting', 'Vente', 'Marketing', 'AIDA', 'Persuasion'],
    score_global: 9.4,
    usecase_scores: { 'Landing page': 9.5, 'Email marketing': 9.2 },
    featured: true, verified: true, author: 'Evolify',
    created_at: '2024-01-01', updated_at: '2025-01-01',
  },
  {
    id: 'lp2', name: 'Analyste Business Intelligence', slug: 'analyste-business-intelligence',
    desc_short: 'Analyse de données business avec recommandations actionnables.',
    desc_long: 'Transforme n\'importe quel jeu de données ou rapport en analyse structurée avec KPIs, insights et plan d\'action concret.',
    prompt_text: `Tu es un analyste Business Intelligence senior. Analyse les données suivantes et fournis :

Données : [DONNÉES/RAPPORT]

Structure ta réponse :
1. **Résumé exécutif** (3-5 points clés)
2. **KPIs principaux** avec comparatif période précédente
3. **Points forts** (top 3 performances)
4. **Points d'amélioration** (top 3 avec causes probables)
5. **Recommandations actionnables** (priorisées par impact/effort)
6. **Prochaines étapes** (30/60/90 jours)

Format : tableau + bullet points
Public : direction générale`,
    prompt_type: 'system',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Analyse',
    subcategory: 'Business',
    jobs: ['Analyste', 'Manager', 'Entrepreneur'],
    use_cases: ['Rapport mensuel', 'Board meeting', 'Stratégie'],
    is_agent_prompt: false,
    variables: ['DONNÉES/RAPPORT'],
    output_type: 'tableau',
    language: 'fr',
    tags: ['Analyse', 'Business', 'KPI', 'Données', 'Stratégie'],
    score_global: 9.1,
    usecase_scores: { 'Rapport mensuel': 9.3, 'Board meeting': 9.0 },
    featured: true, verified: true,
    created_at: '2024-01-01', updated_at: '2025-01-01',
  },
  {
    id: 'lp3', name: 'Générateur de Stratégie SEO', slug: 'generateur-strategie-seo',
    desc_short: 'Crée une stratégie SEO complète avec keywords, structure et plan de contenu.',
    desc_long: 'Ce prompt génère une stratégie SEO clé en main : analyse des intentions de recherche, architecture du site, clusters de contenu et calendrier éditorial.',
    prompt_text: `Tu es un expert SEO avec 10 ans d'expérience en référencement naturel.

Crée une stratégie SEO complète pour : [SITE/BUSINESS]
Secteur : [SECTEUR]
Concurrents : [CONCURRENTS]
Budget contenu mensuel : [BUDGET ARTICLES]

Fournis :
1. **Analyse de l'intention de recherche** par segment
2. **Mots-clés prioritaires** (top 20 avec volume/difficulté)
3. **Architecture de site** recommandée
4. **Clusters de contenu** (topic clusters)
5. **Calendrier éditorial** 3 mois
6. **Quick wins** (actions rapides <30 jours)
7. **Métriques de suivi**`,
    prompt_type: 'user',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o', 'Perplexity'],
    category: 'SEO',
    subcategory: 'Stratégie',
    jobs: ['SEO', 'Marketeur', 'Rédacteur web'],
    use_cases: ['Stratégie contenu', 'Audit SEO', 'Lancement site'],
    is_agent_prompt: false,
    variables: ['SITE/BUSINESS', 'SECTEUR', 'CONCURRENTS', 'BUDGET ARTICLES'],
    output_type: 'liste',
    language: 'fr',
    tags: ['SEO', 'Contenu', 'Mots-clés', 'Stratégie', 'Marketing'],
    score_global: 9.0,
    usecase_scores: { 'Stratégie contenu': 9.2, 'Lancement site': 9.0 },
    featured: false, verified: true,
    created_at: '2024-01-01', updated_at: '2025-01-01',
  },
  {
    id: 'lp4', name: 'Architecte de Code Senior', slug: 'architecte-code-senior',
    desc_short: 'Génère du code propre, documenté et scalable selon les best practices.',
    desc_long: 'Ce prompt transforme Claude ou GPT-4 en architecte logiciel senior qui produit du code de qualité production avec tests, documentation et gestion d\'erreurs.',
    prompt_text: `Tu es un architecte logiciel senior avec 15 ans d'expérience. Tu écris du code en [LANGAGE/FRAMEWORK].

Tâche : [DESCRIPTION DE LA FONCTIONNALITÉ]

Contraintes :
- Performance : [CONTRAINTES PERF]
- Sécurité : [CONTRAINTES SÉCU]
- Tests requis : [OUI/NON]

Fournis :
1. Architecture proposée (diagramme textuel)
2. Code complet avec commentaires
3. Gestion des erreurs
4. Tests unitaires
5. Documentation technique
6. Points d'attention et alternatives

Best practices : SOLID, DRY, Clean Code`,
    prompt_type: 'system',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o', 'Cursor'],
    category: 'Code',
    subcategory: 'Architecture',
    jobs: ['Développeur', 'CTO', 'Tech Lead'],
    use_cases: ['Nouvelle fonctionnalité', 'Refactoring', 'API', 'Architecture'],
    is_agent_prompt: false,
    variables: ['LANGAGE/FRAMEWORK', 'DESCRIPTION DE LA FONCTIONNALITÉ', 'CONTRAINTES PERF', 'CONTRAINTES SÉCU'],
    output_type: 'code',
    language: 'fr',
    tags: ['Code', 'Architecture', 'Développement', 'SOLID', 'Clean Code'],
    score_global: 9.3,
    usecase_scores: { 'Nouvelle fonctionnalité': 9.4, Refactoring: 9.2 },
    featured: true, verified: true,
    created_at: '2024-01-01', updated_at: '2025-01-01',
  },
  {
    id: 'lp5', name: 'Agent de Recherche Concurrentielle', slug: 'agent-recherche-concurrentielle',
    desc_short: 'Analyse complète de vos concurrents : forces, faiblesses, opportunités.',
    desc_long: 'Ce prompt agent effectue une analyse concurrentielle exhaustive avec framework SWOT étendu, positionnement et stratégies de différenciation.',
    prompt_text: `Tu es un consultant en stratégie spécialisé en intelligence concurrentielle.

Effectue une analyse concurrentielle pour : [MON PRODUIT/SERVICE]
Concurrents à analyser : [CONCURRENT 1], [CONCURRENT 2], [CONCURRENT 3]
Mon marché cible : [MARCHÉ]

Analyse pour chaque concurrent :
1. **Positionnement** (proposition de valeur unique)
2. **Forces** (top 5)
3. **Faiblesses** (top 5)
4. **Stratégie pricing**
5. **Stratégie marketing** (canaux, messages)
6. **Avis clients** (points de friction récurrents)

Puis :
7. **Opportunités de différenciation** pour mon produit
8. **Menaces** à surveiller
9. **Recommandations** stratégiques (priorités)`,
    prompt_type: 'agent',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o', 'Perplexity'],
    category: 'Stratégie',
    subcategory: 'Concurrence',
    jobs: ['Entrepreneur', 'Product Manager', 'Marketeur'],
    use_cases: ['Lancement produit', 'Étude de marché', 'Pivot'],
    is_agent_prompt: true,
    variables: ['MON PRODUIT/SERVICE', 'CONCURRENT 1', 'CONCURRENT 2', 'CONCURRENT 3', 'MARCHÉ'],
    output_type: 'tableau',
    language: 'fr',
    tags: ['Stratégie', 'Concurrence', 'SWOT', 'Analyse', 'Business'],
    score_global: 8.9,
    usecase_scores: { 'Lancement produit': 9.2, 'Étude de marché': 9.0 },
    featured: false, verified: true,
    created_at: '2024-01-01', updated_at: '2025-01-01',
  },
  {
    id: 'lp6', name: 'Ghostwriter Email Newsletter', slug: 'ghostwriter-email-newsletter',
    desc_short: 'Rédige des newsletters engageantes avec un fort taux d\'ouverture.',
    desc_long: 'Template de newsletter IA qui génère des emails avec des objets accrocheurs, une structure narrative engageante et des CTAs optimisés.',
    prompt_text: `Tu es mon ghostwriter spécialisé en email marketing. Tu vas rédiger ma newsletter.

Sujet : [SUJET DE LA SEMAINE]
Mon audience : [DESCRIPTION AUDIENCE]
Ton habituel : [FORMEL/DÉCONTRACTÉ/INSPIRANT]
Nombre d'abonnés : [NOMBRE]
Secteur : [SECTEUR]

Structure :
1. **Objet** (5 variations A/B testables)
2. **Préheader** accrocheur
3. **Intro** hook (100 mots max)
4. **Corps** avec storytelling et valeur actionnable
5. **Section principale** avec insight exclusif
6. **CTA principal** (un seul, clair)
7. **P.S.** (teaser numéro suivant)

Longueur totale : 400-600 mots`,
    prompt_type: 'template',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Copywriting',
    subcategory: 'Email',
    jobs: ['Marketeur', 'Entrepreneur', 'Créateur de contenu'],
    use_cases: ['Newsletter', 'Email marketing', 'Personal branding'],
    is_agent_prompt: false,
    variables: ['SUJET DE LA SEMAINE', 'DESCRIPTION AUDIENCE', 'FORMEL/DÉCONTRACTÉ/INSPIRANT', 'NOMBRE', 'SECTEUR'],
    output_type: 'email',
    language: 'fr',
    tags: ['Email', 'Newsletter', 'Copywriting', 'Marketing', 'Engagement'],
    score_global: 8.8,
    usecase_scores: { Newsletter: 9.2, 'Email marketing': 9.0 },
    featured: false, verified: true,
    created_at: '2024-01-01', updated_at: '2025-01-01',
  },
  {
    id: 'lp7', name: 'Script Vidéo YouTube Viral', slug: 'script-video-youtube-viral',
    desc_short: 'Structure des scripts YouTube optimisés pour maximiser la rétention.',
    desc_long: 'Ce prompt génère des scripts vidéo complets avec les patterns de rétention YouTube : hook fort, boucles ouvertes, rythme et CTA optimisés.',
    prompt_text: `Tu es un scriptwriter YouTube avec 5M+ de vues à ton actif.

Sujet : [SUJET]
Durée cible : [DURÉE] minutes
Audience : [AUDIENCE]

Script complet :
1. **Hook** (0-15s) — accroche irrésistible
2. **Promesse** (15-30s) — ce que le viewer gagne
3. **Corps** — 3-5 sections avec mini-hooks
4. **Pattern interrupt** à 50% de la vidéo
5. **Conclusion** + CTA

Format : timestamp + texte parlé + notes de montage`,
    prompt_type: 'template',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Contenu',
    subcategory: 'Vidéo',
    jobs: ['YouTubeur', 'Créateur de contenu', 'Marketeur'],
    use_cases: ['YouTube', 'Script vidéo', 'Rétention'],
    is_agent_prompt: false,
    variables: ['SUJET', 'DURÉE', 'AUDIENCE'],
    output_type: 'script',
    language: 'fr',
    tags: ['YouTube', 'Script', 'Vidéo', 'Rétention', 'Contenu'],
    score_global: 9.0,
    usecase_scores: { YouTube: 9.4, 'Script vidéo': 9.2 },
    featured: false, verified: true,
    created_at: '2024-01-01', updated_at: '2025-01-01',
  },
  {
    id: 'lp8', name: 'Pitch Deck Investisseur', slug: 'pitch-deck-investisseur',
    desc_short: 'Structure complète d\'un pitch deck pour lever des fonds.',
    desc_long: 'Ce prompt génère le contenu d\'un pitch deck investisseur de 12 slides : problème, solution, marché, traction, modèle économique, équipe et ask.',
    prompt_text: `Tu es un associé VC qui a vu 1000+ pitches. Tu sais ce qui convainc.

Startup : [NOM] — Secteur : [SECTEUR]
Stade : [PRE-SEED/SEED/SERIE A]
Traction : [MÉTRIQUES]
Ask : [MONTANT]

12 slides :
1. Cover (tagline mémorable)
2. Problème (douleur + coût)
3. Solution
4. Marché (TAM/SAM/SOM)
5. Modèle économique
6. Traction (métriques clés)
7. Compétition (matrice)
8. Go-to-market
9. Équipe
10. Roadmap 18 mois
11. Financières (3 ans)
12. The Ask`,
    prompt_type: 'mega-prompt',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Business',
    subcategory: 'Levée de fonds',
    jobs: ['Entrepreneur', 'Fondateur', 'CTO'],
    use_cases: ['Pitch deck', 'Levée de fonds'],
    is_agent_prompt: false,
    variables: ['NOM', 'SECTEUR', 'PRE-SEED/SEED/SERIE A', 'MÉTRIQUES', 'MONTANT'],
    output_type: 'liste',
    language: 'fr',
    tags: ['Pitch', 'VC', 'Startup', 'Investisseur', 'Levée de fonds'],
    score_global: 9.2,
    usecase_scores: { 'Pitch deck': 9.5, 'Levée de fonds': 9.3 },
    featured: true, verified: true,
    created_at: '2024-01-01', updated_at: '2025-01-01',
  },
  {
    id: 'lp10', name: 'Consultant Product Manager', slug: 'consultant-product-manager',
    desc_short: 'Rédige des user stories, PRDs et roadmaps priorisées par impact.',
    desc_long: 'Ce prompt transforme l\'IA en PM senior : user stories complètes, critères d\'acceptance, priorisation RICE/MoSCoW et roadmap trimestrielle.',
    prompt_text: `Tu es un Product Manager senior avec 10 ans d'expérience en SaaS B2B.

Feature à spécifier : [FEATURE]
Contexte produit : [CONTEXTE]
Utilisateurs cibles : [PERSONAS]

Fournis :
1. **User story principale** (As a... I want... So that...)
2. **Critères d'acceptance** (Given/When/Then, min 5)
3. **Edge cases** et contraintes techniques
4. **Estimation** (S/M/L/XL) avec justification
5. **Score RICE** (Reach × Impact × Confidence / Effort)
6. **Risques** et mitigation
7. **Métriques de succès** (2-3 KPIs)`,
    prompt_type: 'template',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Product',
    subcategory: 'Spécification',
    jobs: ['Product Manager', 'Tech Lead', 'Entrepreneur'],
    use_cases: ['User story', 'PRD', 'Roadmap', 'Priorisation'],
    is_agent_prompt: false,
    variables: ['FEATURE', 'CONTEXTE', 'PERSONAS'],
    output_type: 'liste',
    language: 'fr',
    tags: ['Product', 'User story', 'PRD', 'RICE', 'Roadmap'],
    score_global: 9.1,
    usecase_scores: { 'User story': 9.4, PRD: 9.2 },
    featured: true, verified: true,
    created_at: '2024-06-01', updated_at: '2025-01-01',
  },
  {
    id: 'lp11', name: 'Coach Entretien d\'Embauche IA', slug: 'coach-entretien-embauche-ia',
    desc_short: 'Prépare tes entretiens avec des questions pièges et modèles de réponses STAR.',
    desc_long: 'Simulation d\'entretien complète : questions techniques, comportementales et situationnelles avec correction et conseils d\'amélioration en temps réel.',
    prompt_text: `Tu es un coach en recrutement avec 15 ans d'expérience en RH tech et startup.

Poste visé : [POSTE]
Entreprise : [ENTREPRISE]
Niveau : [JUNIOR/MID/SENIOR]
Mon background : [EXPÉRIENCE RÉSUMÉE]

Mode : simulation d'entretien
1. Pose-moi 10 questions (mix technique + comportemental + situationnel)
2. Après chaque réponse, évalue sur 10 avec feedback constructif
3. Propose une meilleure formulation avec méthode STAR
4. En fin, donne-moi les 3 points à améliorer prioritairement`,
    prompt_type: 'agent',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Carrière',
    subcategory: 'Entretien',
    jobs: ['Développeur', 'Tous profils'],
    use_cases: ['Entretien', 'Recrutement', 'Préparation'],
    is_agent_prompt: true,
    variables: ['POSTE', 'ENTREPRISE', 'JUNIOR/MID/SENIOR', 'EXPÉRIENCE RÉSUMÉE'],
    output_type: 'texte',
    language: 'fr',
    tags: ['Entretien', 'Recrutement', 'STAR', 'Carrière', 'Coaching'],
    score_global: 8.9,
    usecase_scores: { Entretien: 9.3, Recrutement: 8.9 },
    featured: false, verified: true,
    created_at: '2024-06-01', updated_at: '2025-01-01',
  },
  {
    id: 'lp12', name: 'Traducteur Technique Multilingue', slug: 'traducteur-technique-multilingue',
    desc_short: 'Traduit des documents techniques en préservant la terminologie métier.',
    desc_long: 'Traduction professionnelle de documentation technique, API docs, interfaces ou contenus marketing avec glossaire cohérent et adaptation culturelle.',
    prompt_text: `Tu es un traducteur technique certifié, expert en [DOMAINE TECHNIQUE].

Traduis le texte suivant de [LANGUE SOURCE] vers [LANGUE CIBLE].

Texte : [TEXTE]

Contraintes :
- Conserver la terminologie technique exacte
- Adapter les expressions idiomatiques culturellement
- Maintenir le même niveau de formalité
- Glossaire à respecter : [GLOSSAIRE si applicable]

Format de sortie :
- Traduction principale
- Notes du traducteur (ambiguïtés, choix terminologiques)
- Termes-clés conservés en VO`,
    prompt_type: 'template',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o', 'Gemini 1.5 Pro'],
    category: 'Traduction',
    subcategory: 'Technique',
    jobs: ['Développeur', 'Marketeur', 'Rédacteur'],
    use_cases: ['Documentation', 'Localisation', 'Interface', 'Support'],
    is_agent_prompt: false,
    variables: ['DOMAINE TECHNIQUE', 'LANGUE SOURCE', 'LANGUE CIBLE', 'TEXTE', 'GLOSSAIRE'],
    output_type: 'texte',
    language: 'fr',
    tags: ['Traduction', 'Localisation', 'Technique', 'Multi-langue', 'Documentation'],
    score_global: 8.7,
    usecase_scores: { Documentation: 9.0, Localisation: 8.8 },
    featured: false, verified: true,
    created_at: '2024-06-01', updated_at: '2025-01-01',
  },
  {
    id: 'lp13', name: 'Générateur de Plan d\'Affaires', slug: 'generateur-plan-affaires',
    desc_short: 'Business plan complet prêt à présenter aux banques et investisseurs.',
    desc_long: 'Ce mega-prompt génère un business plan structuré en 10 sections avec projections financières, analyse de marché et stratégie de mise en œuvre.',
    prompt_text: `Tu es un consultant en stratégie d'entreprise et expert-comptable.

Crée un business plan complet pour :
Business : [DESCRIPTION DU PROJET]
Secteur : [SECTEUR]
Marché géographique : [MARCHÉ]
Capital disponible : [CAPITAL]

Structure :
1. **Résumé exécutif** (1 page)
2. **Présentation du projet** (vision, mission, valeurs)
3. **Analyse de marché** (taille, tendances, segments)
4. **Analyse concurrentielle** (positionnement)
5. **Offre produit/service** (USP)
6. **Stratégie commerciale** (acquisition, pricing, distribution)
7. **Organisation et équipe**
8. **Plan opérationnel** (12 premiers mois)
9. **Projections financières** (P&L 3 ans, BFR, seuil de rentabilité)
10. **Financement** (besoins, sources)`,
    prompt_type: 'mega-prompt',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Business',
    subcategory: 'Création entreprise',
    jobs: ['Entrepreneur', 'Fondateur', 'Freelance'],
    use_cases: ['Business plan', 'Banque', 'Investisseur', 'Création'],
    is_agent_prompt: false,
    variables: ['DESCRIPTION DU PROJET', 'SECTEUR', 'MARCHÉ', 'CAPITAL'],
    output_type: 'liste',
    language: 'fr',
    tags: ['Business plan', 'Entrepreneur', 'Finance', 'Stratégie', 'Startup'],
    score_global: 9.0,
    usecase_scores: { 'Business plan': 9.4, Banque: 9.0 },
    featured: false, verified: true,
    created_at: '2024-06-01', updated_at: '2025-01-01',
  },
  {
    id: 'lp14', name: 'Expert Debugging & Code Review', slug: 'expert-debugging-code-review',
    desc_short: 'Analyse, débugue et améliore votre code avec explications détaillées.',
    desc_long: 'Ce prompt transforme l\'IA en reviewer senior qui identifie les bugs, failles de sécurité, problèmes de performance et anti-patterns dans votre code.',
    prompt_text: `Tu es un senior software engineer expert en debugging et code review.

Langage : [LANGAGE]
Code :
\`\`\`
[CODE]
\`\`\`

Problème décrit : [DESCRIPTION DU BUG ou "Faire un review complet"]

Analyse :
1. **Identification du problème** (cause racine)
2. **Reproduction** (conditions d'apparition)
3. **Fix recommandé** avec code corrigé
4. **Autres problèmes détectés** (bugs latents, sécurité, perf)
5. **Tests à écrire** pour prévenir la régression
6. **Refactoring suggéré** (si applicable)

Standards : OWASP Top 10, Clean Code, SOLID`,
    prompt_type: 'system',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o', 'Cursor'],
    category: 'Code',
    subcategory: 'Debug',
    jobs: ['Développeur', 'Tech Lead'],
    use_cases: ['Debug', 'Code review', 'Sécurité', 'Performance'],
    is_agent_prompt: false,
    variables: ['LANGAGE', 'CODE', 'DESCRIPTION DU BUG'],
    output_type: 'code',
    language: 'fr',
    tags: ['Debug', 'Code review', 'Sécurité', 'Développement', 'OWASP'],
    score_global: 9.3,
    usecase_scores: { Debug: 9.5, 'Code review': 9.4 },
    featured: true, verified: true,
    created_at: '2024-06-01', updated_at: '2025-01-01',
  },
  {
    id: 'lp15', name: 'Rédacteur Juridique Contrats', slug: 'redacteur-juridique-contrats',
    desc_short: 'Rédige des contrats et CGV en langage clair et juridiquement solide.',
    desc_long: 'Assistance à la rédaction de documents juridiques : CGV, contrats de prestation, NDA, mentions légales — adaptés au droit français.',
    prompt_text: `Tu es un juriste spécialisé en droit des affaires et droit du numérique français.

Type de document : [TYPE: CGV/Contrat prestation/NDA/Mentions légales]
Mon statut : [STATUT JURIDIQUE]
Secteur d'activité : [SECTEUR]
Spécificités : [CLAUSES IMPORTANTES]

Rédige le document en :
1. Respectant le droit français en vigueur (RGPD si applicable)
2. Utilisant un langage clair mais juridiquement précis
3. Incluant toutes les clauses obligatoires
4. Identifiant les points à personnaliser avec [CROCHET]
5. Ajoutant des notes explicatives pour les clauses importantes`,
    prompt_type: 'template',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Juridique',
    subcategory: 'Contrats',
    jobs: ['Entrepreneur', 'Freelance', 'Avocat'],
    use_cases: ['CGV', 'Contrat', 'NDA', 'Légal'],
    is_agent_prompt: false,
    variables: ['TYPE', 'STATUT JURIDIQUE', 'SECTEUR', 'CLAUSES IMPORTANTES'],
    output_type: 'texte',
    language: 'fr',
    tags: ['Juridique', 'Contrat', 'CGV', 'NDA', 'Légal'],
    score_global: 8.6,
    usecase_scores: { CGV: 8.9, Contrat: 8.7 },
    featured: false, verified: true,
    created_at: '2024-06-01', updated_at: '2025-01-01',
  },
  {
    id: 'lp16', name: 'Créateur de Fiches Pédagogiques', slug: 'createur-fiches-pedagogiques',
    desc_short: 'Transforme n\'importe quel sujet complexe en fiche pédagogique claire.',
    desc_long: 'Ce prompt crée des fiches d\'apprentissage structurées : concepts clés, analogies, exemples pratiques, quiz de validation et ressources pour aller plus loin.',
    prompt_text: `Tu es un pédagogue expert en design d'apprentissage et sciences cognitives.

Sujet : [SUJET]
Niveau cible : [DÉBUTANT/INTERMÉDIAIRE/AVANCÉ]
Format : [FICHE MÉMO/COURS COMPLET/QUIZ]
Durée d'apprentissage cible : [DURÉE]

Crée une fiche pédagogique :
1. **Titre accrocheur** et objectifs d'apprentissage (3 max)
2. **Prérequis** (ce qu'il faut savoir avant)
3. **Concepts fondamentaux** (3-5 points, chacun avec définition simple)
4. **Analogie** pour chaque concept abstrait
5. **Exemples concrets** du monde réel
6. **Erreurs communes** à éviter
7. **Quiz** (5 questions avec corrections)
8. **Pour aller plus loin** (3 ressources)`,
    prompt_type: 'template',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o', 'Gemini 1.5 Pro'],
    category: 'Éducation',
    subcategory: 'Pédagogie',
    jobs: ['Formateur', 'Enseignant', 'Créateur de contenu'],
    use_cases: ['Formation', 'E-learning', 'Documentation', 'Onboarding'],
    is_agent_prompt: false,
    variables: ['SUJET', 'DÉBUTANT/INTERMÉDIAIRE/AVANCÉ', 'FICHE MÉMO/COURS COMPLET/QUIZ', 'DURÉE'],
    output_type: 'liste',
    language: 'fr',
    tags: ['Pédagogie', 'Formation', 'E-learning', 'Fiche', 'Éducation'],
    score_global: 8.8,
    usecase_scores: { Formation: 9.1, 'E-learning': 8.9 },
    featured: false, verified: true,
    created_at: '2024-06-01', updated_at: '2025-01-01',
  },
  {
    id: 'lp17', name: 'Analyste Financier Personnel', slug: 'analyste-financier-personnel',
    desc_short: 'Analyse votre situation financière et crée un plan d\'optimisation.',
    desc_long: 'Ce prompt analyse vos revenus, dépenses et patrimoine pour construire une stratégie d\'épargne, d\'investissement et d\'optimisation fiscale personnalisée.',
    prompt_text: `Tu es un conseiller en gestion de patrimoine indépendant (CGP) certifié.

Ma situation :
- Revenus nets mensuels : [REVENUS]
- Dépenses fixes : [DÉPENSES FIXES]
- Épargne actuelle : [ÉPARGNE]
- Objectifs : [OBJECTIFS: retraite/immobilier/liberté financière]
- Horizon : [HORIZON TEMPS]
- Appétit au risque : [FAIBLE/MOYEN/ÉLEVÉ]

Analyse et plan :
1. **Diagnostic** de ma situation actuelle (ratio d'épargne, dépenses)
2. **Objectifs chiffrés** (combien épargner chaque mois)
3. **Allocation** recommandée (épargne de précaution, investissement, immobilier)
4. **Optimisation fiscale** (PEA, AV, PER, défiscalisation)
5. **Plan d'action** sur 12 mois (étapes concrètes)
6. **Risques** et plans B`,
    prompt_type: 'agent',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Finance',
    subcategory: 'Patrimoine',
    jobs: ['Salarié', 'Entrepreneur', 'Freelance'],
    use_cases: ['Budget', 'Investissement', 'Épargne', 'Retraite'],
    is_agent_prompt: true,
    variables: ['REVENUS', 'DÉPENSES FIXES', 'ÉPARGNE', 'OBJECTIFS', 'HORIZON TEMPS'],
    output_type: 'liste',
    language: 'fr',
    tags: ['Finance', 'Budget', 'Investissement', 'Patrimoine', 'Épargne'],
    score_global: 8.7,
    usecase_scores: { Budget: 9.0, Investissement: 8.8 },
    featured: false, verified: true,
    created_at: '2024-06-01', updated_at: '2025-01-01',
  },
  {
    id: 'lp18', name: 'Générateur d\'Emails Cold Outreach', slug: 'generateur-emails-cold-outreach',
    desc_short: 'Séquences d\'emails de prospection B2B à fort taux de réponse.',
    desc_long: 'Ce prompt génère des séquences d\'emails froids personnalisées pour la prospection B2B : approche Spear, valeur ajoutée et relances non-intrusives.',
    prompt_text: `Tu es un expert en cold outreach B2B avec un taux de réponse moyen de 15%.

Contexte :
Prospect : [PROFIL DU PROSPECT]
Mon offre : [OFFRE]
Valeur principale : [BÉNÉFICE CLÉ]
Ton de marque : [DÉCONTRACTÉ/PROFESSIONNEL/DIRECT]

Génère une séquence de 4 emails :
Email 1 (J0) : Approche initiale ultra-personnalisée (5 lignes max)
Email 2 (J3) : Valeur ajoutée — partage une ressource utile
Email 3 (J7) : Angle différent — challenger l'approche actuelle
Email 4 (J14) : Rupture — dernier email respectueux

Pour chaque email :
- Objet (2 variations)
- Corps (< 100 mots)
- CTA unique et clair`,
    prompt_type: 'template',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Sales',
    subcategory: 'Prospection',
    jobs: ['Sales', 'Growth Hacker', 'Entrepreneur'],
    use_cases: ['Prospection B2B', 'Cold email', 'Pipeline'],
    is_agent_prompt: false,
    variables: ['PROFIL DU PROSPECT', 'OFFRE', 'BÉNÉFICE CLÉ', 'DÉCONTRACTÉ/PROFESSIONNEL/DIRECT'],
    output_type: 'email',
    language: 'fr',
    tags: ['Cold email', 'Prospection', 'B2B', 'Sales', 'Outreach'],
    score_global: 9.0,
    usecase_scores: { 'Prospection B2B': 9.3, 'Cold email': 9.2 },
    featured: true, verified: true,
    created_at: '2024-06-01', updated_at: '2025-01-01',
  },
  {
    id: 'lp19', name: 'Stratège Réseaux Sociaux', slug: 'stratege-reseaux-sociaux',
    desc_short: 'Plan de contenu mensuel complet pour tous vos réseaux avec calendrier.',
    desc_long: 'Ce prompt génère une stratégie social media complète avec calendrier éditorial 30 jours, formats par plateforme et métriques de suivi.',
    prompt_text: `Tu es un Social Media Manager expert avec 8 ans d'expérience.

Brand : [MARQUE/BUSINESS]
Plateformes actives : [INSTAGRAM/LINKEDIN/TIKTOK/X/YOUTUBE]
Audience : [AUDIENCE]
Objectif principal : [NOTORIÉTÉ/ENGAGEMENT/LEADS/VENTES]
Ressources dispo : [FRÉQUENCE DE PUBLICATION SOUHAITÉE]

Fournis :
1. **Positionnement** éditorial (piliers de contenu, ton)
2. **Calendrier 30 jours** (type de post, heure optimale, description)
3. **Templates de posts** × 5 (un par format : carrousel, Reel, témoignage, educational, storytelling)
4. **Hashtag strategy** par plateforme
5. **KPIs** à tracker (avec objectifs chiffrés réalistes)`,
    prompt_type: 'mega-prompt',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Marketing',
    subcategory: 'Social Media',
    jobs: ['Community Manager', 'Marketeur', 'Entrepreneur'],
    use_cases: ['Social media', 'Calendrier éditorial', 'Community management'],
    is_agent_prompt: false,
    variables: ['MARQUE/BUSINESS', 'INSTAGRAM/LINKEDIN/TIKTOK/X/YOUTUBE', 'AUDIENCE', 'OBJECTIF'],
    output_type: 'liste',
    language: 'fr',
    tags: ['Social media', 'Calendrier', 'Instagram', 'LinkedIn', 'TikTok'],
    score_global: 8.9,
    usecase_scores: { 'Social media': 9.2, 'Calendrier éditorial': 9.0 },
    featured: false, verified: true,
    created_at: '2024-06-01', updated_at: '2025-01-01',
  },
  {
    id: 'lp20', name: 'Orchestrateur d\'Agents IA', slug: 'orchestrateur-agents-ia',
    desc_short: 'Système multi-agents qui décompose et délègue des tâches complexes.',
    desc_long: 'Ce prompt agent crée un système d\'orchestration multi-agents : un chef d\'orchestre qui décompose les tâches et coordonne des sous-agents spécialisés.',
    prompt_text: `Tu es un orchestrateur d'agents IA. Ton rôle : décomposer les tâches complexes et les déléguer aux bons agents.

Objectif principal : [OBJECTIF COMPLEXE]

Agents disponibles :
- Agent Recherche : collecte d'informations et veille
- Agent Analyse : traitement et synthèse des données
- Agent Rédaction : production de contenu
- Agent Exécution : actions concrètes (code, emails, etc.)

Ta méthode :
1. Décompose la tâche en sous-tâches atomiques
2. Pour chaque sous-tâche, précise : agent responsable, input requis, output attendu, dépendances
3. Identifie le chemin critique (tâches séquentielles vs parallèles)
4. Définis les critères de validation pour chaque étape
5. Prévois les points de synchronisation

Commence par afficher le plan d'exécution, puis exécute étape par étape.`,
    prompt_type: 'agent',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o', 'Gemini 1.5 Pro'],
    category: 'Agents IA',
    subcategory: 'Orchestration',
    jobs: ['Développeur', 'Product Manager', 'Entrepreneur'],
    use_cases: ['Multi-agents', 'Orchestration', 'Automatisation', 'Workflow'],
    is_agent_prompt: true,
    variables: ['OBJECTIF COMPLEXE'],
    output_type: 'liste',
    language: 'fr',
    tags: ['Agent', 'Orchestration', 'Multi-agents', 'IA', 'Workflow'],
    score_global: 9.2,
    usecase_scores: { 'Multi-agents': 9.5, Orchestration: 9.3 },
    featured: true, verified: true,
    created_at: '2024-06-01', updated_at: '2025-01-01',
  },
  {
    id: 'lp9', name: 'Rédacteur LinkedIn Expert', slug: 'redacteur-linkedin-expert',
    desc_short: 'Posts LinkedIn viraux avec accroche + structure + CTA optimisés.',
    desc_long: 'Ce prompt génère des posts LinkedIn engageants qui génèrent de l\'interaction : format carrousel, storytelling, data ou opinion forte.',
    prompt_text: `Tu es un créateur de contenu LinkedIn avec 50K+ abonnés.

Sujet : [SUJET]
Format : [STORYTELLING/DATA/OPINION/LISTE]
Objectif : [VISIBILITÉ/LEADS/AUTORITÉ]

Structure :
1. **Hook** (première ligne critique — doit stopper le scroll)
2. **Corps** avec sauts de ligne et emojis stratégiques
3. **Takeaway** actionnable
4. **CTA** discret

Longueur : 150-300 mots
Émojis : utilisés avec parcimonie (max 5)`,
    prompt_type: 'template',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Contenu',
    subcategory: 'LinkedIn',
    jobs: ['Personal branding', 'Marketeur', 'Entrepreneur'],
    use_cases: ['LinkedIn', 'Personal branding', 'B2B marketing'],
    is_agent_prompt: false,
    variables: ['SUJET', 'STORYTELLING/DATA/OPINION/LISTE', 'VISIBILITÉ/LEADS/AUTORITÉ'],
    output_type: 'texte',
    language: 'fr',
    tags: ['LinkedIn', 'Post', 'Personal branding', 'Contenu', 'Viral'],
    score_global: 8.8,
    usecase_scores: { LinkedIn: 9.2, 'Personal branding': 9.0 },
    featured: false, verified: true,
    created_at: '2024-01-01', updated_at: '2025-01-01',
  },

  // ── NEW PROMPTS ────────────────────────────────────────────────────────────

  {
    id: 'lp21', name: 'Rédacteur Article de Blog SEO', slug: 'redacteur-article-blog-seo',
    desc_short: 'Rédige des articles de blog longs, optimisés SEO et engageants.',
    desc_long: 'Ce prompt génère des articles de blog complets : structure H1/H2/H3, introduction hook, contenu evergreen, maillage interne et meta SEO — prêts à publier.',
    prompt_text: `Tu es un rédacteur web SEO senior avec 10 ans d'expérience.

Sujet : [SUJET DE L'ARTICLE]
Mot-clé principal : [MOT-CLÉ]
Mots-clés secondaires : [MCC 1], [MCC 2], [MCC 3]
Longueur cible : [1500/2500/4000] mots
Audience : [AUDIENCE]
Ton : [INFORMATIF/CONVERSATIONNEL/EXPERT]

Rédige un article complet :
1. **Titre H1** accrocheur avec mot-clé principal
2. **Meta description** (155 caractères max, avec CTA)
3. **Introduction** (hook + problème + promesse, 150 mots)
4. **Plan détaillé** (H2/H3 avec mots-clés secondaires intégrés)
5. **Corps de l'article** (contenu complet, chiffres, exemples)
6. **FAQ** (5 questions issues des "People Also Ask")
7. **Conclusion** + CTA

Règles SEO :
- Densité mot-clé principal : 1-2%
- Au moins 3 liens internes suggérés [LIEN: ancre]
- Paragraphes courts (3-4 lignes max)`,
    prompt_type: 'template',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o', 'Gemini 1.5 Pro'],
    category: 'SEO',
    subcategory: 'Rédaction',
    jobs: ['Rédacteur web', 'Marketeur', 'Blogueur'],
    use_cases: ['Article blog', 'SEO', 'Contenu evergreen'],
    is_agent_prompt: false,
    variables: ["SUJET DE L'ARTICLE", 'MOT-CLÉ', 'MCC 1', 'MCC 2', 'LONGUEUR', 'AUDIENCE', 'TON'],
    output_type: 'rapport',
    language: 'fr',
    tags: ['SEO', 'Blog', 'Rédaction', 'Contenu', 'Article'],
    score_global: 9.1,
    usecase_scores: { 'Article blog': 9.3, SEO: 9.2 },
    featured: true, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp22', name: 'DRH — Fiche de Poste & Offre d\'Emploi', slug: 'drh-fiche-poste-offre-emploi',
    desc_short: 'Génère des fiches de poste précises et des offres d\'emploi attractives.',
    desc_long: 'Ce prompt crée des fiches de poste RH complètes avec missions, compétences requises, profil idéal et une offre d\'emploi engageante adaptée aux jobboards.',
    prompt_text: `Tu es un DRH expérimenté spécialisé en recrutement tech et startup.

Poste à pourvoir : [INTITULÉ DU POSTE]
Entreprise : [ENTREPRISE] — Secteur : [SECTEUR]
Type de contrat : [CDI/CDD/FREELANCE]
Lieu : [LIEU] / [PRÉSENTIEL/HYBRIDE/REMOTE]
Salaire : [FOURCHETTE]
Équipe : [DESCRIPTION ÉQUIPE]

Génère :
1. **Fiche de poste interne** (contexte, missions × 8, compétences requises, avantages)
2. **Offre d\'emploi externe** (accroche marque employeur, missions clés × 5, profil recherché, process de recrutement)
3. **Grille d\'évaluation candidats** (critères notés 1-5)
4. **Questions d\'entretien** spécifiques au poste (10 questions)
5. **Red flags** à surveiller pendant l\'entretien`,
    prompt_type: 'template',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'RH',
    subcategory: 'Recrutement',
    jobs: ['DRH', 'Responsable RH', 'Manager'],
    use_cases: ['Recrutement', 'Fiche de poste', 'Offre emploi'],
    is_agent_prompt: false,
    variables: ['INTITULÉ DU POSTE', 'ENTREPRISE', 'SECTEUR', 'TYPE DE CONTRAT', 'LIEU', 'SALAIRE'],
    output_type: 'liste',
    language: 'fr',
    tags: ['RH', 'Recrutement', 'Fiche de poste', 'Offre emploi', 'Entretien'],
    score_global: 8.9,
    usecase_scores: { Recrutement: 9.2, 'Fiche de poste': 9.0 },
    featured: false, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp23', name: 'Analyste Financier — Valorisation Startup', slug: 'analyste-financier-valorisation-startup',
    desc_short: 'Calcule la valorisation d\'une startup avec plusieurs méthodes reconnues.',
    desc_long: 'Ce prompt applique les méthodes de valorisation DCF, comparables, Berkus et VC Method pour estimer la valeur d\'une startup early-stage ou growth.',
    prompt_text: `Tu es un analyste financier spécialisé en capital-risque et valorisation de startups.

Startup : [NOM]
Secteur : [SECTEUR]
Stade : [PRE-SEED / SEED / SÉRIE A]
ARR actuel : [ARR]
Croissance MoM : [%]
Marché adressable (TAM) : [TAM]
Équipe fondatrice : [DESCRIPTION]
Dernière levée : [MONTANT/DATE ou N/A]

Calcule et explique :
1. **Méthode des comparables** (multiples ARR du secteur)
2. **DCF simplifié** (projections 5 ans, taux d'actualisation 30-40%)
3. **Méthode Berkus** (scoring 5 critères × 500K€)
4. **VC Method** (valeur de sortie × dilution)
5. **Valorisation recommandée** (fourchette pre-money raisonnée)
6. **Facteurs d\'ajustement** (risques, avantages compétitifs)
7. **Tableau récapitulatif** des 4 méthodes`,
    prompt_type: 'user',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Finance',
    subcategory: 'Valorisation',
    jobs: ['Entrepreneur', 'Fondateur', 'Investisseur'],
    use_cases: ['Levée de fonds', 'Valorisation', 'Due diligence'],
    is_agent_prompt: false,
    variables: ['NOM', 'SECTEUR', 'STADE', 'ARR', 'CROISSANCE', 'TAM'],
    output_type: 'tableau',
    language: 'fr',
    tags: ['Finance', 'Valorisation', 'Startup', 'VC', 'Investissement'],
    score_global: 9.0,
    usecase_scores: { 'Levée de fonds': 9.3, Valorisation: 9.1 },
    featured: true, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp24', name: 'Expert Service Client — Réponse Réclamation', slug: 'expert-service-client-reclamation',
    desc_short: 'Rédige des réponses empathiques et professionnelles aux réclamations clients.',
    desc_long: 'Ce prompt génère des réponses aux réclamations clients qui désamorcent les conflits, préservent la relation et transforment l\'insatisfaction en fidélité.',
    prompt_text: `Tu es un expert en relation client avec 12 ans d'expérience en gestion des réclamations.

Réclamation client : [MESSAGE DU CLIENT]
Contexte : [CONTEXTE/HISTORIQUE]
Notre politique : [POLITIQUE DE REMBOURSEMENT/GESTE COMMERCIAL POSSIBLE]
Canal : [EMAIL/CHAT/COURRIER]
Niveau d'urgence : [NORMAL/URGENT/ESCALADE]

Rédige une réponse qui :
1. **Accuse réception** et valide l'émotion (sans admettre la faute prématurément)
2. **Reformule** le problème pour montrer qu'on a compris
3. **Explique** la situation (si pertinent) sans se justifier
4. **Propose une solution concrète** (geste commercial si applicable)
5. **Rassure** sur les mesures prises pour éviter la récidive
6. **Conclut** positivement (fidélisation)

Ton : empathique, professionnel, solution-oriented
Format : email structuré, paragraphes courts`,
    prompt_type: 'template',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Service Client',
    subcategory: 'Réclamations',
    jobs: ['Service client', 'Manager', 'Community Manager'],
    use_cases: ['Réclamation', 'Email client', 'Fidélisation'],
    is_agent_prompt: false,
    variables: ['MESSAGE DU CLIENT', 'CONTEXTE', 'POLITIQUE', 'CANAL', 'NIVEAU D\'URGENCE'],
    output_type: 'email',
    language: 'fr',
    tags: ['Service client', 'Réclamation', 'Email', 'Fidélisation', 'CRM'],
    score_global: 8.8,
    usecase_scores: { Réclamation: 9.1, 'Email client': 9.0 },
    featured: false, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp25', name: 'Stratège Marketing — Plan de Lancement Produit', slug: 'stratege-marketing-lancement-produit',
    desc_short: 'Plan de lancement GTM complet pour maximiser l\'impact de votre produit.',
    desc_long: 'Ce mega-prompt génère une stratégie Go-to-Market complète : segmentation, messaging, canaux d\'acquisition, budget et timeline de lancement.',
    prompt_text: `Tu es un CMO (Chief Marketing Officer) avec 15 ans d'expérience en lancement de produits B2B et B2C.

Produit : [PRODUIT]
USP (proposition unique) : [USP]
Cible principale : [SEGMENT CIBLE]
Budget marketing : [BUDGET]
Date de lancement : [DATE]
Objectif 90 jours : [OBJECTIF CHIFFRÉ]

Plan GTM complet :
1. **Segmentation & Personas** (3 personas détaillés)
2. **Messaging Framework** (value prop par persona, objections/réponses)
3. **Mix de canaux** (paid, owned, earned — budget par canal)
4. **Stratégie de contenu pre-launch** (waitlist, teaser, early access)
5. **Séquence de lancement** J-30 / J-7 / J0 / J+7 / J+30
6. **Stratégie de relations presse** (pitch media, influenceurs)
7. **Métriques de succès** et reporting framework
8. **Risques** et plans de contingence`,
    prompt_type: 'mega-prompt',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Marketing',
    subcategory: 'Lancement',
    jobs: ['CMO', 'Product Manager', 'Entrepreneur'],
    use_cases: ['Lancement produit', 'GTM', 'Marketing'],
    is_agent_prompt: false,
    variables: ['PRODUIT', 'USP', 'SEGMENT CIBLE', 'BUDGET', 'DATE', 'OBJECTIF'],
    output_type: 'rapport',
    language: 'fr',
    tags: ['Marketing', 'GTM', 'Lancement', 'Stratégie', 'Produit'],
    score_global: 9.3,
    usecase_scores: { 'Lancement produit': 9.5, GTM: 9.3 },
    featured: true, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp26', name: 'Consultant Data Analyst — Rapport KPI', slug: 'consultant-data-analyst-rapport-kpi',
    desc_short: 'Transforme un tableau de données brutes en rapport analytique exécutif.',
    desc_long: 'Ce prompt analyse n\'importe quel dataset ou export CSV/Excel et produit un rapport avec tendances, anomalies, corrélations et recommandations priorisées.',
    prompt_text: `Tu es un Data Analyst senior spécialisé en business analytics.

Données brutes : [DONNÉES / TABLEAU / EXPORT CSV]
Période analysée : [PÉRIODE]
Contexte métier : [CONTEXTE]
Audience du rapport : [DIRECTION/OPÉRATIONNEL/TECHNIQUE]

Produis un rapport analytique :
1. **Vue d'ensemble** — chiffres clés sur la période
2. **Tendances** — évolutions significatives (avec % et deltas)
3. **Anomalies** — valeurs aberrantes et explication probable
4. **Corrélations** identifiées (variables liées)
5. **Segmentation** — performance par sous-groupe pertinent
6. **Prévisions** — extrapolation des tendances (avec niveau de confiance)
7. **Top 5 insights** actionnables classés par priorité
8. **Visualisations suggérées** (quel graphe pour chaque point)

Format : bullet points + tableaux comparatifs`,
    prompt_type: 'system',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o', 'Gemini 1.5 Pro'],
    category: 'Analyse',
    subcategory: 'Data',
    jobs: ['Data Analyst', 'Business Analyst', 'Manager'],
    use_cases: ['Rapport mensuel', 'Analyse de données', 'Dashboard'],
    is_agent_prompt: false,
    variables: ['DONNÉES', 'PÉRIODE', 'CONTEXTE', 'AUDIENCE'],
    output_type: 'rapport',
    language: 'fr',
    tags: ['Data', 'Analyse', 'KPI', 'Rapport', 'Business Intelligence'],
    score_global: 9.0,
    usecase_scores: { 'Rapport mensuel': 9.2, 'Analyse de données': 9.1 },
    featured: false, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp27', name: 'Expert RH — Évaluation Annuelle', slug: 'expert-rh-evaluation-annuelle',
    desc_short: 'Structure des entretiens annuels équitables et des plans de développement.',
    desc_long: 'Ce prompt aide les managers à préparer et conduire des entretiens annuels structurés : feedback 360, objectifs SMART, plan de développement et fidélisation.',
    prompt_text: `Tu es un expert en management et développement des talents avec 15 ans d'expérience.

Collaborateur : [NOM/POSTE]
Période évaluée : [PÉRIODE]
Objectifs définis l'an dernier : [OBJECTIFS N-1]
Réalisations notables : [RÉALISATIONS]
Points de progression observés : [AXES PROGRÈS]

Génère le dossier d\'évaluation annuelle :
1. **Grille d\'évaluation** (compétences métier + soft skills, notée 1-5 avec justification)
2. **Bilan objectifs N-1** (atteints / partiels / non atteints avec contexte)
3. **Points forts** à valoriser (top 3 avec exemples concrets)
4. **Axes de développement** (top 2 avec plan d\'action)
5. **Objectifs SMART N+1** (5 objectifs mesurables)
6. **Plan de développement** (formations, mentoring, nouvelles responsabilités)
7. **Questions d\'entretien** pour engager le dialogue (10 questions ouvertes)
8. **Synthèse RH** (1 paragraphe pour le dossier)`,
    prompt_type: 'template',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'RH',
    subcategory: 'Management',
    jobs: ['Manager', 'DRH', 'Responsable RH'],
    use_cases: ['Entretien annuel', 'Évaluation', 'Plan de développement'],
    is_agent_prompt: false,
    variables: ['NOM/POSTE', 'PÉRIODE', 'OBJECTIFS N-1', 'RÉALISATIONS', 'AXES PROGRÈS'],
    output_type: 'liste',
    language: 'fr',
    tags: ['RH', 'Évaluation', 'Management', 'SMART', 'Développement'],
    score_global: 8.8,
    usecase_scores: { 'Entretien annuel': 9.1, Évaluation: 8.9 },
    featured: false, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp28', name: 'Avocat IA — Analyse Contrat', slug: 'avocat-ia-analyse-contrat',
    desc_short: 'Analyse tout contrat et identifie les clauses risquées et les protections manquantes.',
    desc_long: 'Ce prompt effectue une revue juridique détaillée de contrats : identification des déséquilibres, clauses abusives, risques et recommandations d\'amendement.',
    prompt_text: `Tu es un avocat d'affaires spécialisé en droit des contrats (droit français/européen).

Contrat à analyser : [CONTRAT COMPLET]
Ma position : [PARTIE A / PARTIE B]
Contexte : [CONTEXTE DE LA RELATION COMMERCIALE]
Points d'attention particuliers : [POINTS SPÉCIFIQUES si applicable]

Analyse juridique complète :
1. **Résumé exécutif** (type de contrat, parties, objet, durée, points clés)
2. **Clauses favorables** à ma position (avec numéro d'article)
3. **Clauses risquées** ou déséquilibrées (avec niveau de risque : faible/moyen/élevé)
4. **Clauses manquantes** importantes (protection absente)
5. **Obligations** de chaque partie (tableau synthétique)
6. **Résiliation** — conditions et pénalités
7. **Recommandations d'amendement** (formulation suggérée pour chaque point)
8. **Score de protection globale** /10 avec justification

⚠️ Note : Cette analyse est indicative, consulter un avocat pour les décisions finales.`,
    prompt_type: 'system',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Juridique',
    subcategory: 'Analyse contrat',
    jobs: ['Entrepreneur', 'Juriste', 'Directeur Achat'],
    use_cases: ['Analyse contrat', 'Due diligence', 'Négociation'],
    is_agent_prompt: false,
    variables: ['CONTRAT', 'MA POSITION', 'CONTEXTE', 'POINTS SPÉCIFIQUES'],
    output_type: 'rapport',
    language: 'fr',
    tags: ['Juridique', 'Contrat', 'Analyse', 'Risque', 'Légal'],
    score_global: 9.0,
    usecase_scores: { 'Analyse contrat': 9.3, 'Due diligence': 9.1 },
    featured: true, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp29', name: 'Copywriter Publicité Google & Meta Ads', slug: 'copywriter-publicite-google-meta-ads',
    desc_short: 'Génère des accroches et textes publicitaires optimisés pour Google et Meta.',
    desc_long: 'Ce prompt crée des variantes de textes publicitaires pour les campagnes Google Ads (RSA) et Meta Ads (Facebook/Instagram) avec titres, descriptions et CTAs testés.',
    prompt_text: `Tu es un expert en paid advertising avec 8 ans d'expérience sur Google Ads et Meta Ads.

Produit/Service : [PRODUIT]
Audience cible : [AUDIENCE]
Bénéfice principal : [BÉNÉFICE]
Budget mensuel : [BUDGET]
Objectif : [LEADS/VENTES/NOTORIÉTÉ]
Landing page : [URL ou description]

Génère :

**GOOGLE ADS — RSA (Responsive Search Ads)**
- 15 titres (max 30 caractères chacun)
- 4 descriptions (max 90 caractères)
- 2 appels à l'action

**META ADS — 3 variantes complètes**
Variante 1 (Problème-Solution) :
- Accroche : (max 40 mots)
- Corps : (100-150 mots)
- CTA : (bouton)

Variante 2 (Témoignage/Social Proof)
Variante 3 (Offre limitée/Urgence)

**Recommandations A/B test** (quelle variante lancer en premier et pourquoi)`,
    prompt_type: 'template',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Marketing',
    subcategory: 'Publicité',
    jobs: ['Media Buyer', 'Marketeur', 'Entrepreneur'],
    use_cases: ['Google Ads', 'Meta Ads', 'Copywriting pub'],
    is_agent_prompt: false,
    variables: ['PRODUIT', 'AUDIENCE', 'BÉNÉFICE', 'BUDGET', 'OBJECTIF'],
    output_type: 'liste',
    language: 'fr',
    tags: ['Google Ads', 'Meta Ads', 'Publicité', 'Copywriting', 'Paid'],
    score_global: 9.2,
    usecase_scores: { 'Google Ads': 9.4, 'Meta Ads': 9.3 },
    featured: true, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp30', name: 'Stratège Contenu — Funnel de Conversion', slug: 'stratege-contenu-funnel-conversion',
    desc_short: 'Mappe le contenu idéal sur chaque étape du funnel TOFU/MOFU/BOFU.',
    desc_long: 'Ce prompt conçoit une stratégie de contenu complète alignée sur le funnel : contenu de notoriété, d\'éducation et de conversion avec format et distribution par canal.',
    prompt_text: `Tu es un Content Strategist expert en inbound marketing et funnel de conversion.

Business : [BUSINESS]
Produit/Service : [PRODUIT]
Persona principal : [PERSONA]
Canaux disponibles : [BLOG/LINKEDIN/EMAIL/YOUTUBE/PODCAST]

Crée la stratégie de contenu par étape du funnel :

**TOFU — Notoriété (Top of Funnel)**
- 5 sujets d'articles / vidéos (problèmes perçus)
- Format recommandé + canal de distribution

**MOFU — Considération (Middle of Funnel)**
- 4 contenus éducatifs (comparatifs, guides, cas d'usage)
- Lead magnet recommandé (type + sujet)
- Email nurturing : 5 emails (sujets + objectif de chaque)

**BOFU — Conversion (Bottom of Funnel)**
- 3 contenus de décision (témoignages, démos, ROI)
- Séquence de conversion (email × 3)
- Page de vente / landing page : structure recommandée

**Métriques** par étape (taux de passage entre étapes)`,
    prompt_type: 'mega-prompt',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Marketing',
    subcategory: 'Contenu',
    jobs: ['Content Manager', 'Marketeur', 'Inbound'],
    use_cases: ['Stratégie contenu', 'Funnel', 'Inbound marketing'],
    is_agent_prompt: false,
    variables: ['BUSINESS', 'PRODUIT', 'PERSONA', 'CANAUX'],
    output_type: 'liste',
    language: 'fr',
    tags: ['Contenu', 'Funnel', 'TOFU', 'MOFU', 'BOFU', 'Inbound'],
    score_global: 9.1,
    usecase_scores: { 'Stratégie contenu': 9.3, Funnel: 9.2 },
    featured: false, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp31', name: 'Développeur — Générateur de Tests Unitaires', slug: 'developpeur-generateur-tests-unitaires',
    desc_short: 'Génère une suite de tests unitaires exhaustive pour tout morceau de code.',
    desc_long: 'Ce prompt analyse votre code et génère des tests unitaires complets : happy path, edge cases, cas d\'erreur — avec mocking et coverage maximisé.',
    prompt_text: `Tu es un ingénieur QA senior expert en test-driven development (TDD).

Langage / Framework de test : [LANGAGE + FRAMEWORK: ex. TypeScript + Vitest]
Code à tester :
\`\`\`
[CODE]
\`\`\`

Génère une suite de tests complète :
1. **Tests happy path** (flux nominal — tous les cas normaux)
2. **Tests edge cases** (limites : 0, null, undefined, chaînes vides, valeurs max)
3. **Tests d'erreurs** (exceptions attendues, codes d'erreur)
4. **Tests d'intégration** (si applicable — mocking des dépendances)
5. **Coverage estimée** (% lignes, branches, fonctions)

Pour chaque test :
- Nom descriptif (describe + it/test)
- Setup / arrange
- Action
- Assertion claire
- Commentaire sur l'intention

Utilise les best practices : AAA pattern, noms expressifs, un seul assert par test si possible.`,
    prompt_type: 'system',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o', 'Cursor'],
    category: 'Code',
    subcategory: 'Tests',
    jobs: ['Développeur', 'QA Engineer', 'Tech Lead'],
    use_cases: ['Tests unitaires', 'TDD', 'Code quality'],
    is_agent_prompt: false,
    variables: ['LANGAGE + FRAMEWORK', 'CODE'],
    output_type: 'code',
    language: 'fr',
    tags: ['Tests', 'TDD', 'Qualité', 'Développement', 'Unit testing'],
    score_global: 9.2,
    usecase_scores: { 'Tests unitaires': 9.5, TDD: 9.2 },
    featured: true, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp32', name: 'Expert Email Marketing — Séquence Onboarding', slug: 'expert-email-marketing-sequence-onboarding',
    desc_short: 'Séquence d\'onboarding email en 7 étapes pour activer et retenir vos nouveaux utilisateurs.',
    desc_long: 'Ce prompt crée une séquence d\'emails d\'onboarding complète : du welcome email à l\'activation en 30 jours, avec chaque email optimisé pour l\'engagement.',
    prompt_text: `Tu es un expert en email marketing et product-led growth, spécialisé en onboarding SaaS.

Produit : [NOM DU PRODUIT]
Valeur principale : [PROMESSE CORE]
Étape d'activation clé : [MOMENT AHA — ex. "créer son premier projet"]
Audience : [TYPE D'UTILISATEUR]

Crée une séquence onboarding de 7 emails :

Email 1 — J0 : Welcome (chaleureux, humain, établit les attentes)
Email 2 — J1 : Quick win (guider vers la première valeur en 5 min)
Email 3 — J3 : Feature discovery (fonctionnalité peu connue mais puissante)
Email 4 — J7 : Social proof (témoignage + cas d'usage similaire)
Email 5 — J10 : Obstacle removal (FAQ, ressources, lien support)
Email 6 — J14 : Engagement check (question directe + segmentation)
Email 7 — J30 : Upgrade / Upsell (si freemium → payant)

Pour chaque email :
- Objet (+ variante A/B)
- Préheader
- Corps complet (200 mots max)
- CTA principal`,
    prompt_type: 'chain',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Email',
    subcategory: 'Onboarding',
    jobs: ['Product Manager', 'Growth', 'Email Marketer'],
    use_cases: ['Onboarding', 'Activation', 'Rétention SaaS'],
    is_agent_prompt: false,
    variables: ['NOM DU PRODUIT', 'PROMESSE CORE', 'MOMENT AHA', 'TYPE D\'UTILISATEUR'],
    output_type: 'email',
    language: 'fr',
    tags: ['Email', 'Onboarding', 'SaaS', 'Activation', 'Rétention'],
    score_global: 9.1,
    usecase_scores: { Onboarding: 9.4, Activation: 9.2 },
    featured: true, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp33', name: 'Consultant Stratégie — OKR Framework', slug: 'consultant-strategie-okr-framework',
    desc_short: 'Définit des OKR trimestriels alignés sur la vision avec key results mesurables.',
    desc_long: 'Ce prompt accompagne la définition d\'OKR (Objectives and Key Results) pour une équipe ou une entreprise : alignement stratégique, ambition calibrée et métriques claires.',
    prompt_text: `Tu es un consultant en management stratégique certifié OKR, ex-Google et Spotify.

Entreprise/Équipe : [NOM]
Vision long terme : [VISION 3-5 ANS]
Priorités du trimestre : [PRIORITÉS]
Équipes concernées : [ÉQUIPES]
Période : [Q1/Q2/Q3/Q4 ANNÉE]

Définis le framework OKR :

**Niveau Entreprise (2-3 Objectives)**
Pour chaque Objective :
- Formulation inspirante et qualitative
- 3-4 Key Results (KRs) mesurables et ambitieux
- Score de départ / score cible
- Owner responsable

**Niveau Équipe** (1 objective par équipe mentionnée, avec KRs cohérents)

**Règles OKR appliquées :**
- Objectifs qualitatifs et motivants
- KRs 100% quantifiables (chiffre + date)
- Stretch goals (70% atteint = succès)
- Pas de tâches dans les KRs

**Calendrier de suivi** (check-ins hebdo, reviews mensuelles, retrospective trimestrielle)`,
    prompt_type: 'template',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Stratégie',
    subcategory: 'Management',
    jobs: ['CEO', 'Manager', 'Product Manager'],
    use_cases: ['OKR', 'Planning stratégique', 'Management'],
    is_agent_prompt: false,
    variables: ['NOM', 'VISION', 'PRIORITÉS', 'ÉQUIPES', 'PÉRIODE'],
    output_type: 'liste',
    language: 'fr',
    tags: ['OKR', 'Stratégie', 'Management', 'Objectifs', 'Planning'],
    score_global: 9.0,
    usecase_scores: { OKR: 9.3, 'Planning stratégique': 9.1 },
    featured: false, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp34', name: 'Ghostwriter Twitter/X — Thread Viral', slug: 'ghostwriter-twitter-thread-viral',
    desc_short: 'Crée des threads X (Twitter) structurés qui génèrent engagement et abonnés.',
    desc_long: 'Ce prompt génère des threads Twitter/X complets : du tweet d\'accroche au CTA final, en passant par la structure narrative qui maximise les retweets et abonnements.',
    prompt_text: `Tu es un créateur de contenu X (Twitter) avec 100K+ abonnés et des threads régulièrement viraux.

Sujet : [SUJET DU THREAD]
Angle : [CONTRE-INTUITIF/LISTE/STORYTELLING/TUTORIAL]
Audience : [AUDIENCE]
Objectif : [ABONNÉS/ENGAGEMENT/TRAFIC]

Rédige un thread de 10-15 tweets :

Tweet 1 — Hook (accroche) :
→ Promesse choc ou stat surprenante (max 280 char)

Tweets 2-12 — Corps :
→ Chaque tweet = 1 idée autonome
→ Connecteurs entre tweets ("Mais voilà le truc :", "Et c'est là que ça devient intéressant :")
→ Mix : liste numérotée, mini-story, conseil actionnable

Tweet 13 — Twist / révélation :
→ La punchline ou l'insight le plus fort

Tweet 14 — Récap :
→ Résumé en bullet points (pour ceux qui scrollent)

Tweet 15 — CTA :
→ Follow + lien / question d'engagement`,
    prompt_type: 'template',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Contenu',
    subcategory: 'Social Media',
    jobs: ['Créateur de contenu', 'Entrepreneur', 'Personal branding'],
    use_cases: ['Thread Twitter', 'Contenu viral', 'Personal branding'],
    is_agent_prompt: false,
    variables: ['SUJET DU THREAD', 'ANGLE', 'AUDIENCE', 'OBJECTIF'],
    output_type: 'texte',
    language: 'fr',
    tags: ['Twitter', 'Thread', 'Viral', 'Contenu', 'Social media'],
    score_global: 8.9,
    usecase_scores: { 'Thread Twitter': 9.2, 'Contenu viral': 9.0 },
    featured: false, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp35', name: 'Consultant Finance — Tableau de Bord Trésorerie', slug: 'consultant-finance-tableau-bord-tresorerie',
    desc_short: 'Analyse la trésorerie et génère des prévisions de cash flow sur 12 mois.',
    desc_long: 'Ce prompt aide les dirigeants à comprendre leur situation de trésorerie, anticiper les tensions et optimiser leur BFR avec un plan d\'action concret.',
    prompt_text: `Tu es un directeur financier (DAF) de transition avec 20 ans d'expérience en gestion de trésorerie PME/startup.

Données financières :
- CA mensuel : [CA MENSUEL]
- Charges fixes mensuelles : [CHARGES FIXES]
- Charges variables : [CHARGES VARIABLES]
- Délais de paiement clients : [JOURS]
- Délais de paiement fournisseurs : [JOURS]
- Trésorerie actuelle : [MONTANT]
- Dettes court terme : [MONTANT]
- Investissements prévus : [INVESTISSEMENTS]

Fournis :
1. **Analyse de la situation actuelle** (ratios clés : liquidité, BFR, DSO)
2. **Prévisions cash flow** sur 12 mois (tableau mensuel entrées/sorties/solde)
3. **Identification des tensions** de trésorerie potentielles (mois risqués)
4. **Optimisation du BFR** (levier DSO, DPO, stock)
5. **Solutions de financement** court terme (affacturage, découvert, escompte)
6. **Plan d\'action** prioritaire (top 3 actions dans les 30 jours)`,
    prompt_type: 'user',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Finance',
    subcategory: 'Trésorerie',
    jobs: ['DAF', 'CFO', 'Entrepreneur', 'Dirigeant PME'],
    use_cases: ['Trésorerie', 'Cash flow', 'Prévisions financières'],
    is_agent_prompt: false,
    variables: ['CA MENSUEL', 'CHARGES FIXES', 'CHARGES VARIABLES', 'DÉLAIS CLIENTS', 'DÉLAIS FOURNISSEURS', 'TRÉSORERIE'],
    output_type: 'tableau',
    language: 'fr',
    tags: ['Finance', 'Trésorerie', 'Cash flow', 'BFR', 'Prévisions'],
    score_global: 9.0,
    usecase_scores: { Trésorerie: 9.2, 'Cash flow': 9.1 },
    featured: false, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp36', name: 'Rédacteur — Étude de Cas Client (Case Study)', slug: 'redacteur-etude-cas-client',
    desc_short: 'Transforme un succès client en étude de cas convaincante pour vos ventes.',
    desc_long: 'Ce prompt structure une étude de cas client (case study) en or : contexte, problème, solution, résultats chiffrés et citations — prête pour site, deck et sales.',
    prompt_text: `Tu es un content writer spécialisé en B2B storytelling et case studies.

Client : [NOM CLIENT (ou secteur si confidentiel)]
Secteur : [SECTEUR]
Problème initial : [PROBLÈME]
Solution implémentée : [NOTRE SOLUTION]
Résultats obtenus : [RÉSULTATS CHIFFRÉS]
Citation disponible : [CITATION ou NON]
Format cible : [PAGE WEB/PDF/SLIDE/LINKEDIN POST]

Structure l'étude de cas :
1. **Headline** (résultat principal en 1 ligne)
2. **Contexte client** (qui, secteur, taille, enjeux)
3. **Le défi** (problème + impact business avant)
4. **La solution** (approche, implémentation, timeline)
5. **Les résultats** (métriques avant/après, ROI calculé)
6. **Citation client** (réelle ou suggérée pour validation)
7. **Pourquoi ça a marché** (3 facteurs clés de succès)
8. **CTA** (comment reproduire ces résultats)

Version longue (750 mots) + version courte (150 mots pour email/social)`,
    prompt_type: 'template',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Copywriting',
    subcategory: 'Case Study',
    jobs: ['Content Manager', 'Sales', 'Marketeur'],
    use_cases: ['Case study', 'Témoignage client', 'Sales enablement'],
    is_agent_prompt: false,
    variables: ['NOM CLIENT', 'SECTEUR', 'PROBLÈME', 'SOLUTION', 'RÉSULTATS', 'FORMAT'],
    output_type: 'texte',
    language: 'fr',
    tags: ['Case study', 'Copywriting', 'B2B', 'Témoignage', 'Vente'],
    score_global: 8.9,
    usecase_scores: { 'Case study': 9.2, 'Sales enablement': 9.0 },
    featured: false, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp37', name: 'Architecte Prompt — Système Multi-Step', slug: 'architecte-prompt-systeme-multi-step',
    desc_short: 'Décompose un objectif complexe en chaîne de prompts optimisés.',
    desc_long: 'Ce meta-prompt conçoit des architectures de prompts en chaîne (prompt chaining) pour des tâches complexes nécessitant plusieurs étapes de raisonnement.',
    prompt_text: `Tu es un prompt engineer expert en architectures LLM et chain-of-thought.

Objectif final : [OBJECTIF COMPLEXE À ATTEINDRE]
Modèle cible : [GPT-4o / Claude 3.5 / Gemini]
Contraintes : [CONTRAINTES: longueur, format, ton, etc.]
Inputs disponibles : [DONNÉES/INPUTS INITIAUX]

Conçois l'architecture de prompt :

1. **Décomposition** — liste toutes les sous-tâches nécessaires
2. **Chaîne de prompts** — pour chaque étape :
   - Prompt système
   - Prompt utilisateur (avec variables {{INPUT}})
   - Output attendu (format + contenu)
   - Condition de passage à l'étape suivante
3. **Points de branchement** (si X alors prompt A, sinon prompt B)
4. **Gestion des erreurs** (que faire si un step échoue)
5. **Prompt consolidateur** (étape finale qui agrège tous les outputs)
6. **Test cases** — 3 exemples d'inputs pour valider la chaîne`,
    prompt_type: 'chain',
    framework: 'chain-of-thought',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Prompt Engineering',
    subcategory: 'Architecture',
    jobs: ['Développeur', 'Prompt Engineer', 'Product Manager'],
    use_cases: ['Prompt chaining', 'Automatisation IA', 'Architecture LLM'],
    is_agent_prompt: true,
    variables: ['OBJECTIF COMPLEXE', 'MODÈLE CIBLE', 'CONTRAINTES', 'INPUTS'],
    output_type: 'liste',
    language: 'fr',
    tags: ['Prompt Engineering', 'Chain', 'Architecture', 'LLM', 'Automatisation'],
    score_global: 9.3,
    usecase_scores: { 'Prompt chaining': 9.5, 'Architecture LLM': 9.3 },
    featured: true, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp38', name: 'Expert Pricing — Stratégie de Tarification', slug: 'expert-pricing-strategie-tarification',
    desc_short: 'Définit la stratégie de prix optimale pour maximiser revenu et adoption.',
    desc_long: 'Ce prompt analyse votre marché, vos coûts et votre proposition de valeur pour recommander une stratégie de tarification avec tiers, prix psychologiques et tests.',
    prompt_text: `Tu es un consultant en pricing strategy avec une expertise en SaaS, marketplace et retail.

Produit/Service : [PRODUIT]
Coût unitaire (COGS) : [COÛT]
Prix concurrents : [CONCURRENTS + PRIX]
Valeur créée pour le client : [BÉNÉFICE QUANTIFIABLE]
Segment cible : [SEGMENT]
Modèle de revenus actuel : [MODÈLE]
Objectif : [CROISSANCE/MARGES/PARTS DE MARCHÉ]

Analyse et recommandations pricing :
1. **Benchmark concurrentiel** (tableau prix / features / positionnement)
2. **Willingness to pay** estimée (par segment)
3. **Stratégie recommandée** (premium / freemium / per-seat / usage-based / etc.)
4. **Architecture des tiers** (3 offres recommandées avec features et prix)
5. **Prix psychologiques** (99€ vs 100€, ancrage, etc.)
6. **Stratégie d'introduction** (early bird, lifetime deal, essai gratuit)
7. **Tests A/B pricing** recommandés (3 hypothèses à tester)
8. **Impact projeté** sur MRR (scénarios optimiste/réaliste/pessimiste)`,
    prompt_type: 'user',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Stratégie',
    subcategory: 'Pricing',
    jobs: ['CEO', 'Product Manager', 'Entrepreneur'],
    use_cases: ['Pricing', 'Stratégie tarifaire', 'Monétisation'],
    is_agent_prompt: false,
    variables: ['PRODUIT', 'COÛT', 'CONCURRENTS', 'BÉNÉFICE', 'SEGMENT', 'MODÈLE', 'OBJECTIF'],
    output_type: 'rapport',
    language: 'fr',
    tags: ['Pricing', 'Tarification', 'Stratégie', 'Monétisation', 'SaaS'],
    score_global: 9.1,
    usecase_scores: { Pricing: 9.4, Monétisation: 9.2 },
    featured: false, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp39', name: 'Rédacteur Communiqué de Presse', slug: 'redacteur-communique-de-presse',
    desc_short: 'Rédige des communiqués de presse professionnels qui intéressent les journalistes.',
    desc_long: 'Ce prompt génère des communiqués de presse selon les standards journalistiques : angle fort, structure inversée, citations et éléments de suivi pour les médias.',
    prompt_text: `Tu es un attaché de presse senior avec 15 ans d'expérience en relations médias tech et business.

Actualité : [SUJET DE L'ANNONCE]
Entreprise : [ENTREPRISE]
Impact : [IMPACT / POURQUOI C'EST IMPORTANT]
Date d'embargo : [DATE ou POUR DIFFUSION IMMÉDIATE]
Porte-parole : [NOM + TITRE]
Contacts presse : [NOM/EMAIL/TÉL]

Rédige le communiqué de presse :

**Format AP Style :**
1. **Titre** (accrocheur, factuel, 10-12 mots)
2. **Sous-titre** (angle complémentaire)
3. **Chapeau** (les 5W en 2-3 phrases — le plus important en premier)
4. **Corps** (développement pyramide inversée, 3-4 paragraphes)
5. **Citation 1** — dirigeant de l'entreprise (authentique, pas corporate)
6. **Citation 2** — partenaire ou expert tiers (si applicable)
7. **À propos de [Entreprise]** (boilerplate, 50 mots)
8. **Contact presse** (formaté)
9. **###** (fin de communiqué)

Astuce journaliste : identifier l'angle éditorial (tendance + données + histoire humaine)`,
    prompt_type: 'template',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Copywriting',
    subcategory: 'Relations presse',
    jobs: ['Attaché de presse', 'Communication', 'Marketeur'],
    use_cases: ['Communiqué de presse', 'Relations médias', 'Annonce'],
    is_agent_prompt: false,
    variables: ["SUJET DE L'ANNONCE", 'ENTREPRISE', 'IMPACT', "DATE D'EMBARGO", 'PORTE-PAROLE'],
    output_type: 'texte',
    language: 'fr',
    tags: ['Presse', 'Communiqué', 'Médias', 'Relations presse', 'Communication'],
    score_global: 8.8,
    usecase_scores: { 'Communiqué de presse': 9.1, 'Relations médias': 8.9 },
    featured: false, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp40', name: 'Expert SQL — Requêtes Complexes & Optimisation', slug: 'expert-sql-requetes-complexes-optimisation',
    desc_short: 'Génère, explique et optimise des requêtes SQL complexes pour tout type de base.',
    desc_long: 'Ce prompt transforme l\'IA en expert SQL : génération de requêtes complexes (CTE, window functions, subqueries), optimisation des performances et explication pédagogique.',
    prompt_text: `Tu es un DBA (Database Administrator) expert SQL avec 12 ans d'expérience sur PostgreSQL, MySQL et BigQuery.

Base de données : [POSTGRESQL/MYSQL/BIGQUERY/SQLITE]
Schéma (tables et colonnes) :
\`\`\`
[SCHÉMA]
\`\`\`

Besoin : [DESCRIPTION DE CE QUE LA REQUÊTE DOIT FAIRE]
Volume de données : [NOMBRE DE LIGNES ESTIMÉ]
Contrainte de performance : [TEMPS MAX ACCEPTABLE]

Fournis :
1. **Requête SQL optimale** (commentée ligne par ligne)
2. **Explication** de la logique (en français, accessible)
3. **Version alternative** si applicable (CTE vs subquery, par exemple)
4. **Plan d\'exécution** suggéré (EXPLAIN ANALYZE simplifié)
5. **Index recommandés** pour cette requête
6. **Pièges à éviter** sur ce type de requête
7. **Requête de test** avec données d\'exemple`,
    prompt_type: 'system',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Code',
    subcategory: 'Base de données',
    jobs: ['Data Engineer', 'Développeur', 'Data Analyst'],
    use_cases: ['SQL', 'Requête complexe', 'Optimisation BDD'],
    is_agent_prompt: false,
    variables: ['BASE DE DONNÉES', 'SCHÉMA', 'BESOIN', 'VOLUME', 'CONTRAINTE'],
    output_type: 'code',
    language: 'fr',
    tags: ['SQL', 'Base de données', 'Requête', 'Optimisation', 'Data'],
    score_global: 9.2,
    usecase_scores: { SQL: 9.5, 'Optimisation BDD': 9.3 },
    featured: true, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp41', name: 'Consultant RH — Plan de Formation', slug: 'consultant-rh-plan-de-formation',
    desc_short: 'Conçoit un plan de formation annuel aligné sur les besoins stratégiques.',
    desc_long: 'Ce prompt aide les RH à construire un plan de développement des compétences priorisé : cartographie des compétences, gaps identifiés, formations recommandées et budget.',
    prompt_text: `Tu es un consultant en développement des compétences et learning & development (L&D).

Entreprise : [ENTREPRISE]
Secteur : [SECTEUR]
Effectif : [NOMBRE D'EMPLOYÉS]
Enjeux stratégiques : [ENJEUX 12 MOIS]
Budget formation disponible : [BUDGET]
Compétences manquantes identifiées : [GAPS]

Génère le plan de formation :
1. **Cartographie des compétences** (matrice compétences requises vs actuelles)
2. **Priorités de formation** (classées impact/urgence)
3. **Plan par population cible** :
   - Managers (compétences leadership, management hybride)
   - Équipes techniques (compétences métier + IA)
   - Tous collaborateurs (socle commun)
4. **Format recommandé** pour chaque formation (présentiel/e-learning/coaching/MOOC)
5. **Budget détaillé** (coût par action × nombre de participants)
6. **Calendrier** sur 12 mois
7. **KPIs** pour mesurer l'efficacité des formations
8. **Organismes recommandés** par domaine`,
    prompt_type: 'template',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'RH',
    subcategory: 'Formation',
    jobs: ['DRH', 'Responsable formation', 'Manager'],
    use_cases: ['Plan de formation', 'L&D', 'Montée en compétences'],
    is_agent_prompt: false,
    variables: ['ENTREPRISE', 'SECTEUR', 'EFFECTIF', 'ENJEUX', 'BUDGET', 'GAPS'],
    output_type: 'rapport',
    language: 'fr',
    tags: ['Formation', 'RH', 'Compétences', 'L&D', 'Plan formation'],
    score_global: 8.7,
    usecase_scores: { 'Plan de formation': 9.0, 'L&D': 8.9 },
    featured: false, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp42', name: 'Copywriter Fiche Produit E-commerce', slug: 'copywriter-fiche-produit-ecommerce',
    desc_short: 'Rédige des fiches produit qui convertissent : bénéfices, SEO et réduction des frictions.',
    desc_long: 'Ce prompt génère des fiches produit e-commerce optimisées pour la conversion et le SEO : titre accrocheur, description bénéfices-centrée, bullet points et FAQ.',
    prompt_text: `Tu es un copywriter e-commerce expert en optimisation des taux de conversion (CRO).

Produit : [NOM DU PRODUIT]
Catégorie : [CATÉGORIE]
Caractéristiques techniques : [SPECS]
Prix : [PRIX]
Audience : [CLIENT CIBLE]
Concurrents : [CONCURRENTS PRINCIPAUX]
Avantage différenciant : [USP]

Rédige la fiche produit complète :
1. **Titre produit** (avec mot-clé principal, max 70 caractères)
2. **Accroche** (1 phrase, bénéfice principal)
3. **Description courte** (150 mots, storytelling + bénéfices)
4. **Bullet points** ×6 (feature → bénéfice → preuve)
5. **Description longue** (400 mots, SEO-friendly, storytelling)
6. **FAQ** ×5 (objections principales + réponses rassurantes)
7. **Éléments de réassurance** (garantie, livraison, avis)
8. **Méta-titre et méta-description** SEO

Format : prêt à copier-coller dans Shopify/WooCommerce`,
    prompt_type: 'template',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Copywriting',
    subcategory: 'E-commerce',
    jobs: ['E-commerçant', 'Marketeur', 'Rédacteur web'],
    use_cases: ['Fiche produit', 'E-commerce', 'Conversion'],
    is_agent_prompt: false,
    variables: ['NOM DU PRODUIT', 'CATÉGORIE', 'SPECS', 'PRIX', 'AUDIENCE', 'USP'],
    output_type: 'texte',
    language: 'fr',
    tags: ['E-commerce', 'Fiche produit', 'Copywriting', 'Conversion', 'SEO'],
    score_global: 9.0,
    usecase_scores: { 'Fiche produit': 9.3, Conversion: 9.1 },
    featured: false, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp43', name: 'Analyste — Veille Stratégique Sectorielle', slug: 'analyste-veille-strategique-sectorielle',
    desc_short: 'Synthèse de veille stratégique sur un secteur avec tendances et signaux faibles.',
    desc_long: 'Ce prompt génère une note de veille stratégique complète : macro-tendances, disruptions, acteurs émergents, signaux faibles et implications pour votre business.',
    prompt_text: `Tu es un analyste en intelligence économique et veille stratégique.

Secteur à analyser : [SECTEUR]
Périmètre géographique : [FRANCE/EUROPE/MONDIAL]
Horizon temporel : [3 ANS / 5 ANS / 10 ANS]
Ma position dans ce secteur : [MA POSITION]

Produis une note de veille stratégique :

1. **État du secteur** (chiffres clés, structure, acteurs dominants)
2. **Macro-tendances** ×5 (PESTEL simplifié — forces structurantes)
3. **Disruptions en cours** (technologies, modèles, régulation)
4. **Acteurs à surveiller** (startups, entrants étrangers, pivots)
5. **Signaux faibles** ×3 (tendances émergentes peu visibles mais importantes)
6. **Scénarios** à 3 ans (optimiste / probable / pessimiste)
7. **Implications stratégiques** pour ma position
8. **Actions recommandées** (ce qu'il faut faire maintenant vs dans 12 mois)
9. **Sources à suivre** (médias, rapports, influenceurs sectoriels)`,
    prompt_type: 'user',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o', 'Perplexity'],
    category: 'Stratégie',
    subcategory: 'Veille',
    jobs: ['Analyste', 'Directeur stratégie', 'Entrepreneur'],
    use_cases: ['Veille stratégique', 'Analyse sectorielle', 'Prospective'],
    is_agent_prompt: false,
    variables: ['SECTEUR', 'PÉRIMÈTRE GÉOGRAPHIQUE', 'HORIZON', 'MA POSITION'],
    output_type: 'rapport',
    language: 'fr',
    tags: ['Veille', 'Stratégie', 'Secteur', 'Tendances', 'Intelligence économique'],
    score_global: 9.0,
    usecase_scores: { 'Veille stratégique': 9.2, 'Analyse sectorielle': 9.1 },
    featured: false, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp44', name: 'Expert API — Documentation Technique OpenAPI', slug: 'expert-api-documentation-openapi',
    desc_short: 'Génère une documentation API complète au format OpenAPI 3.0 / Swagger.',
    desc_long: 'Ce prompt crée une documentation API professionnelle : spécification OpenAPI 3.0, descriptions des endpoints, schémas de données, codes d\'erreur et exemples.',
    prompt_text: `Tu es un développeur API senior expert en documentation technique et OpenAPI 3.0.

API à documenter : [NOM DE L'API]
Endpoints principaux :
\`\`\`
[LISTE DES ENDPOINTS]
\`\`\`
Authentification : [JWT/API KEY/OAuth2]
Format de données : [JSON/XML]
Environnements : [DEV/STAGING/PROD URLs]

Génère la documentation :
1. **Fichier OpenAPI 3.0 (YAML)** complet avec :
   - Info section (titre, version, description)
   - Servers
   - Security schemes
   - Paths (chaque endpoint avec GET/POST/PUT/DELETE)
   - Request/Response schemas
   - Error codes standardisés

2. **README d'intégration** :
   - Authentification en 3 étapes
   - Premier appel API (curl + exemple réponse)
   - SDK snippets (JavaScript + Python)
   - Rate limits et bonnes pratiques

3. **Changelog** template`,
    prompt_type: 'template',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Code',
    subcategory: 'Documentation',
    jobs: ['Développeur', 'Tech Lead', 'Architecte'],
    use_cases: ['Documentation API', 'OpenAPI', 'Swagger'],
    is_agent_prompt: false,
    variables: ["NOM DE L'API", 'ENDPOINTS', 'AUTHENTIFICATION', 'FORMAT', 'URLS'],
    output_type: 'json',
    language: 'fr',
    tags: ['API', 'Documentation', 'OpenAPI', 'Swagger', 'Développement'],
    score_global: 9.1,
    usecase_scores: { 'Documentation API': 9.4, OpenAPI: 9.2 },
    featured: false, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp45', name: 'Coach Bien-être — Programme Gestion du Stress', slug: 'coach-bien-etre-programme-gestion-stress',
    desc_short: 'Crée un programme personnalisé de gestion du stress et de bien-être au travail.',
    desc_long: 'Ce prompt génère un programme de gestion du stress sur mesure : diagnostic, techniques CBT/mindfulness, plan hebdomadaire et ressources personnalisées.',
    prompt_text: `Tu es un psychologue du travail et coach bien-être certifié.

Situation actuelle :
- Niveau de stress perçu : [1-10]
- Sources de stress principales : [SOURCES]
- Symptômes physiques/mentaux : [SYMPTÔMES]
- Contexte professionnel : [POSTE/SECTEUR]
- Disponibilité par semaine : [HEURES]
- Pratiques actuelles : [CE QUE JE FAIS DÉJÀ]

Génère un programme personnalisé :
1. **Diagnostic** (analyse de la situation, identification des triggers)
2. **Plan d'action immédiat** (3 techniques pour réduire le stress dans l'heure)
3. **Programme 4 semaines** :
   - Semaine 1 : Prise de conscience + respiration (cohérence cardiaque)
   - Semaine 2 : Restructuration cognitive (CBT basique)
   - Semaine 3 : Mindfulness et ancrage
   - Semaine 4 : Hygiène de vie et limites professionnelles
4. **Routine matinale** de 10 min (anti-stress)
5. **Signaux d'alarme** (quand consulter un professionnel)
6. **Applications et ressources** recommandées`,
    prompt_type: 'user',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Bien-être',
    subcategory: 'Gestion du stress',
    jobs: ['Salarié', 'Manager', 'Entrepreneur'],
    use_cases: ['Stress', 'Bien-être', 'Équilibre pro/perso'],
    is_agent_prompt: false,
    variables: ['NIVEAU DE STRESS', 'SOURCES', 'SYMPTÔMES', 'CONTEXTE', 'DISPONIBILITÉ'],
    output_type: 'liste',
    language: 'fr',
    tags: ['Stress', 'Bien-être', 'Mindfulness', 'CBT', 'Santé mentale'],
    score_global: 8.7,
    usecase_scores: { Stress: 9.0, 'Bien-être': 8.9 },
    featured: false, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp46', name: 'Expert Cybersécurité — Audit de Sécurité', slug: 'expert-cybersecurite-audit-securite',
    desc_short: 'Effectue un audit de sécurité applicative et génère un rapport de vulnérabilités.',
    desc_long: 'Ce prompt analyse votre architecture ou code pour identifier les failles de sécurité selon OWASP Top 10, avec scoring de risque et recommandations de remédiation.',
    prompt_text: `Tu es un expert en cybersécurité offensive et défensive, certifié OSCP et ISO 27001.

Élément à auditer : [CODE / ARCHITECTURE / CONFIGURATION]
\`\`\`
[CONTENU]
\`\`\`
Type d'application : [WEB APP / API / MOBILE / INFRASTRUCTURE]
Stack technique : [STACK]
Données sensibles traitées : [TYPES DE DONNÉES]

Audit de sécurité :
1. **Résumé exécutif** (score global /10, niveau de risque : faible/moyen/élevé/critique)
2. **Vulnérabilités identifiées** (tableau : CVE/OWASP ref + description + sévérité)
3. **Top 3 vulnérabilités critiques** (exploitation détaillée + impact potentiel)
4. **Analyse OWASP Top 10** (checklist : conforme / non-conforme / N/A)
5. **Remédiation** pour chaque vulnérabilité (code corrigé si applicable)
6. **Tests de sécurité** recommandés (pentest, SAST, DAST)
7. **Plan de correction** priorisé (P0/P1/P2 avec délais)

⚠️ Usage éthique uniquement — audit de vos propres systèmes`,
    prompt_type: 'system',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Code',
    subcategory: 'Sécurité',
    jobs: ['Développeur', 'RSSI', 'DevSecOps'],
    use_cases: ['Audit sécurité', 'OWASP', 'Pentest', 'Code review sécurité'],
    is_agent_prompt: false,
    variables: ['CONTENU', 'TYPE APPLICATION', 'STACK', 'DONNÉES SENSIBLES'],
    output_type: 'rapport',
    language: 'fr',
    tags: ['Sécurité', 'OWASP', 'Audit', 'Vulnérabilité', 'Cybersécurité'],
    score_global: 9.2,
    usecase_scores: { 'Audit sécurité': 9.5, OWASP: 9.3 },
    featured: true, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp47', name: 'Formateur — Création de Cours en Ligne', slug: 'formateur-creation-cours-en-ligne',
    desc_short: 'Structure et rédige un cours en ligne complet avec modules, exercices et évaluations.',
    desc_long: 'Ce prompt crée l\'architecture pédagogique d\'un cours en ligne complet : plan de cours, scripts de vidéos, exercices pratiques et quiz de validation.',
    prompt_text: `Tu es un instructional designer expert en e-learning et pédagogie active.

Sujet du cours : [SUJET]
Niveau apprenants : [DÉBUTANT/INTERMÉDIAIRE/AVANCÉ]
Durée totale : [HEURES]
Format : [VIDÉO/TEXTE/HYBRIDE]
Objectif principal : [CE QUE L'APPRENANT DOIT SAVOIR FAIRE]
Plateforme : [TEACHABLE/THINKIFIC/UDEMY/etc.]

Architecture pédagogique :
1. **Résumé du cours** (pitch de vente + objectifs d'apprentissage × 5)
2. **Plan de cours** (modules et leçons avec durée et objectif de chaque)
3. **Module 1 complet** :
   - Script vidéo intro (hook + contenu + exercice)
   - Ressource téléchargeable (template ou fiche mémo)
   - Quiz de validation (5 questions QCM avec corrections)
4. **Exercice pratique** fil rouge (projet appliqué tout au long du cours)
5. **Plan de chaque module restant** (structure standardisée)
6. **Email de bienvenue** pour les inscrits
7. **Page de vente** structure recommandée`,
    prompt_type: 'mega-prompt',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o', 'Gemini 1.5 Pro'],
    category: 'Éducation',
    subcategory: 'Cours en ligne',
    jobs: ['Formateur', 'Créateur de contenu', 'Coach'],
    use_cases: ['Cours en ligne', 'E-learning', 'Formation'],
    is_agent_prompt: false,
    variables: ['SUJET', 'NIVEAU', 'DURÉE', 'FORMAT', 'OBJECTIF', 'PLATEFORME'],
    output_type: 'rapport',
    language: 'fr',
    tags: ['Formation', 'E-learning', 'Cours', 'Pédagogie', 'Instructional design'],
    score_global: 9.1,
    usecase_scores: { 'Cours en ligne': 9.3, 'E-learning': 9.2 },
    featured: true, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp48', name: 'Consultant Lean — Analyse des Processus', slug: 'consultant-lean-analyse-processus',
    desc_short: 'Identifie les gaspillages dans vos processus et optimise les flux de valeur.',
    desc_long: 'Ce prompt applique les méthodologies Lean (5S, VSM, Kaizen) pour analyser un processus, identifier les goulots d\'étranglement et proposer des améliorations.',
    prompt_text: `Tu es un consultant Lean Six Sigma ceinture noire avec 15 ans d'expérience en amélioration des processus.

Processus à analyser : [NOM DU PROCESSUS]
Secteur : [SECTEUR]
Description étape par étape :
[ÉTAPES DU PROCESSUS]
Temps actuel total : [DURÉE ACTUELLE]
Problèmes constatés : [PROBLÈMES / PLAINTES]
Objectif d'amélioration : [OBJECTIF]

Analyse Lean complète :
1. **Value Stream Mapping** textuel (chaque étape : VA / NVA / NNVA + temps)
2. **Identification des 8 gaspillages** (TIMWOODS) présents dans le processus
3. **Goulots d'étranglement** (bottlenecks — étapes qui ralentissent tout)
4. **Analyse des causes racines** (5 Pourquoi pour le problème principal)
5. **Améliorations suggérées** (Quick wins + chantiers moyens terme)
6. **Nouveau processus cible** (étapes optimisées avec temps prévisionnels)
7. **Gains estimés** (temps gagné, coût réduit, qualité améliorée)
8. **Plan Kaizen** (feuille de route d'implémentation)`,
    prompt_type: 'user',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Stratégie',
    subcategory: 'Processus',
    jobs: ['Directeur opérations', 'Manager', 'Consultant'],
    use_cases: ['Optimisation processus', 'Lean', 'Amélioration continue'],
    is_agent_prompt: false,
    variables: ['NOM DU PROCESSUS', 'SECTEUR', 'ÉTAPES', 'DURÉE', 'PROBLÈMES', 'OBJECTIF'],
    output_type: 'rapport',
    language: 'fr',
    tags: ['Lean', 'Processus', 'Optimisation', 'Kaizen', 'Six Sigma'],
    score_global: 8.9,
    usecase_scores: { 'Optimisation processus': 9.2, Lean: 9.0 },
    featured: false, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp49', name: 'Expert Growth Hacking — Expériences AARRR', slug: 'expert-growth-hacking-experiences-aarrr',
    desc_short: 'Conçoit des expériences de croissance sur les 5 étapes du funnel AARRR.',
    desc_long: 'Ce prompt génère un backlog d\'expériences growth structurées sur le framework AARRR (Acquisition, Activation, Rétention, Revenu, Recommandation) avec scoring ICE.',
    prompt_text: `Tu es un Growth Hacker senior avec une expérience sur des startups de 0 à 1M utilisateurs.

Produit : [PRODUIT]
Stade : [PRE-PMF / POST-PMF / SCALE]
Métriques actuelles :
- Acquisition : [COÛT PAR ACQUISITION]
- Activation : [TAUX D'ACTIVATION]
- Rétention D7/D30 : [%]
- Revenu : [ARR/MRR]
- NPS : [SCORE]
Ressources équipe growth : [TAILLE DE L'ÉQUIPE]

Génère 20 expériences de croissance :

Pour chaque étape du funnel AARRR (4 par étape) :
- Hypothèse (si on fait X, alors Y)
- Description de l'expérience (quoi, comment, pour qui)
- Métriques de succès (KPI principal + seuil)
- Effort estimé (S/M/L)
- Score ICE (Impact × Confidence × Ease /10)
- Durée du test recommandée

Priorisation : top 5 expériences à lancer en premier`,
    prompt_type: 'agent',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    category: 'Marketing',
    subcategory: 'Growth',
    jobs: ['Growth Hacker', 'Product Manager', 'Entrepreneur'],
    use_cases: ['Growth', 'AARRR', 'Expériences', 'Acquisition'],
    is_agent_prompt: true,
    variables: ['PRODUIT', 'STADE', 'CAC', 'TAUX ACTIVATION', 'RÉTENTION', 'MRR', 'NPS'],
    output_type: 'tableau',
    language: 'fr',
    tags: ['Growth', 'AARRR', 'Expériences', 'Startup', 'Acquisition'],
    score_global: 9.2,
    usecase_scores: { Growth: 9.4, AARRR: 9.3 },
    featured: true, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
  {
    id: 'lp50', name: 'Rédacteur Rapport Annuel ESG', slug: 'redacteur-rapport-annuel-esg',
    desc_short: 'Structure et rédige un rapport RSE/ESG conforme aux standards GRI et CSRD.',
    desc_long: 'Ce prompt génère un rapport RSE/ESG complet : bilan carbone, politique sociale, gouvernance et engagements, conforme aux exigences CSRD et aux standards GRI.',
    prompt_text: `Tu es un expert en reporting extra-financier (RSE/ESG) certifié GRI et CSRD.

Entreprise : [ENTREPRISE]
Secteur : [SECTEUR]
Effectif : [NOMBRE D'EMPLOYÉS]
CA : [CHIFFRE D'AFFAIRES]
Données ESG disponibles :
- Environnement : [ÉMISSIONS CO2, CONSOMMATION ÉNERGIE, DÉCHETS]
- Social : [FORMATIONS, ACCIDENTS, PARITÉ, SALAIRES]
- Gouvernance : [STRUCTURE, ÉTHIQUE, CONFORMITÉ]

Structure du rapport ESG :
1. **Message du dirigeant** (engagements et vision)
2. **Profil de l'entreprise** et matérialité des enjeux
3. **Pilier Environnement** :
   - Bilan carbone (scopes 1, 2, 3 estimés)
   - Objectifs de réduction + trajectoire
   - Initiatives en cours
4. **Pilier Social** :
   - Indicateurs clés (parité, formation, turnover)
   - Politique RH et bien-être
5. **Pilier Gouvernance** :
   - Structure et éthique
   - Conformité et gestion des risques
6. **Objectifs et engagements** (3 ans)
7. **Index GRI** (tableau de correspondance)`,
    prompt_type: 'template',
    top_models: ['Claude 3.5 Sonnet', 'GPT-4o', 'Gemini 1.5 Pro'],
    category: 'Business',
    subcategory: 'ESG/RSE',
    jobs: ['Directeur RSE', 'DAF', 'Communication'],
    use_cases: ['Rapport RSE', 'ESG', 'CSRD', 'GRI'],
    is_agent_prompt: false,
    variables: ['ENTREPRISE', 'SECTEUR', 'EFFECTIF', 'CA', 'DONNÉES ENVIRONNEMENT', 'DONNÉES SOCIAL'],
    output_type: 'rapport',
    language: 'fr',
    tags: ['RSE', 'ESG', 'CSRD', 'GRI', 'Rapport annuel'],
    score_global: 8.8,
    usecase_scores: { 'Rapport RSE': 9.1, ESG: 9.0 },
    featured: false, verified: true,
    created_at: '2025-01-01', updated_at: '2025-04-01',
  },
]
