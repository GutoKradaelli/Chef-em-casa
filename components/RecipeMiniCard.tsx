
import React, { useState, useRef, useEffect } from 'react';
import { Clock, AlertCircle, Trash2, ArrowUpRight, ChefHat, Pencil, Check, Utensils, Tag, Loader2, Sparkles } from 'lucide-react';
import { Recipe, Difficulty } from '../types';
import { Translation } from '../constants/translations';
import { generateRecipeImage } from '../services/geminiService';

interface RecipeMiniCardProps {
  recipe: Recipe;
  t: Translation;
  onClick: () => void;
  onRemove: (e: React.MouseEvent) => void;
  onUpdate?: (recipe: Recipe) => void;
}

const RecipeMiniCard: React.FC<RecipeMiniCardProps> = ({ recipe, t, onClick, onRemove, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(recipe.name);
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Difficulty color mapping
  const difficultyColors = {
    [Difficulty.Easy]: 'text-green-600 dark:text-green-400',
    [Difficulty.Medium]: 'text-orange-600 dark:text-orange-400',
    [Difficulty.Hard]: 'text-red-600 dark:text-red-400'
  };

  const accentColor = difficultyColors[recipe.difficulty];

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleStartEditing = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSaveName = (e?: React.MouseEvent | React.FormEvent) => {
    if (e) e.stopPropagation();
    
    if (editedName.trim() !== recipe.name && onUpdate) {
      onUpdate({ ...recipe, name: editedName.trim() });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      handleSaveName();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      setEditedName(recipe.name);
      setIsEditing(false);
    }
  };

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleGenerateImage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (recipe.imageUrl || isGeneratingImg) return;

    setIsGeneratingImg(true);
    try {
        const imageUrl = await generateRecipeImage(recipe.name, recipe.ingredients);
        if (onUpdate) {
            onUpdate({ ...recipe, imageUrl });
        }
    } catch (error) {
        console.error("Error generating image", error);
    } finally {
        setIsGeneratingImg(false);
    }
  };

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer relative w-full h-full min-h-[400px] mt-4 transition-transform duration-300 hover:-translate-y-2 hover:rotate-1"
    >
      {/* 
        SPIRAL RINGS (Back Layer)
        Simulates the part of the ring going behind the paper
      */}
      <div className="absolute -top-5 left-0 w-full h-8 flex items-end justify-around px-4 z-0">
          {[1, 2, 3, 4].map((i) => (
             <div key={i} className="w-2.5 h-6 bg-gray-300 dark:bg-slate-600 rounded-t-full shadow-inner transform -skew-x-12"></div>
          ))}
      </div>

      {/* 
        PAPER BACKGROUND 
        - Cream color for light mode, Slate for dark mode
        - Complex gradient for Lines (Horizontal) and Margin (Vertical)
      */}
      <div className={`
        absolute inset-0 rounded-sm shadow-lg border-b border-r border-gray-300 dark:border-black/50
        bg-[#fefce8] dark:bg-slate-800
        bg-[image:linear-gradient(90deg,transparent_48px,rgba(239,68,68,0.3)_48px,rgba(239,68,68,0.3)_50px,transparent_50px),repeating-linear-gradient(transparent,transparent_31px,rgba(59,130,246,0.1)_31px,rgba(59,130,246,0.1)_32px)]
        dark:bg-[image:linear-gradient(90deg,transparent_48px,rgba(244,114,182,0.2)_48px,rgba(244,114,182,0.2)_50px,transparent_50px),repeating-linear-gradient(transparent,transparent_31px,rgba(255,255,255,0.05)_31px,rgba(255,255,255,0.05)_32px)]
        z-10
      `}></div>

      {/* BINDER HOLES & SPIRAL FRONT (Top) */}
      <div className="absolute -top-1 left-0 w-full h-12 flex items-center justify-around px-4 z-20 pointer-events-none">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative flex flex-col items-center justify-center">
                {/* The Ring (Front part coming out of hole) */}
                <div className="absolute -top-4 w-2.5 h-6 bg-gradient-to-b from-gray-200 to-gray-400 dark:from-slate-500 dark:to-slate-700 rounded-b-full shadow-md transform -skew-x-12 z-20"></div>
                
                {/* The Hole */}
                <div className="w-5 h-5 rounded-full bg-[#3f3b35] dark:bg-[#020617] shadow-[inset_0px_2px_4px_rgba(0,0,0,0.8)] z-10 border border-black/10 dark:border-white/5"></div>
            </div>
          ))}
      </div>

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 flex flex-col h-full pt-12 pb-4 pl-16 pr-5">
        
        {/* DELETE BUTTON (Top Right, "taped" style) */}
        <button
            onClick={onRemove}
            className="absolute top-2 right-2 z-30 p-2 text-gray-400/70 hover:text-red-500 transition-colors"
            title={t.removeBtn}
        >
            <Trash2 className="w-4 h-4" />
        </button>

        {/* IMAGE: Looks like a photo taped to the paper */}
        <div className="relative w-full aspect-[3/2] bg-gray-100 dark:bg-slate-900 shadow-md border-[6px] border-white dark:border-slate-700 transform rotate-1 group-hover:rotate-0 transition-transform duration-500 mb-3 mx-auto max-w-[95%] overflow-hidden">
            
            {/* TAPE EFFECT (Fita Adesiva) */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/40 dark:bg-white/10 backdrop-blur-[1px] shadow-sm transform -rotate-1 z-20 border-l border-r border-white/20 pointer-events-none"></div>

            {recipe.imageUrl ? (
                <img 
                    src={recipe.imageUrl} 
                    alt={recipe.name} 
                    className="w-full h-full object-cover animate-in fade-in duration-500"
                />
            ) : (
                <button 
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImg}
                  className="w-full h-full flex flex-col items-center justify-center opacity-40 hover:opacity-80 hover:bg-gray-200 dark:hover:bg-slate-800 transition-all bg-gray-50 dark:bg-slate-800 group/btn"
                  title={t.generateImageBtn}
                >
                    {isGeneratingImg ? (
                        <div className="flex flex-col items-center gap-2">
                           <Loader2 className={`w-8 h-8 ${accentColor} animate-spin`} />
                           <span className="text-[10px] font-bold text-gray-500 animate-pulse">{t.generatingImage}</span>
                        </div>
                    ) : (
                        <>
                           <div className="relative">
                                <ChefHat className={`w-12 h-12 ${accentColor} mb-1`} />
                                <div className="absolute -top-1 -right-1 bg-white dark:bg-slate-700 rounded-full p-0.5 shadow-sm opacity-0 group-hover/btn:opacity-100 transition-opacity">
                                    <Sparkles className="w-3 h-3 text-purple-500" />
                                </div>
                           </div>
                           <span className="text-[9px] uppercase font-bold text-gray-400 group-hover/btn:text-gray-600 dark:group-hover/btn:text-gray-300">
                               {t.generateImageBtn}
                           </span>
                        </>
                    )}
                </button>
            )}
            
            {/* Difficulty Sticker on Photo */}
            <div className={`absolute -bottom-3 -right-3 ${recipe.difficulty === Difficulty.Easy ? 'bg-green-100 text-green-800' : recipe.difficulty === Difficulty.Medium ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'} text-[10px] font-black uppercase px-2 py-1 shadow-md transform -rotate-6 border-2 border-white dark:border-slate-700 z-10 pointer-events-none`}>
               {t.difficultyLabels[recipe.difficulty]}
            </div>
        </div>

        {/* METADATA ROW */}
        <div className="flex flex-wrap gap-2 mb-1 pl-1">
             {recipe.category && (
                 <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    <Utensils className="w-3 h-3" />
                    {recipe.category}
                 </span>
             )}
        </div>

        {/* TITLE SECTION (Aligned with lines) */}
        <div className="min-h-[4rem] flex items-start -mt-1">
           {isEditing ? (
             <div className="flex-1 flex items-center gap-2 bg-white/80 dark:bg-black/40 backdrop-blur-sm rounded p-1 shadow-sm">
                <input
                  ref={inputRef}
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onClick={handleInputClick}
                  onBlur={() => handleSaveName()}
                  className="w-full bg-transparent border-b-2 border-orange-300 focus:outline-none font-handwriting font-bold text-xl text-gray-800 dark:text-white px-1"
                />
                <button 
                  onClick={handleSaveName}
                  className="p-1 text-green-600 hover:bg-green-100 rounded-full"
                >
                  <Check className="w-4 h-4" />
                </button>
             </div>
           ) : (
             <h3 className="font-sans font-bold text-lg leading-8 text-gray-800 dark:text-gray-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors flex items-start gap-2 w-full pt-0.5" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.5)' }}>
               <span className="line-clamp-2">{recipe.name}</span>
               <button 
                 onClick={handleStartEditing}
                 className="mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-orange-500"
                 title="Editar Título"
               >
                 <Pencil className="w-3.5 h-3.5" />
               </button>
             </h3>
           )}
        </div>
        
        {/* TAGS (Handwritten style layout) */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
             {recipe.dietAttributes?.slice(0, 3).map((attr, idx) => (
                 <span key={idx} className="text-xs text-gray-500 dark:text-gray-400 font-medium italic flex items-center gap-0.5">
                     <Tag className="w-3 h-3 opacity-50" />
                     {attr}
                 </span>
             ))}
        </div>

        {/* FOOTER STATS */}
        <div className="mt-auto pt-2 flex items-center justify-between border-t border-dashed border-gray-300 dark:border-slate-700/50">
            <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400 pt-2">
                <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {recipe.time} {t.minutes}
                </span>
                <span className="flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {recipe.ingredients.length}
                </span>
            </div>
            
            <div className="p-1.5 text-gray-400 group-hover:text-orange-500 transition-colors pt-2">
                <ArrowUpRight className="w-5 h-5" />
            </div>
        </div>

      </div>
    </div>
  );
};

export default RecipeMiniCard;
