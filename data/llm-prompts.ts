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
]
