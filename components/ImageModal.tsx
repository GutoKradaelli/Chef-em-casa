import React from 'react';
import { X, Sparkles, Download } from 'lucide-react';
import { Translation } from '../constants/translations';

interface ImageModalProps {
  imageUrl: string;
  recipeName: string;
  t: Translation;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, recipeName, t, onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-900 z-10 relative">
           <h3 className="font-bold text-lg text-gray-800 dark:text-white flex items-center gap-2">
             <Sparkles className="w-5 h-5 text-purple-500" />
             {t.imageModalTitle}
           </h3>
           <button 
             onClick={onClose}
             className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
           >
             <X className="w-5 h-5 text-gray-500" />
           </button>
        </div>

        {/* Image Content */}
        <div className="relative aspect-[4/3] w-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center group">
          <img 
            src={imageUrl} 
            alt={recipeName} 
            className="w-full h-full object-cover"
          />
          
          {/* Download Action Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
             <a 
               href={imageUrl} 
               download={`${recipeName.replace(/\s+/g, '-').toLowerCase()}.png`}
               className="bg-white/90 text-gray-900 px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-white transition-colors transform hover:scale-105 shadow-lg"
               onClick={(e) => e.stopPropagation()}
             >
               <Download className="w-4 h-4" />
               Download
             </a>
          </div>
        </div>

        {/* Caption */}
        <div className="p-4 bg-gray-50 dark:bg-slate-900/50 text-center">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {recipeName}
          </p>
          <p className="text-xs text-gray-400 mt-1">
             Gerado com Gemini 2.5 Flash Image
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;