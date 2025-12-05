
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { RecipeResponse } from "../types";
import { LanguageCode } from "../constants/translations";

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    recipes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "New creative name for the variation" },
          type: { type: Type.STRING, description: "Category of the meal (e.g. Lunch, Dinner)" },
          focus: { type: Type.STRING, description: "Focus of variation: 'Quick Fix', 'Balanced', 'Gourmet Upgrade'" },
          difficulty: { type: Type.STRING, enum: ["Easy", "Medium", "Hard"] },
          time: { type: Type.STRING, description: "Total time in minutes (number only)" },
          changes: { type: Type.STRING, description: "Summary of main changes made to the base recipe" },
          explanation: { type: Type.STRING, description: "Explanation of how user feedback was addressed in this specific difficulty level" },
          ingredients: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Full updated ingredient list"
          },
          steps: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Revised step-by-step instructions"
          },
          // New Metadata Fields
          flavorProfile: { type: Type.STRING, enum: ["Salgado", "Doce", "Amargo", "Umami", "Azedo"], description: "Primary flavor profile" },
          category: { type: Type.STRING, enum: ["Prato Principal", "Acompanhamento", "Sobremesa", "Bebida", "Lanche"], description: "Meal category" },
          mainProtein: { type: Type.STRING, enum: ["Frango", "Bovina", "Suína", "Peixe/Frutos do Mar", "Vegetariana/Vegana", "Nenhuma"], description: "Main protein source" },
          dietAttributes: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING, enum: ["Sem Glúten", "Vegetariano", "Vegano", "Low Carb", "Rápido (<30min)", "Sem Lactose"] },
            description: "Dietary tags" 
          },
          searchKeywords: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "3-5 keywords for search (ingredients, style)" 
          }
        },
        required: ["name", "type", "focus", "difficulty", "time", "changes", "explanation", "ingredients", "steps", "flavorProfile", "category", "mainProtein", "dietAttributes", "searchKeywords"]
      }
    }
  },
  required: ["recipes"]
};

// Map for language names
const languageNames: Record<LanguageCode, string> = {
  pt: "Português do Brasil",
  en: "English",
  es: "Español",
  fr: "Français",
  it: "Italiano",
  de: "Deutsch",
  ja: "Japanese",
  ko: "Korean"
};

export const generateRecipes = async (
  recipeName: string, 
  feedback: string, 
  ingredients: string[], 
  cookingMethod: string,
  utensil: string,
  language: LanguageCode
): Promise<RecipeResponse> => {
  
  if (!recipeName) {
    throw new Error("Recipe name is required.");
  }

  const ingredientList = ingredients.length > 0 ? ingredients.join(", ") : "Not specified";
  const langName = languageNames[language];
  const userFeedback = feedback ? feedback : "No specific feedback provided. Optimize generally.";

  const systemInstruction = `
    You are an Evolutionary AI Chef and Recipe Cataloger. 
    Role 1: Transform a base recipe into 3 distinct variations (Easy, Medium, Hard) based on user feedback.
    Role 2: Catalog each recipe with precise metadata (flavor, category, diet tags).
    Role 3: Adapt the recipe to the available cooking equipment: ${cookingMethod} and utensil: ${utensil}.
    
    Input Variables:
    - Base Recipe Name
    - Base Ingredients / Stock
    - User Feedback
    - Cooking Method (Equipment)
    - Specific Utensil
    
    Output Requirements:
    Generate exactly 3 DISTINCT variations:
    
    1. Easy (Simplicity focus): Quick fixes, simple techniques using ${cookingMethod} and ${utensil}.
    2. Medium (Balance focus): Standard perfected version.
    3. Hard (Gourmet focus): Sophisticated techniques, complex flavors.
    
    For each variation, generate the Metadata fields (flavorProfile, category, etc.) based on the final ingredients and method.
    
    IMPORTANT: 
    - Respond ENTIRELY in ${langName}.
    - 'difficulty' must be strictly "Easy", "Medium", or "Hard".
    - In 'explanation', explicitly state how feedback was addressed and how the ${cookingMethod} and ${utensil} are utilized.
  `;

  const prompt = `
    Base Recipe Name: ${recipeName}
    User Feedback: ${userFeedback}
    Ingredients Available: ${ingredientList}
    Cooking Equipment Available: ${cookingMethod}
    Specific Utensil: ${utensil}
    
    Generate 3 variations (Easy, Medium, Hard) in ${langName} with full metadata using ${cookingMethod} / ${utensil}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
        temperature: 0.8,
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("Failed to generate recipes.");
    }

    return JSON.parse(jsonText) as RecipeResponse;
  } catch (error) {
    console.error("Error generating recipes:", error);
    throw error;
  }
};

export const generateRecipeImage = async (recipeName: string, ingredients: string[]): Promise<string> => {
  // Construct a prompt following the "Visual Creative AI" persona
  const ingredientsStr = ingredients.slice(0, 5).join(", ");
  const prompt = `Generate an image of "${recipeName}".
    Key Ingredients visible: ${ingredientsStr}.
    Style: Professional food photography, Michelin star plating, shallow depth of field (bokeh), natural lighting coming from the side, 85mm lens, ultra-realistic texture.
    Environment: Rustic wooden table or elegant ceramic plate, garnished with fresh herbs.
    Action: Freshly cooked, steam slightly visible (if hot dish).
    No text overlay.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
            aspectRatio: "4:3"
        }
      }
    });

    // Extract the image from the response
    // The response structure for images usually contains the base64 data in the parts
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    
    // Log if text was returned instead of image
    const textPart = response.candidates?.[0]?.content?.parts?.find(p => p.text);
    if (textPart) {
      console.warn("Model returned text instead of image data:", textPart.text);
    }
    
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

export const generateSafetyTips = async (
  recipeName: string, 
  ingredients: string[], 
  steps: string[],
  language: LanguageCode
): Promise<string[]> => {
  const langName = languageNames[language];
  const prompt = `
    Analyze this recipe for safety hazards.
    Recipe: ${recipeName}
    Ingredients: ${ingredients.join(', ')}
    Steps: ${steps.join(' ')}

    Provide a list of 3-5 specific safety tips or warnings (e.g. raw meat handling, hot oil, allergens, sharp tools, pressure cooker safety) in ${langName}.
    Return ONLY a JSON array of strings. Example: ["Wash hands after handling chicken", "Be careful with hot oil splatter"].
  `;

  try {
     const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (e) {
      console.error("Error generating safety tips:", e);
      return ["Always be careful with hot surfaces and sharp objects."];
  }
};
