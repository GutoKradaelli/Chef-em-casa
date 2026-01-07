
import React, { useState, KeyboardEvent } from 'react';
import { Plus, X, Search, MessageSquare, ChefHat, Settings2, Utensils } from 'lucide-react';
import { Translation } from '../constants/translations';

interface IngredientInputProps {
  recipeName: string;
  setRecipeName: (name: string) => void;
  feedback: string;
  setFeedback: (feedback: string) => void;
  ingredients: string[];
  cookingMethod: string;
  setCookingMethod: (method: string) => void;
  utensil: string;
  setUtensil: (utensil: string) => void;
  onAddIngredient: (ingredient: string) => void;
  onRemoveIngredient: (index: number) => void;
  onGenerate: () => void;
  isLoading: boolean;
  t: Translation;
}

const IngredientInput: React.FC<IngredientInputProps> = ({
  recipeName,
  setRecipeName,
  feedback,
  setFeedback,
  ingredients,
  cookingMethod,
  setCookingMethod,
  utensil,
  setUtensil,
  onAddIngredient,
  onRemoveIngredient,
  onGenerate,
  isLoading,
  t
}) => {
  const [ingredientValue, setIngredientValue] = useState('');

  const handleAdd = () => {
    if (ingredientValue.trim()) {
      onAddIngredient(ingredientValue.trim());
      setIngredientValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  // Convert translation dictionary key to array for select
  const methodOptions = Object.entries(t.cookingMethods).map(([key, label]) => ({
    key,
    label
  }));

  const utensilOptions = Object.entries(t.utensils).map(([key, label]) => ({
    key,
    label
  }));

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-orange-100 dark:border-slate-700 p-6 md:p-8 transition-colors duration-300">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Recipe Name Input */}
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-orange-500" />
                {t.inputNameLabel}
            </label>
            <input
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                placeholder={t.inputNamePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-slate-700 placeholder-gray-400 dark:placeholder-gray-500"
                disabled={isLoading}
            />
        </div>

        {/* Feedback Input */}
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-500" />
                {t.inputFeedbackLabel}
            </label>
            <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={t.inputFeedbackPlaceholder}
                rows={1}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-slate-700 placeholder-gray-400 dark:placeholder-gray-500 resize-none min-h-[50px]"
                disabled={isLoading}
            />
        </div>
      </div>

      <hr className="border-gray-100 dark:border-slate-700 mb-6" />

      {/* Equipment Selection Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Cooking Method */}
          <div className="space-y-2">
               <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-purple-500" />
                  {t.inputMethodLabel}
              </label>
              <select
                  value={cookingMethod}
                  onChange={(e) => setCookingMethod(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-slate-700 appearance-none cursor-pointer"
                  disabled={isLoading}
              >
                  {methodOptions.map((option) => (
                      <option key={option.key} value={option.key}>
                          {option.label}
                      </option>
                  ))}
              </select>
          </div>

          {/* Specific Utensil */}
          <div className="space-y-2">
               <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-amber-500" />
                  {t.inputUtensilsLabel}
              </label>
              <select
                  value={utensil}
                  onChange={(e) => setUtensil(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-slate-700 appearance-none cursor-pointer"
                  disabled={isLoading}
              >
                  {utensilOptions.map((option) => (
                      <option key={option.key} value={option.key}>
                          {option.label}
                      </option>
                  ))}
              </select>
          </div>
      </div>

      {/* Ingredient Input */}
      <div className="space-y-4 mb-6">
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Search className="w-4 h-4 text-green-500" />
                {t.inputIngredientsLabel}
            </label>
            <div className="flex gap-2">
                <input
                type="text"
                value={ingredientValue}
                onChange={(e) => setIngredientValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.inputIngredientsPlaceholder}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-slate-700 placeholder-gray-400 dark:placeholder-gray-500"
                disabled={isLoading}
                />
                <button
                onClick={handleAdd}
                disabled={!ingredientValue.trim() || isLoading}
                className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 dark:disabled:bg-slate-600 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">{t.addButton}</span>
                </button>
            </div>
        </div>
      </div>

      {/* Ingredient Tags */}
      <div className="flex flex-wrap gap-2 mb-8 min-h-[40px]">
        {ingredients.length === 0 ? (
          <p className="text-gray-400 dark:text-gray-500 text-sm italic w-full text-center py-2">
            {t.emptyIngredients}
          </p>
        ) : (
          ingredients.map((ing, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-100 dark:border-green-800 text-sm font-medium animate-fadeIn"
            >
              {ing}
              <button
                onClick={() => onRemoveIngredient(index)}
                className="hover:bg-green-200 dark:hover:bg-green-800 rounded-full p-0.5 transition-colors"
                disabled={isLoading}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))
        )}
      </div>

      <button
        onClick={onGenerate}
        disabled={!recipeName.trim() || isLoading}
        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transform transition-all 
          ${recipeName.trim() && !isLoading 
            ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:scale-[1.01] shadow-orange-200 dark:shadow-none' 
            : 'bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-slate-500 cursor-not-allowed'}`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-3">
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            {t.generating}
          </span>
        ) : (
          t.generateButton
        )}
      </button>
    </div>
  );
};

export default IngredientInput;
