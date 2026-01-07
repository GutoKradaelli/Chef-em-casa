
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChefHat, UtensilsCrossed, Sparkles, Moon, Sun, BookHeart, 
  Pizza, Soup, Carrot, Coffee, Croissant, Cookie, GlassWater, Utensils,
  Apple, Banana, Beef, Beer, Cake, Candy, Cherry, Citrus, 
  CupSoda, Donut, Drumstick, Egg, Fish, Grape, IceCream, Martini, 
  Milk, Nut, Popsicle, Sandwich, Wheat, Wine, Salad, Popcorn
} from 'lucide-react';
import IngredientInput from './components/IngredientInput';
import RecipeCard from './components/RecipeCard';
import RecipeNotebook from './components/RecipeNotebook';
import { generateRecipes } from './services/geminiService';
import { Recipe } from './types';
import { translations, LanguageCode } from './constants/translations';

function App() {
  const [recipeName, setRecipeName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [cookingMethod, setCookingMethod] = useState('Stove'); // Default cooking method
  const [utensil, setUtensil] = useState('Pot'); // Default utensil
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Settings State
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>('pt');
  const [showLangMenu, setShowLangMenu] = useState(false);
  
  // Notebook State
  const [view, setView] = useState<'generator' | 'notebook'>('generator');
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);

  const t = translations[language];

  // Generate background doodles only once to avoid re-renders shuffling them
  const doodles = useMemo(() => {
    const icons = [
      Pizza, Soup, Carrot, Coffee, Croissant, Cookie, GlassWater, Utensils,
      Apple, Banana, Beef, Beer, Cake, Candy, Cherry, Citrus, 
      CupSoda, Donut, Drumstick, Egg, Fish, Grape, IceCream, Martini, 
      Milk, Nut, Popsicle, Sandwich, Wheat, Wine, Salad, Popcorn, ChefHat
    ];

    // Generate 80 random doodle positions
    return Array.from({ length: 80 }).map((_, i) => {
      const Icon = icons[i % icons.length];
      return {
        id: i,
        Icon,
        top: Math.random() * 100, // 0 to 100%
        left: Math.random() * 100, // 0 to 100%
        size: 16 + Math.random() * 24, // 16px to 40px (Smaller sizes)
        rotation: Math.random() * 360,
        opacity: 0.03 + Math.random() * 0.04 // Very subtle opacity
      };
    });
  }, []);

  // Dark Mode Effect
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Load Saved Recipes from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('chefEmCasa_savedRecipes');
    if (saved) {
      try {
        setSavedRecipes(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved recipes", e);
      }
    }
  }, []);

  // Save changes to LocalStorage
  const updateSavedRecipes = (newRecipes: Recipe[]) => {
    setSavedRecipes(newRecipes);
    localStorage.setItem('chefEmCasa_savedRecipes', JSON.stringify(newRecipes));
  };

  const handleSaveRecipe = (recipe: Recipe) => {
    if (!savedRecipes.some(r => r.id === recipe.id)) {
      updateSavedRecipes([recipe, ...savedRecipes]);
    }
  };

  const handleRemoveRecipe = (recipe: Recipe) => {
    updateSavedRecipes(savedRecipes.filter(r => r.id !== recipe.id));
  };
  
  // Handle recipe updates (e.g. adding an image URL)
  const handleUpdateRecipe = (updatedRecipe: Recipe) => {
    // 1. Update in the current generated list
    setRecipes(prevRecipes => 
        prevRecipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r)
    );
    
    // 2. Update in saved recipes (if it exists there)
    if (savedRecipes.some(r => r.id === updatedRecipe.id)) {
        updateSavedRecipes(
            savedRecipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r)
        );
    }
  };

  // Remix a recipe: Load its data back into the generator
  const handleRemixRecipe = (recipe: Recipe) => {
    setRecipeName(recipe.name);
    setIngredients(recipe.ingredients); // Use the final ingredients as the new base
    setFeedback(''); // Reset feedback so user can provide new direction, or could be pre-filled
    setRecipes([]); // Clear current results to avoid confusion
    setView('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddIngredient = (ingredient: string) => {
    if (!ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setRecipes([]);
    try {
      const data = await generateRecipes(recipeName, feedback, ingredients, cookingMethod, utensil, language);
      // Assign IDs to new recipes so they can be tracked/saved
      const recipesWithIds = data.recipes.map(r => ({
        ...r,
        id: crypto.randomUUID()
      }));
      setRecipes(recipesWithIds);
    } catch (err: any) {
      setError(t.error);
    } finally {
      setIsLoading(false);
    }
  };

  // Flag codes for FlagCDN (ISO 3166-1 alpha-2)
  const languages: { code: LanguageCode; label: string; flagCode: string }[] = [
    { code: 'pt', label: 'Português', flagCode: 'br' },
    { code: 'en', label: 'English', flagCode: 'us' },
    { code: 'es', label: 'Español', flagCode: 'es' },
    { code: 'fr', label: 'Français', flagCode: 'fr' },
    { code: 'it', label: 'Italiano', flagCode: 'it' },
    { code: 'de', label: 'Deutsch', flagCode: 'de' },
    { code: 'ja', label: '日本語', flagCode: 'jp' },
    { code: 'ko', label: '한국어', flagCode: 'kr' },
  ];

  const handleLanguageChange = (code: LanguageCode) => {
    setLanguage(code);
    setShowLangMenu(false);
    if (recipes.length > 0) {
      setRecipes([]);
    }
  };

  const currentLangObj = languages.find(l => l.code === language) || languages[0];

  return (
    <div className="min-h-screen bg-[#FEFBF6] dark:bg-slate-950 text-gray-800 dark:text-gray-100 pb-20 transition-colors duration-500 relative overflow-x-hidden font-sans selection:bg-orange-200 dark:selection:bg-orange-900">
      
      {/* BACKGROUND ACCENTS (Blobs) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Top Right - Warm Orange Glow */}
        <div className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] bg-orange-200/40 dark:bg-orange-900/10 rounded-full blur-[100px] opacity-70"></div>
        
        {/* Bottom Left - Soft Yellow/Red Glow */}
        <div className="absolute -bottom-[10%] -left-[10%] w-[500px] h-[500px] bg-yellow-200/30 dark:bg-slate-800/40 rounded-full blur-[80px] opacity-60"></div>
        
        {/* Center - Subtle Tint */}
        <div className="absolute top-[20%] left-[30%] w-[300px] h-[300px] bg-red-100/30 dark:bg-red-900/5 rounded-full blur-[60px] opacity-40"></div>
      </div>

      {/* DOODLE BACKGROUND PATTERN (Randomized & Dense) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {doodles.map((doodle) => (
          <doodle.Icon
            key={doodle.id}
            className="absolute text-gray-900 dark:text-white"
            strokeWidth={1.5}
            style={{
              top: `${doodle.top}%`,
              left: `${doodle.left}%`,
              width: `${doodle.size}px`,
              height: `${doodle.size}px`,
              transform: `rotate(${doodle.rotation}deg)`,
              opacity: doodle.opacity
            }}
          />
        ))}
      </div>

      {/* Floating Controls - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-[60] flex gap-3">
        {/* Language Button */}
        <div className="relative">
          {/* Menu opens UPWARDS (bottom-full mb-3) */}
          {showLangMenu && (
             <div className="absolute bottom-full right-0 mb-3 w-48 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200">
               {languages.map((lang) => (
                 <button
                   key={lang.code}
                   onClick={() => handleLanguageChange(lang.code)}
                   className={`w-full text-left px-4 py-3 text-sm hover:bg-orange-50 dark:hover:bg-slate-700 flex items-center gap-3 transition-colors ${language === lang.code ? 'bg-orange-50 dark:bg-slate-700 text-orange-600 dark:text-orange-400 font-bold' : 'text-gray-700 dark:text-gray-300'}`}
                 >
                   <img 
                     src={`https://flagcdn.com/w40/${lang.flagCode}.png`} 
                     srcSet={`https://flagcdn.com/w80/${lang.flagCode}.png 2x`}
                     alt={lang.label} 
                     className="w-6 h-auto rounded shadow-sm"
                   />
                   {lang.label}
                 </button>
               ))}
             </div>
          )}
          
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-2 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-white dark:border-slate-700 hover:scale-105 transition-transform w-12 h-12 flex items-center justify-center ring-1 ring-gray-100 dark:ring-slate-700"
            aria-label="Change Language"
          >
            <img 
              src={`https://flagcdn.com/w40/${currentLangObj.flagCode}.png`} 
              srcSet={`https://flagcdn.com/w80/${currentLangObj.flagCode}.png 2x`}
              alt={currentLangObj.label} 
              className="w-8 h-auto rounded shadow-sm"
            />
          </button>
        </div>

        {/* Theme Button */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="bg-slate-900/90 dark:bg-white/90 backdrop-blur-sm text-white dark:text-slate-900 p-3 rounded-2xl shadow-xl hover:scale-105 transition-transform w-12 h-12 flex items-center justify-center ring-2 ring-white/20 dark:ring-slate-900/20"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </div>

      {/* Header / Hero */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-orange-100/50 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo - Click to go home */}
          <div 
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={() => setView('generator')}
          >
            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2.5 rounded-xl text-white shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 group-hover:scale-105 transition-all duration-300">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-none tracking-tight">{t.title}</h1>
              <p className="text-xs text-orange-500 font-bold uppercase tracking-wide mt-0.5">{t.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
             {/* Desktop Badges (only if generator) */}
             <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-500 dark:text-gray-400 mr-4">
                {view === 'generator' && (
                  <>
                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 border border-purple-100 dark:border-purple-900/30">
                        <Sparkles className="w-3.5 h-3.5" />
                        {t.evolution}
                    </span>
                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-900/30">
                        <UtensilsCrossed className="w-3.5 h-3.5" />
                        {t.smartAdaptation}
                    </span>
                  </>
                )}
             </div>

             {/* Notebook Button - Prominent Icon Only Style - ROUNDED SQUARE */}
             <button
               onClick={() => setView(view === 'notebook' ? 'generator' : 'notebook')}
               className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl shadow-xl transition-all flex items-center justify-center overflow-visible group/btn z-10 ${
                 view === 'notebook' 
                   ? 'bg-orange-600 text-white shadow-orange-500/30 ring-4 ring-orange-100 dark:ring-orange-900/30 scale-105'
                   : 'bg-gradient-to-br from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/40'
               }`}
               title={t.notebookBtn}
             >
                <div className="relative">
                    <BookHeart className="w-7 h-7 md:w-8 md:h-8 animate-float drop-shadow-md" />
                </div>
                
                {savedRecipes.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white text-orange-600 text-xs font-black h-6 w-6 flex items-center justify-center rounded-full shadow-lg border-2 border-orange-50 dark:border-slate-800 z-10 scale-100 animate-in zoom-in duration-300">
                        {savedRecipes.length}
                    </span>
                )}
             </button>
          </div>
        </div>
      </header>

      {/* Main Content Area - Z-Index 10 to sit above background */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        
        {view === 'notebook' ? (
          <RecipeNotebook 
            savedRecipes={savedRecipes} 
            onRemoveRecipe={handleRemoveRecipe} 
            onBack={() => setView('generator')}
            t={t}
            onUpdateRecipe={handleUpdateRecipe}
          />
        ) : (
          <>
            {/* Intro Text */}
            <div className="text-center mb-10 max-w-3xl mx-auto animate-fadeIn">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
                {t.heroTitle}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl font-light leading-relaxed">
                {t.heroDesc}
              </p>
            </div>

            {/* Input Section */}
            <div className="mb-16 animate-slideUp">
              <IngredientInput
                recipeName={recipeName}
                setRecipeName={setRecipeName}
                feedback={feedback}
                setFeedback={setFeedback}
                ingredients={ingredients}
                cookingMethod={cookingMethod}
                setCookingMethod={setCookingMethod}
                utensil={utensil}
                setUtensil={setUtensil}
                onAddIngredient={handleAddIngredient}
                onRemoveIngredient={handleRemoveIngredient}
                onGenerate={handleGenerate}
                isLoading={isLoading}
                t={t}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="max-w-2xl mx-auto mb-10 p-6 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/50 text-red-600 dark:text-red-300 rounded-2xl flex items-center justify-center text-center shadow-sm">
                <p className="font-medium">{error}</p>
              </div>
            )}

            {/* Results Section */}
            {recipes.length > 0 && (
              <div className="animate-slideUp delay-200">
                <div className="flex items-center justify-center gap-4 mb-10">
                  <span className="h-px w-16 bg-gradient-to-r from-transparent via-orange-300 to-transparent dark:via-orange-800"></span>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-orange-500 animate-pulse" />
                    {t.suggestionsTitle}
                  </h3>
                  <span className="h-px w-16 bg-gradient-to-r from-transparent via-orange-300 to-transparent dark:via-orange-800"></span>
                </div>
                
                {/* Grid for 3 items */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto pb-10">
                  {recipes.map((recipe, index) => {
                    const isSaved = savedRecipes.some(r => r.id === recipe.id);
                    return (
                        <RecipeCard 
                            key={recipe.id || index} 
                            recipe={recipe} 
                            index={index} 
                            t={t} 
                            onSave={handleSaveRecipe}
                            onRemove={isSaved ? handleRemoveRecipe : undefined}
                            onUpdate={handleUpdateRecipe}
                            onRemix={handleRemixRecipe}
                            isSaved={isSaved}
                        />
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Empty State / Illustration when no results and not loading */}
            {recipes.length === 0 && !isLoading && !error && (
              <div className="text-center mt-12 opacity-40 hover:opacity-60 transition-opacity select-none">
                <ChefHat className="w-24 h-24 mx-auto text-gray-300 dark:text-slate-700 mb-4" />
                <p className="text-sm font-medium text-gray-400 dark:text-slate-600 uppercase tracking-widest">{t.emptyState}</p>
              </div>
            )}
          </>
        )}

      </main>

      <footer className="border-t border-gray-100 dark:border-slate-800 mt-auto bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm py-8 transition-colors relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 dark:text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} {t.footer}
        </div>
      </footer>
    </div>
  );
}

export default App;
