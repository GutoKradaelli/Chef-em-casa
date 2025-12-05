
import React from 'react';
import { X, TriangleAlert } from 'lucide-react';
import { Translation } from '../constants/translations';

interface SafetyModalProps {
  tips: string[];
  t: Translation;
  onClose: () => void;
}

const SafetyModal: React.FC<SafetyModalProps> = ({ tips, t, onClose }) => {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-amber-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 border border-amber-200 dark:border-amber-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-amber-100 dark:border-amber-900/30 bg-amber-50 dark:bg-amber-950/30 z-10 relative">
           <h3 className="font-bold text-lg text-amber-700 dark:text-amber-500 flex items-center gap-2">
             <TriangleAlert className="w-5 h-5 fill-amber-100 dark:fill-amber-900" />
             {t.safetyTitle}
           </h3>
           <button 
             onClick={onClose}
             className="p-1.5 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
           >
             <X className="w-5 h-5 text-amber-700 dark:text-amber-500" />
           </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <ul className="space-y-4">
             {tips.length > 0 ? (
               tips.map((tip, idx) => (
                 <li key={idx} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300">
                   <span className="flex-shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-amber-500" />
                   {tip}
                 </li>
               ))
             ) : (
               <li className="text-gray-500 italic text-center">{t.noSafetyTips}</li>
             )}
          </ul>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-slate-900/50 flex justify-center">
            <button 
                onClick={onClose}
                className="px-6 py-2 bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/30 dark:hover:bg-amber-900/50 text-amber-800 dark:text-amber-200 rounded-lg font-medium transition-colors"
            >
                OK
            </button>
        </div>
      </div>
    </div>
  );
};

export default SafetyModal;
