

export type LanguageCode = 'pt' | 'en' | 'es' | 'fr' | 'it' | 'de' | 'ja' | 'ko';

export interface Translation {
  title: string;
  subtitle: string;
  heroTitle: string;
  heroDesc: string;
  
  // Input Form
  inputNameLabel: string;
  inputNamePlaceholder: string;
  inputFeedbackLabel: string;
  inputFeedbackPlaceholder: string;
  inputIngredientsLabel: string;
  inputIngredientsPlaceholder: string;
  inputMethodLabel: string;
  inputUtensilsLabel: string; // New
  
  // Cooking Methods
  cookingMethods: {
    Stove: string;
    Oven: string;
    AirFryer: string;
    Microwave: string;
    Grill: string;
    PressureCooker: string;
  };

  // Utensils
  utensils: {
    Pot: string;
    FryingPan: string;
    DeepPan: string;
    Wok: string;
    BakingSheet: string;
    GlassDish: string;
    Blender: string;
    FoodProcessor: string;
    Mixer: string;
    GrillPan: string;
    ClayPot: string;
  };
  
  addButton: string;
  emptyIngredients: string;
  generateButton: string;
  generating: string;
  error: string;
  suggestionsTitle: string;
  emptyState: string;
  footer: string;
  
  // Header badges
  evolution: string;
  smartAdaptation: string;
  notebookBtn: string;

  // Recipe Card
  focusLabel: string;
  changesLabel: string;
  feedbackLabel: string;
  ingredients: string;
  instructions: string;
  minutes: string;
  items: string;
  difficultyLabels: {
    Easy: string;
    Medium: string;
    Hard: string;
  };

  // Notebook / Save Feature
  saveBtn: string;
  removeBtn: string;
  remixBtn: string; // New
  savePersuasion: string; 
  notebookTitle: string;
  notebookDesc: string;
  noSavedRecipes: string;
  backToGenerator: string;

  // Image Generation
  viewImageBtn: string;
  generateImageBtn: string;
  generatingImage: string;
  imageModalTitle: string;

  // Safety
  safetyTitle: string;
  safetyBtn: string;
  loadingSafety: string;
  noSafetyTips: string;
}

