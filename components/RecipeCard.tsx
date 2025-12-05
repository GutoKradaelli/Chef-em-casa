
import React, { useState, useRef, useEffect } from 'react';
import { Clock, ChefHat, CheckCircle2, ArrowRight, Signal, AlertCircle, Bookmark, Camera, Loader2, Image as ImageIcon, Pencil, Check, TriangleAlert, RefreshCw } from 'lucide-react';
import { Recipe, Difficulty } from '../types';
import { Translation } from '../constants/translations';
import { generateRecipeImage, generateSafetyTips } from '../services/geminiService';
import ImageModal from './ImageModal';
import SafetyModal from './SafetyModal';

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
  t: Translation;
  onSave?: (recipe: Recipe) => void;
  onRemove?: (recipe: Recipe) => void;
  onUpdate?: (recipe: Recipe) => void; // Callback to save changes (like image URL or name)
  onRemix?: (recipe: Recipe) => void; // New prop for remixing
  isSaved?: boolean;
  className?: string;
  autoHeight?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  index, 
  t, 
  onSave, 
  onRemove, 
  onUpdate,
  onRemix,
  isSaved = false, 
  className = '',
  autoHeight = false
}) => {
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  
  // Safety Tips State
  const [isLoadingSafety, setIsLoadingSafety] = useState(false);
  const [showSafetyModal, setShowSafetyModal] = useState(false);

  // Editing state
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(recipe.name);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditingName]);

  // Sync state if prop changes
  useEffect(() => {
    setEditedName(recipe.name);
  }, [recipe.name]);
  
  // Define styles based on difficulty
  const styles = {
    [Difficulty.Easy]: {
      border: 'border-green-200 dark:border-green-800',
      bg: 'bg-green-50/10 dark:bg-green-900/10',
      title: 'text-green-700 dark:text-green-300',
      icon: 'text-green-500',
      badge: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200',
      step: 'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/30 dark:border-green-800 dark:text-green-200',
      dot: 'bg-green-400',
      accent: 'bg-green-500'
    },
    [Difficulty.Medium]: {
      border: 'border-orange-200 dark:border-orange-800',
      bg: 'bg-orange-50/10 dark:bg-orange-900/10',
      title: 'text-orange-700 dark:text-orange-300',
      icon: 'text-orange-500',
      badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200',
      step: 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/30 dark:border-orange-800 dark:text-orange-200',
      dot: 'bg-orange-400',
      accent: 'bg-orange-500'
    },
    [Difficulty.Hard]: {
      border: 'border-red-200 dark:border-red-800',
      bg: 'bg-red-50/10 dark:bg-red-900/10',
      title: 'text-red-700 dark:text-red-300',
      icon: 'text-red-500',
      badge: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200',
      step: 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/30 dark:border-red-800 dark:text-red-200',
      dot: 'bg-red-400',
      accent: 'bg-red-500'
    }
  };

  const style = styles[recipe.difficulty] || styles[Difficulty.Medium];

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved && onRemove) {
        onRemove(recipe);
    } else if (!isSaved && onSave) {
        onSave(recipe);
    }
  };

  const handleRemixClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemix) {
        onRemix(recipe);
    }
  };

  const handleSaveName = () => {
    if (editedName.trim() !== recipe.name && onUpdate) {
        onUpdate({ ...recipe, name: editedName.trim() });
    }
    setIsEditingName(false);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        handleSaveName();
    }
    if (e.key === 'Escape') {
        setEditedName(recipe.name);
        setIsEditingName(false);
    }
  };

  const handleGenerateImage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (recipe.imageUrl) {
        setShowImageModal(true);
        return;
    }

    setIsGeneratingImg(true);
    try {
        const imageUrl = await generateRecipeImage(recipe.name, recipe.ingredients);
        const updatedRecipe = { ...recipe, imageUrl };
        
        if (onUpdate) {
            onUpdate(updatedRecipe);
        }
        
        setShowImageModal(true);
    } catch (err) {
        console.error("Failed to generate image", err);
        alert("Could not generate image. Please try again.");
    } finally {
        setIsGeneratingImg(false);
    }
  };

  const handleSafetyTips = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (recipe.safetyTips && recipe.safetyTips.length > 0) {
        setShowSafetyModal(true);
        return;
    }

    setIsLoadingSafety(true);
    try {
        let langCode: any = 'pt';
        if (t.saveBtn === "Save to My Notebook") langCode = 'en';
        if (t.saveBtn === "Guardar en Mi Cuaderno") langCode = 'es';
        
        const tips = await generateSafetyTips(recipe.name, recipe.ingredients, recipe.steps, langCode);
        const updatedRecipe = { ...recipe, safetyTips: tips };

        if (onUpdate) {
            onUpdate(updatedRecipe);
        }
        setShowSafetyModal(true);
    } catch (err) {
        console.error("Failed to generate safety tips", err);
    } finally {
        setIsLoadingSafety(false);
    }
  };

  return (
    <>
    <div className={`bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border ${style.border} ${style.bg} hover:shadow-md transition-all duration-300 flex flex-col group ${autoHeight ? 'h-auto' : 'h-full'} ${className}`}>
      
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-slate-700 relative overflow-hidden flex-shrink-0">
        {/* Decorative background accent */}
        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 ${style.accent}`}></div>

        <div className="flex flex-row items-start justify-between gap-4 mb-4 relative z-10">
          
          {/* Left Side: Badges Grouped */}
          <div className="flex flex-wrap items-center gap-2 pr-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1 bg-white/50 dark:bg-black/20 ${style.title}`}>
                <Signal className="w-3 h-3" />
                {recipe.focus}
            </span>
            
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${style.badge}`}>
                {t.difficultyLabels[recipe.difficulty]}
            </span>
          </div>
          
          {/* Right Side: Actions Grouped */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {/* Remix Button */}
            {onRemix && (
                <button
                    onClick={handleRemixClick}
                    className="p-2 rounded-full hover:bg-white/50 dark:hover:bg-black/20 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-200 dark:focus:ring-blue-900 group/remix"
                    title={t.remixBtn}
                >
                    <RefreshCw className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover/remix:text-blue-500 transition-colors" />
                </button>
            )}

            {/* AI Image Button */}
            <button
                onClick={handleGenerateImage}
                disabled={isGeneratingImg}
                className="p-2 rounded-full hover:bg-white/50 dark:hover:bg-black/20 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-200 dark:focus:ring-purple-900 group/img"
                title={recipe.imageUrl ? t.viewImageBtn : t.generateImageBtn}
            >
                {isGeneratingImg ? (
                    <Loader2 className="w-6 h-6 text-purple-500 animate-spin" />
                ) : recipe.imageUrl ? (
                    <ImageIcon className="w-6 h-6 text-purple-500 fill-purple-100 dark:fill-purple-900/50" />
                ) : (
                    <Camera className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover/img:text-purple-500 transition-colors" />
                )}
            </button>
            
            {/* Save Button */}
            {(onSave || onRemove) && (
                <button
                    onClick={handleSaveClick}
                    className="p-2 rounded-full hover:bg-white/50 dark:hover:bg-black/20 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-200 dark:focus:ring-orange-900"
                    title={isSaved ? t.removeBtn : t.saveBtn}
                >
                    <Bookmark 
                        className={`w-6 h-6 transition-all duration-300 ${
                            isSaved 
                            ? 'fill-orange-500 text-orange-500 scale-110' 
                            : 'text-gray-400 dark:text-gray-500 hover:text-orange-500 hover:scale-110'
                        }`} 
                    />
                </button>
            )}
          </div>
        </div>

        {/* Editable Title */}
        <div className="mb-2 min-h-[2rem]">
            {isEditingName ? (
                <div className="flex items-center gap-2">
                    <input
                        ref={nameInputRef}
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        onBlur={handleSaveName}
                        onKeyDown={handleNameKeyDown}
                        className={`w-full bg-transparent text-2xl font-bold border-b-2 ${style.border} focus:outline-none ${style.title}`}
                    />
                    <button onClick={handleSaveName} className="text-green-500 p-1">
                        <Check className="w-5 h-5" />
                    </button>
                </div>
            ) : (
                <h3 className={`text-2xl font-bold leading-tight flex flex-wrap items-center gap-2 ${style.title}`}>
                     {recipe.name}
                     
                     {/* Safety Button Inline with Title */}
                     <button
                        onClick={handleSafetyTips}
                        disabled={isLoadingSafety}
                        className="inline-flex items-center justify-center p-1 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all focus:outline-none"
                        title={t.safetyBtn}
                    >
                        {isLoadingSafety ? (
                            <Loader2 className="w-5 h-5 text-amber-500 animate-spin" />
                        ) : (
                            <TriangleAlert className={`w-5 h-5 ${recipe.safetyTips ? 'text-amber-500 fill-amber-100 dark:fill-amber-900/50' : 'text-gray-300 dark:text-gray-600 hover:text-amber-500'} transition-colors`} />
                        )}
                    </button>

                     {/* Edit Button only if onUpdate is provided */}
                     {onUpdate && (
                        <button 
                            onClick={(e) => { e.stopPropagation(); setIsEditingName(true); }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-orange-500"
                            title="Editar Título"
                        >
                            <Pencil className="w-4 h-4" />
                        </button>
                     )}
                </h3>
            )}
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className={`w-4 h-4 ${style.icon}`} />
            {recipe.time} {t.minutes}
          </div>
          <div className="flex items-center gap-1.5">
            <AlertCircle className={`w-4 h-4 ${style.icon}`} />
            {recipe.ingredients.length} {t.items}
          </div>
          {/* Badge Display for Diet Attributes */}
          {recipe.dietAttributes && recipe.dietAttributes.length > 0 && (
            <div className="hidden sm:flex items-center gap-1.5">
               <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-slate-700 rounded-md">
                 {recipe.dietAttributes[0]}
               </span>
               {recipe.dietAttributes.length > 1 && (
                 <span className="text-xs text-gray-400">+{recipe.dietAttributes.length - 1}</span>
               )}
            </div>
          )}
        </div>

        {/* Feedback Resolution Box - Smaller */}
        <div className="bg-white/60 dark:bg-black/20 rounded-lg p-2 text-xs border border-gray-100 dark:border-slate-700/50">
            <p className="font-semibold text-gray-700 dark:text-gray-200 mb-0.5 flex items-center gap-1.5">
                <CheckCircle2 className={`w-3.5 h-3.5 ${style.icon}`} />
                {t.feedbackLabel}:
            </p>
            <p className="text-gray-600 dark:text-gray-400 italic leading-relaxed">"{recipe.explanation}"</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col gap-6">
        
        {/* Main Changes */}
        <div>
           <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 text-sm uppercase tracking-wide opacity-80">
             {t.changesLabel}
           </h4>
           <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-700/50 p-3 rounded-lg border border-gray-100 dark:border-slate-700">
             {recipe.changes}
           </p>
        </div>

        {/* Ingredients List */}
        <div>
          <h4 className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-100 mb-3">
            <ChefHat className="w-5 h-5 text-gray-400" />
            {t.ingredients}
          </h4>
          <ul className="grid grid-cols-1 gap-2">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${style.dot}`} />
                {ing}
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div>
          <h4 className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-100 mb-3">
            <ArrowRight className="w-5 h-5 text-gray-400" />
            {t.instructions}
          </h4>
          <ol className="space-y-4">
            {recipe.steps.map((step, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300">
                <span className={`flex-shrink-0 w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center border ${style.step}`}>
                  {idx + 1}
                </span>
                <span className="mt-0.5 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
    
    {/* Image Modal */}
    {showImageModal && recipe.imageUrl && (
        <ImageModal 
            imageUrl={recipe.imageUrl} 
            recipeName={recipe.name} 
            t={t} 
            onClose={() => setShowImageModal(false)} 
        />
    )}

    {/* Safety Modal */}
    {showSafetyModal && recipe.safetyTips && (
        <SafetyModal
            tips={recipe.safetyTips}
            t={t}
            onClose={() => setShowSafetyModal(false)}
        />
    )}
    </>
  );
};

export default RecipeCard;
