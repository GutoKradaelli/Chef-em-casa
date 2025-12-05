
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, BookOpen, Grid, X } from 'lucide-react';
import { Recipe } from '../types';
import RecipeCard from './RecipeCard';
import RecipeMiniCard from './RecipeMiniCard';
import { Translation } from '../constants/translations';

interface RecipeNotebookProps {
  savedRecipes: Recipe[];
  onRemoveRecipe: (recipe: Recipe) => void;
  onBack: () => void;
  t: Translation;
  onUpdateRecipe?: (recipe: Recipe) => void;
}

const RecipeNotebook: React.FC<RecipeNotebookProps> = ({ savedRecipes, onRemoveRecipe, onBack, t, onUpdateRecipe }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleRemove = (recipe: Recipe, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onRemoveRecipe(recipe);
    if (selectedRecipe?.id === recipe.id) {
      setSelectedRecipe(null);
    }
  };

  const handleUpdate = (updatedRecipe: Recipe) => {
    if (onUpdateRecipe) {
      onUpdateRecipe(updatedRecipe);
    }
    // Update local selected recipe if needed
    if (selectedRecipe && selectedRecipe.id === updatedRecipe.id) {
        setSelectedRecipe(updatedRecipe);
    }
  };
  
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedRecipe) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedRecipe]);

  return (
    <div className="animate-fadeIn relative">
      {/* Notebook Header */}
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-orange-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 transition-colors">
          {t.notebookTitle}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg transition-colors">
          {t.notebookDesc}
        </p>
      </div>

      {/* Navigation */}
      <div className="mb-8 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.backToGenerator}
        </button>
        
        {savedRecipes.length > 0 && (
            <span className="text-sm text-gray-400 dark:text-gray-500 flex items-center gap-1">
                <Grid className="w-4 h-4" />
                {savedRecipes.length} {savedRecipes.length === 1 ? 'Receita' : 'Receitas'}
            </span>
        )}
      </div>

      {/* Grid - 2 Columns on Mobile/Desktop */}
      {savedRecipes.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {savedRecipes.map((recipe, index) => (
            <div key={recipe.id || index}>
                <RecipeMiniCard 
                    recipe={recipe} 
                    t={t}
                    onClick={() => setSelectedRecipe(recipe)}
                    onRemove={(e) => handleRemove(recipe, e)}
                    onUpdate={handleUpdate}
                />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-gray-300 dark:border-slate-700">
          <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">{t.noSavedRecipes}</p>
        </div>
      )}

      {/* Full Screen Modal Overlay */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Dark Overlay with 0.8 opacity */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedRecipe(null)}
          />
          
          {/* Modal Content - Centered */}
          <div className="relative w-full max-w-4xl h-[90vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
             
             {/* Close Button */}
             <button 
                onClick={() => setSelectedRecipe(null)} 
                className="absolute top-4 right-6 z-50 p-2 bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white rounded-full backdrop-blur-md transition-all hover:rotate-90 shadow-sm border border-white/20"
             >
               <X className="w-6 h-6" />
             </button>

             {/* Scrollable Container */}
             <div 
                ref={modalContentRef}
                className="overflow-y-scroll h-full scroll-smooth"
             >
                 <RecipeCard 
                    recipe={selectedRecipe} 
                    index={0} 
                    t={t} 
                    isSaved={true}
                    onRemove={(r) => handleRemove(r)}
                    onUpdate={handleUpdate}
                    autoHeight={true}
                    className="min-h-full shadow-none border-0 rounded-none dark:bg-slate-900" 
                 />
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeNotebook;
