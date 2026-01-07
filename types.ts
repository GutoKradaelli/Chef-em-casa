
export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'
}

export interface Recipe {
  id?: string; // Unique identifier for saved recipes
  name: string;
  type: string; // Meal type or Category
  focus: string; // "Gourmet", "Técnica Diferente", etc.
  difficulty: Difficulty;
  time: string; // e.g., "30"
  changes: string; // Summary of main changes
  explanation: string; // How feedback was addressed
  ingredients: string[];
  steps: string[];
  
  // Metadata fields
  flavorProfile?: string; // Salgado, Doce, etc.
  category?: string; // Prato Principal, etc.
  mainProtein?: string; // Frango, Bovina, etc.
  dietAttributes?: string[]; // Sem Glúten, Low Carb, etc.
  searchKeywords?: string[]; // search terms
  
  // Image Generation
  imageUrl?: string; // Base64 or URL of generated image

  // Safety
  safetyTips?: string[]; // List of safety warnings
}

export interface RecipeResponse {
  recipes: Recipe[];
}