export const translations: Record<LanguageCode, Translation> = {
  pt: {
    title: "Chef em Casa",
    subtitle: "Seu Assistente Culinário",
    heroTitle: "Vamos reinventar sua receita?",
    heroDesc: "Já imaginou dominar a cozinha do dia para a noite? Com a nossa IA, você não apenas cozinha, você cria. Simplificamos cada passo para garantir que você tenha um resultado final impecável, sempre.",
    
    inputNameLabel: "Nome da Receita Base",
    inputNamePlaceholder: "Ex: Strogonoff de Frango",
    inputFeedbackLabel: "Seu Feedback (Opcional)",
    inputFeedbackPlaceholder: "Ex: Ficou muito ácido, queria algo mais crocante...",
    inputIngredientsLabel: "Ingredientes da Base + O que tem extra",
    inputIngredientsPlaceholder: "Ex: Frango, Creme de Leite, Cogumelos...",
    inputMethodLabel: "Onde vai preparar?",
    inputUtensilsLabel: "Utensílio Principal",
    
    cookingMethods: {
      Stove: "Fogão",
      Oven: "Forno",
      AirFryer: "Air Fryer",
      Microwave: "Microondas",
      Grill: "Churrasqueira",
      PressureCooker: "Panela de Pressão"
    },

    utensils: {
      Pot: "Panela Padrão",
      FryingPan: "Frigideira",
      DeepPan: "Caçarola / Panela Funda",
      Wok: "Wok",
      BakingSheet: "Assadeira / Tabuleiro",
      GlassDish: "Refratário de Vidro",
      Blender: "Liquidificador",
      FoodProcessor: "Processador de Alimentos",
      Mixer: "Batedeira",
      GrillPan: "Grelha de Fogão",
      ClayPot: "Panela de Barro"
    },
    
    addButton: "Adicionar",
    emptyIngredients: "Liste os ingredientes usados ou disponíveis.",
    generateButton: "Reimaginar Receita",
    generating: "Evoluindo o Prato...",
    error: "Erro ao processar. Verifique os dados e tente novamente.",
    suggestionsTitle: "Variações Evoluídas",
    emptyState: "Preencha os dados acima para ver a mágica acontecer.",
    footer: "Chef em Casa. Receitas reimaginadas por inteligência artificial.",
    
    evolution: "Evolução Culinária",
    smartAdaptation: "Adaptação Inteligente",
    notebookBtn: "Caderno",

    focusLabel: "Foco da Variação",
    changesLabel: "Principais Alterações",
    feedbackLabel: "Resolução do Feedback",
    ingredients: "Nova Lista de Ingredientes",
    instructions: "Passo a Passo Revisado",
    minutes: "min",
    items: "Ingredientes",
    difficultyLabels: { Easy: "Fácil", Medium: "Médio", Hard: "Difícil" },

    saveBtn: "Salvar no Meu Caderno",
    removeBtn: "Remover do Caderno",
    remixBtn: "Usar como Base para Nova Receita",
    savePersuasion: "Esta receita foi gerada exclusivamente para você! Não a perca. Salve agora no seu Caderno Pessoal e acesse quando quiser.",
    notebookTitle: "📚 Meu Caderno de Receitas Pessoal",
    notebookDesc: "Aqui estão todas as obras-primas que nossa IA criou para você! Cozinhe seus favoritos novamente.",
    noSavedRecipes: "Você ainda não salvou nenhuma receita. Volte ao gerador e crie algo delicioso!",
    backToGenerator: "Voltar ao Gerador",

    viewImageBtn: "Ver Foto",
    generateImageBtn: "Gerar Foto IA",
    generatingImage: "Criando Foto...",
    imageModalTitle: "Prévia Visual da Receita",

    safetyTitle: "Dicas de Segurança e Cuidados",
    safetyBtn: "Ver Alertas",
    loadingSafety: "Analisando riscos...",
    noSafetyTips: "Nenhum risco específico identificado, mas sempre cozinhe com atenção!"
  },
  en: {
    title: "Chef at Home",
    subtitle: "Your Culinary Assistant",
    heroTitle: "Let's reinvent your recipe?",
    heroDesc: "Ever imagined mastering the kitchen overnight? With our AI, you don't just cook, you create. We simplify every step to ensure you get an impeccable result, always.",
    
    inputNameLabel: "Base Recipe Name",
    inputNamePlaceholder: "Ex: Chicken Stroganoff",
    inputFeedbackLabel: "Your Feedback (Optional)",
    inputFeedbackPlaceholder: "Ex: It was too sour, I wanted more texture...",
    inputIngredientsLabel: "Base Ingredients + Extra Stock",
    inputIngredientsPlaceholder: "Ex: Chicken, Heavy Cream, Mushrooms...",
    inputMethodLabel: "Cooking Equipment",
    inputUtensilsLabel: "Main Utensil",
    
    cookingMethods: {
      Stove: "Stove Top",
      Oven: "Oven",
      AirFryer: "Air Fryer",
      Microwave: "Microwave",
      Grill: "Grill/BBQ",
      PressureCooker: "Pressure Cooker"
    },

    utensils: {
      Pot: "Standard Pot",
      FryingPan: "Frying Pan",
      DeepPan: "Deep Pan / Casserole",
      Wok: "Wok",
      BakingSheet: "Baking Sheet",
      GlassDish: "Glass Dish",
      Blender: "Blender",
      FoodProcessor: "Food Processor",
      Mixer: "Stand Mixer",
      GrillPan: "Grill Pan",
      ClayPot: "Clay Pot"
    },
    
    addButton: "Add",
    emptyIngredients: "List ingredients used or available.",
    generateButton: "Reimagine Recipe",
    generating: "Evolving Dish...",
    error: "Error processing. Please check data and try again.",
    suggestionsTitle: "Evolved Variations",
    emptyState: "Fill in the data above to start the magic.",
    footer: "Chef at Home. Recipes reimagined by artificial intelligence.",
    
    evolution: "Culinary Evolution",
    smartAdaptation: "Smart Adaptation",
    notebookBtn: "Notebook",

    focusLabel: "Variation Focus",
    changesLabel: "Main Changes",
    feedbackLabel: "Feedback Resolution",
    ingredients: "New Ingredient List",
    instructions: "Revised Instructions",
    minutes: "min",
    items: "Items",
    difficultyLabels: { Easy: "Easy", Medium: "Medium", Hard: "Hard" },

    saveBtn: "Save to My Notebook",
    removeBtn: "Remove from Notebook",
    remixBtn: "Remix / Use as Base",
    savePersuasion: "This recipe was generated exclusively for you! Don't lose it. Save it to your Personal Notebook now.",
    notebookTitle: "📚 My Personal Recipe Notebook",
    notebookDesc: "Here are all the masterpieces our AI created for you! Cook your favorites again.",
    noSavedRecipes: "You haven't saved any recipes yet. Go back to the generator and create something delicious!",
    backToGenerator: "Back to Generator",

    viewImageBtn: "View Photo",
    generateImageBtn: "Generate AI Photo",
    generatingImage: "Creating Photo...",
    imageModalTitle: "Recipe Visual Preview",

    safetyTitle: "Safety Tips & Warnings",
    safetyBtn: "Safety Alerts",
    loadingSafety: "Analyzing hazards...",
    noSafetyTips: "No specific hazards identified, but always cook with care!"
  },
  es: {
    title: "Chef en Casa",
    subtitle: "Tu Asistente Culinario",
    heroTitle: "¿Reinventamos tu receta?",
    heroDesc: "¿Imaginaste dominar la cocina de la noche a la mañana? Con nuestra IA, no solo cocinas, creas. Simplificamos cada paso para asegurar un resultado impecable, siempre.",
    
    inputNameLabel: "Nombre de la Receta Base",
    inputNamePlaceholder: "Ej: Strogonoff de Pollo",
    inputFeedbackLabel: "Tu Opinión (Opcional)",
    inputFeedbackPlaceholder: "Ej: Quedó muy ácido, quería algo más crujiente...",
    inputIngredientsLabel: "Ingredientes Base + Extras",
    inputIngredientsPlaceholder: "Ej: Pollo, Crema, Champiñones...",
    inputMethodLabel: "Equipo de Cocina",
    inputUtensilsLabel: "Utensilio Principal",
    
    cookingMethods: {
      Stove: "Estufa",
      Oven: "Horno",
      AirFryer: "Freidora de Aire",
      Microwave: "Microondas",
      Grill: "Parrilla",
      PressureCooker: "Olla a Presión"
    },

    utensils: {
      Pot: "Olla Estándar",
      FryingPan: "Sartén",
      DeepPan: "Cazuela",
      Wok: "Wok",
      BakingSheet: "Bandeja de Horno",
      GlassDish: "Fuente de Vidrio",
      Blender: "Licuadora",
      FoodProcessor: "Procesador",
      Mixer: "Batidora",
      GrillPan: "Sartén Grill",
      ClayPot: "Olla de Barro"
    },
    
    addButton: "Añadir",
    emptyIngredients: "Lista los ingredientes usados o disponibles.",
    generateButton: "Reimaginar Receta",
    generating: "Evolucionando Plato...",
    error: "Error al procesar. Verifica los datos e inténtalo de nuevo.",
    suggestionsTitle: "Variaciones Evolucionadas",
    emptyState: "Completa los datos arriba para ver la magia.",
    footer: "Chef en Casa. Recetas reimaginadas por inteligencia artificial.",
    
    evolution: "Evolución Culinaria",
    smartAdaptation: "Adaptación Inteligente",
    notebookBtn: "Cuaderno",

    focusLabel: "Enfoque de Variación",
    changesLabel: "Cambios Principales",
    feedbackLabel: "Resolución de Feedback",
    ingredients: "Nueva Lista de Ingredientes",
    instructions: "Instrucciones Revisadas",
    minutes: "min",
    items: "Ingredientes",
    difficultyLabels: { Easy: "Fácil", Medium: "Medio", Hard: "Difícil" },

    saveBtn: "Guardar en Mi Cuaderno",
    removeBtn: "Eliminar del Cuaderno",
    remixBtn: "Usar como Base",
    savePersuasion: "¡Esta receta fue generada exclusivamente para ti! No la pierdas. Guárdala ahora en tu Cuaderno Personal.",
    notebookTitle: "📚 Mi Cuaderno de Recetas Personal",
    notebookDesc: "¡Aquí están todas las obras maestras que nuestra IA creó para ti! Cocina tus favoritos de nuevo.",
    noSavedRecipes: "Aún no has guardado ninguna receta. ¡Vuelve al generador y crea algo delicioso!",
    backToGenerator: "Volver al Generador",

    viewImageBtn: "Ver Foto",
    generateImageBtn: "Generar Foto IA",
    generatingImage: "Creando Foto...",
    imageModalTitle: "Vista Previa Visual",

    safetyTitle: "Consejos de Seguridad",
    safetyBtn: "Ver Alertas",
    loadingSafety: "Analizando riesgos...",
    noSafetyTips: "No se identificaron riesgos específicos, ¡pero cocina siempre con atención!"
  },
  fr: {
    title: "Chef à Domicile",
    subtitle: "Votre Assistant Culinaire",
    heroTitle: "Réinventons votre recette ?",
    heroDesc: "Imaginé maîtriser la cuisine du jour au lendemain ? Avec notre IA, vous ne faites pas que cuisiner, vous créez. Nous simplifions chaque étape pour un résultat impeccable.",
    
    inputNameLabel: "Nom de la Recette de Base",
    inputNamePlaceholder: "Ex: Bœuf Stroganoff",
    inputFeedbackLabel: "Votre Avis (Optionnel)",
    inputFeedbackPlaceholder: "Ex: Trop acide, je voulais plus de texture...",
    inputIngredientsLabel: "Ingrédients de Base + Stock",
    inputIngredientsPlaceholder: "Ex: Poulet, Crème, Champignons...",
    inputMethodLabel: "Équipement de Cuisine",
    inputUtensilsLabel: "Ustensile Principal",
    
    cookingMethods: {
      Stove: "Cuisinière",
      Oven: "Four",
      AirFryer: "Air Fryer",
      Microwave: "Micro-ondes",
      Grill: "Gril",
      PressureCooker: "Autocuiseur"
    },

    utensils: {
      Pot: "Casserole",
      FryingPan: "Poêle",
      DeepPan: "Faitout",
      Wok: "Wok",
      BakingSheet: "Plaque de Cuisson",
      GlassDish: "Plat en Verre",
      Blender: "Blender",
      FoodProcessor: "Robot Culinaire",
      Mixer: "Batteur",
      GrillPan: "Poêle Gril",
      ClayPot: "Plat en Terre Cuite"
    },
    
    addButton: "Ajouter",
    emptyIngredients: "Listez les ingrédients utilisés ou disponibles.",
    generateButton: "Réimaginer la Recette",
    generating: "Évolution du Plat...",
    error: "Erreur de traitement. Vérifiez les données et réessayez.",
    suggestionsTitle: "Variations Évoluées",
    emptyState: "Remplissez les données ci-dessus pour voir la magie.",
    footer: "Chef à Domicile. Recettes réimaginées par intelligence artificielle.",
    
    evolution: "Évolution Culinaire",
    smartAdaptation: "Adaptation Intelligente",
    notebookBtn: "Carnet",

    focusLabel: "Focus de la Variation",
    changesLabel: "Changements Principaux",
    feedbackLabel: "Résolution du Feedback",
    ingredients: "Nouvelle Liste d'Ingrédients",
    instructions: "Instructions Révisées",
    minutes: "min",
    items: "Ingrédients",
    difficultyLabels: { Easy: "Facile", Medium: "Moyen", Hard: "Difficile" },

    saveBtn: "Enregistrer dans Mon Carnet",
    removeBtn: "Retirer du Carnet",
    remixBtn: "Utiliser comme Base",
    savePersuasion: "Cette recette a été générée exclusivement pour vous ! Ne la perdez pas. Enregistrez-la maintenant.",
    notebookTitle: "📚 Mon Carnet de Recettes Personnel",
    notebookDesc: "Voici tous les chefs-d'œuvre que notre IA a créés pour vous ! Cuisine-les à nouveau.",
    noSavedRecipes: "Vous n'avez pas encore enregistré de recettes. Retournez au générateur !",
    backToGenerator: "Retour au Générateur",

    viewImageBtn: "Voir Photo",
    generateImageBtn: "Générer Photo IA",
    generatingImage: "Création Photo...",
    imageModalTitle: "Aperçu Visuel",

    safetyTitle: "Conseils de Sécurité",
    safetyBtn: "Voir Alertes",
    loadingSafety: "Analyse des risques...",
    noSafetyTips: "Aucun risque spécifique identifié, mais cuisinez toujours avec attention !"
  },
  it: {
    title: "Chef in Casa",
    subtitle: "Il Tuo Assistente Culinario",
    heroTitle: "Reinventiamo la tua ricetta?",
    heroDesc: "Hai mai immaginato di padroneggiare la cucina da un giorno all'altro? Con la nostra IA, non cucini solo, crei. Semplifichiamo ogni passo per un risultato impeccabile.",
    
    inputNameLabel: "Nome Ricetta Base",
    inputNamePlaceholder: "Es: Stroganoff di Pollo",
    inputFeedbackLabel: "Il Tuo Feedback (Opzionale)",
    inputFeedbackPlaceholder: "Es: Era troppo acido, volevo più consistenza...",
    inputIngredientsLabel: "Ingredienti Base + Extra",
    inputIngredientsPlaceholder: "Es: Pollo, Panna, Funghi...",
    inputMethodLabel: "Attrezzatura da Cucina",
    inputUtensilsLabel: "Utensile Principale",
    
    cookingMethods: {
      Stove: "Fornelli",
      Oven: "Forno",
      AirFryer: "Friggitrice ad Aria",
      Microwave: "Microonde",
      Grill: "Griglia",
      PressureCooker: "Pentola a Pressione"
    },

    utensils: {
      Pot: "Pentola",
      FryingPan: "Padella",
      DeepPan: "Casseruola",
      Wok: "Wok",
      BakingSheet: "Teglia da Forno",
      GlassDish: "Pirofila",
      Blender: "Frullatore",
      FoodProcessor: "Robot da Cucina",
      Mixer: "Sbattitore",
      GrillPan: "Padella Grill",
      ClayPot: "Pentola di Terracotta"
    },
    
    addButton: "Aggiungi",
    emptyIngredients: "Elenca gli ingredienti usati o disponibili.",
    generateButton: "Reimmagina Ricetta",
    generating: "Evoluzione Piatto...",
    error: "Errore durante l'elaborazione. Controlla i dati e riprova.",
    suggestionsTitle: "Variazioni Evolute",
    emptyState: "Compila i dati sopra per vedere la magia.",
    footer: "Chef in Casa. Ricette reimmaginate dall'intelligenza artificiale.",
    
    evolution: "Evoluzione Culinaria",
    smartAdaptation: "Adattamento Intelligente",
    notebookBtn: "Quaderno",

    focusLabel: "Focus Variazione",
    changesLabel: "Cambiamenti Principali",
    feedbackLabel: "Risoluzione Feedback",
    ingredients: "Nuova Lista Ingredienti",
    instructions: "Istruzioni Riviste",
    minutes: "min",
    items: "Ingredienti",
    difficultyLabels: { Easy: "Facile", Medium: "Medio", Hard: "Difficile" },

    saveBtn: "Salva nel Mio Quaderno",
    removeBtn: "Rimuovi dal Quaderno",
    remixBtn: "Usa come Base",
    savePersuasion: "Questa ricetta è stata generata esclusivamente per te! Non perderla. Salvala ora.",
    notebookTitle: "📚 Il Mio Quaderno di Ricette Personale",
    notebookDesc: "Ecco tutti i capolavori che la nostra IA ha creato per te! Cucinati di nuovo i tuoi preferiti.",
    noSavedRecipes: "Non hai ancora salvato nessuna ricetta. Torna al generatore!",
    backToGenerator: "Torna al Generatore",

    viewImageBtn: "Vedi Foto",
    generateImageBtn: "Genera Foto IA",
    generatingImage: "Creazione Foto...",
    imageModalTitle: "Anteprima Visiva",

    safetyTitle: "Consigli di Sicurezza",
    safetyBtn: "Vedi Avvisi",
    loadingSafety: "Analisi rischi...",
    noSafetyTips: "Nessun rischio specifico identificato, ma cucina sempre con attenzione!"
  },
  de: {
    title: "Chef zu Hause",
    subtitle: "Ihr Kulinarischer Assistent",
    heroTitle: "Rezept neu erfinden?",
    heroDesc: "Haben Sie sich je vorgestellt, die Küche über Nacht zu meistern? Mit unserer KI kochen Sie nicht nur, Sie kreieren. Wir vereinfachen jeden Schritt für ein tadelloses Ergebnis.",
    
    inputNameLabel: "Basis-Rezeptname",
    inputNamePlaceholder: "z.B.: Hähnchen Stroganoff",
    inputFeedbackLabel: "Ihr Feedback (Optional)",
    inputFeedbackPlaceholder: "z.B.: Zu sauer, wollte mehr Textur...",
    inputIngredientsLabel: "Basiszutaten + Vorrat",
    inputIngredientsPlaceholder: "z.B.: Hähnchen, Sahne, Pilze...",
    inputMethodLabel: "Küchengeräte",
    inputUtensilsLabel: "Hauptutensil",
    
    cookingMethods: {
      Stove: "Herd",
      Oven: "Ofen",
      AirFryer: "Heißluftfritteuse",
      Microwave: "Mikrowelle",
      Grill: "Grill",
      PressureCooker: "Schnellkochtopf"
    },

    utensils: {
      Pot: "Topf",
      FryingPan: "Bratpfanne",
      DeepPan: "Schmortopf",
      Wok: "Wok",
      BakingSheet: "Backblech",
      GlassDish: "Glasauflaufform",
      Blender: "Mixer",
      FoodProcessor: "Küchenmaschine",
      Mixer: "Handmixer",
      GrillPan: "Grillpfanne",
      ClayPot: "Römertopf"
    },
    
    addButton: "Hinzufügen",
    emptyIngredients: "Listen Sie verwendete oder verfügbare Zutaten auf.",
    generateButton: "Rezept Neu Erfinden",
    generating: "Gericht wird entwickelt...",
    error: "Fehler bei der Verarbeitung. Daten prüfen und erneut versuchen.",
    suggestionsTitle: "Weiterentwickelte Variationen",
    emptyState: "Daten oben ausfüllen, um die Magie zu starten.",
    footer: "Chef zu Hause. Rezepte neu erfunden durch künstliche Intelligenz.",
    
    evolution: "Kulinarische Evolution",
    smartAdaptation: "Intelligente Anpassung",
    notebookBtn: "Notizbuch",

    focusLabel: "Variationsfokus",
    changesLabel: "Hauptänderungen",
    feedbackLabel: "Feedback-Lösung",
    ingredients: "Neue Zutatenliste",
    instructions: "Überarbeitete Anleitung",
    minutes: "Min",
    items: "Zutaten",
    difficultyLabels: { Easy: "Einfach", Medium: "Mittel", Hard: "Schwer" },

    saveBtn: "In Mein Notizbuch Speichern",
    removeBtn: "Aus Notizbuch Entfernen",
    remixBtn: "Als Basis verwenden",
    savePersuasion: "Dieses Rezept wurde exklusiv für Sie erstellt! Verlieren Sie es nicht. Speichern Sie es jetzt.",
    notebookTitle: "📚 Mein Persönliches Rezeptbuch",
    notebookDesc: "Hier sind alle Meisterwerke, die unsere KI für Sie erstellt hat! Kochen Sie Ihre Favoriten erneut.",
    noSavedRecipes: "Sie haben noch keine Rezepte gespeichert. Gehen Sie zurück zum Generator!",
    backToGenerator: "Zurück zum Generator",

    viewImageBtn: "Foto Ansehen",
    generateImageBtn: "KI-Foto Generieren",
    generatingImage: "Erstelle Foto...",
    imageModalTitle: "Visuelle Vorschau",

    safetyTitle: "Sicherheitshinweise",
    safetyBtn: "Warnungen",
    loadingSafety: "Risikoanalyse...",
    noSafetyTips: "Keine spezifischen Risiken identifiziert, aber kochen Sie immer vorsichtig!"
  },
  ja: {
    title: "おうちシェフ",
    subtitle: "あなたの料理アシスタント",
    heroTitle: "レシピを再発明しませんか？",
    heroDesc: "一晩で料理をマスターすることを想像したことがありますか？私たちのAIを使えば、ただ料理するだけでなく、創造することができます。完璧な結果を保証するために、すべてのステップを簡素化します。",
    
    inputNameLabel: "基本レシピ名",
    inputNamePlaceholder: "例：チキンストロガノフ",
    inputFeedbackLabel: "感想（オプション）",
    inputFeedbackPlaceholder: "例：酸味が強すぎた、もっと食感が欲しかった...",
    inputIngredientsLabel: "基本材料 ＋ 在庫",
    inputIngredientsPlaceholder: "例：鶏肉、生クリーム、マッシュルーム...",
    inputMethodLabel: "調理器具",
    inputUtensilsLabel: "主な調理器具",
    
    cookingMethods: {
      Stove: "コンロ",
      Oven: "オーブン",
      AirFryer: "エアフライヤー",
      Microwave: "電子レンジ",
      Grill: "グリル",
      PressureCooker: "圧力鍋"
    },

    utensils: {
      Pot: "鍋",
      FryingPan: "フライパン",
      DeepPan: "深鍋",
      Wok: "中華鍋",
      BakingSheet: "天板",
      GlassDish: "耐熱ガラス皿",
      Blender: "ミキサー",
      FoodProcessor: "フードプロセッサー",
      Mixer: "ハンドミキサー",
      GrillPan: "グリルパン",
      ClayPot: "土鍋"
    },
    
    addButton: "追加",
    emptyIngredients: "使用した材料または利用可能な材料をリストしてください。",
    generateButton: "レシピを再考する",
    generating: "料理を進化中...",
    error: "処理中にエラーが発生しました。データを確認して再試行してください。",
    suggestionsTitle: "進化したバリエーション",
    emptyState: "上記のデータを入力して魔法を始めましょう。",
    footer: "おうちシェフ。人工知能によって再考されたレシピ。",
    
    evolution: "料理の進化",
    smartAdaptation: "スマート適応",
    notebookBtn: "ノート",

    focusLabel: "バリエーションの焦点",
    changesLabel: "主な変更点",
    feedbackLabel: "フィードバックの解決",
    ingredients: "新しい材料リスト",
    instructions: "改訂された手順",
    minutes: "分",
    items: "アイテム",
    difficultyLabels: { Easy: "簡単", Medium: "普通", Hard: "難しい" },

    saveBtn: "マイノートに保存",
    removeBtn: "ノートから削除",
    remixBtn: "ベースとして使用",
    savePersuasion: "このレシピはあなた専用に生成されました！失わないでください。今すぐマイノートに保存しましょう。",
    notebookTitle: "📚 私の個人的なレシピノート",
    notebookDesc: "AIがあなたのために作成したすべての傑作がここにあります！お気に入りをもう一度作りましょう。",
    noSavedRecipes: "まだレシピを保存していません。ジェネレーターに戻ってください！",
    backToGenerator: "ジェネレーターに戻る",

    viewImageBtn: "写真を見る",
    generateImageBtn: "AI写真を生成",
    generatingImage: "写真を作成中...",
    imageModalTitle: "ビジュアルプレビュー",

    safetyTitle: "安全上のヒント",
    safetyBtn: "警告を見る",
    loadingSafety: "リスク分析中...",
    noSafetyTips: "特定のリスクは確認されませんでしたが、常に注意して調理してください！"
  },
  ko: {
    title: "홈 셰프",
    subtitle: "당신의 요리 어시스턴트",
    heroTitle: "레시피를 재발명할까요?",
    heroDesc: "하루아침에 요리를 마스터하는 상상을 해보셨나요? 저희 AI와 함께라면 단순한 요리가 아니라 창조를 하게 됩니다. 항상 완벽한 결과를 보장하기 위해 모든 단계를 간소화합니다.",
    
    inputNameLabel: "기본 레시피 이름",
    inputNamePlaceholder: "예: 치킨 스트로가노프",
    inputFeedbackLabel: "피드백 (선택 사항)",
    inputFeedbackPlaceholder: "예: 너무 시큼했어요, 더 바삭한 식감을 원해요...",
    inputIngredientsLabel: "기본 재료 + 추가 재료",
    inputIngredientsPlaceholder: "예: 닭고기, 생크림, 버섯...",
    inputMethodLabel: "조리 도구",
    inputUtensilsLabel: "주요 도구",
    
    cookingMethods: {
      Stove: "가스레인지/인덕션",
      Oven: "오븐",
      AirFryer: "에어프라이어",
      Microwave: "전자레인지",
      Grill: "그릴",
      PressureCooker: "압력솥"
    },

    utensils: {
      Pot: "냄비",
      FryingPan: "프라이팬",
      DeepPan: "깊은 팬/전골냄비",
      Wok: "웍",
      BakingSheet: "베이킹 시트/트레이",
      GlassDish: "내열 유리 접시",
      Blender: "블렌더/믹서기",
      FoodProcessor: "푸드 프로세서",
      Mixer: "핸드 믹서",
      GrillPan: "그릴 팬",
      ClayPot: "뚝배기"
    },
    
    addButton: "추가",
    emptyIngredients: "사용했거나 사용 가능한 재료를 나열하세요.",
    generateButton: "레시피 재구성",
    generating: "요리 진화 중...",
    error: "처리 중 오류가 발생했습니다. 데이터를 확인하고 다시 시도하세요.",
    suggestionsTitle: "진화된 변형",
    emptyState: "위의 데이터를 입력하여 마법을 시작하세요.",
    footer: "홈 셰프. 인공지능에 의해 재구성된 레시피.",
    
    evolution: "요리의 진화",
    smartAdaptation: "스마트 적응",
    notebookBtn: "노트",

    focusLabel: "변형 초점",
    changesLabel: "주요 변경 사항",
    feedbackLabel: "피드백 해결",
    ingredients: "새로운 재료 목록",
    instructions: "수정된 조리법",
    minutes: "분",
    items: "재료",
    difficultyLabels: { Easy: "쉬움", Medium: "보통", Hard: "어려움" },

    saveBtn: "내 노트에 저장",
    removeBtn: "노트에서 제거",
    remixBtn: "베이스로 사용",
    savePersuasion: "이 레시피는 당신만을 위해 생성되었습니다! 잃어버리지 마세요. 지금 내 노트에 저장하세요.",
    notebookTitle: "📚 내 개인 레시피 노트",
    notebookDesc: "AI가 당신을 위해 만든 모든 걸작이 여기 있습니다! 좋아하는 요리를 다시 만드세요.",
    noSavedRecipes: "아직 저장된 레시피가 없습니다. 생성기로 돌아가세요!",
    backToGenerator: "생성기로 돌아가기",

    viewImageBtn: "사진 보기",
    generateImageBtn: "AI 사진 생성",
    generatingImage: "사진 생성 중...",
    imageModalTitle: "비주얼 미리보기",

    safetyTitle: "안전 팁 및 주의사항",
    safetyBtn: "경고 보기",
    loadingSafety: "위험 분석 중...",
    noSafetyTips: "특별한 위험은 식별되지 않았지만, 항상 주의해서 요리하세요!"
  }
};