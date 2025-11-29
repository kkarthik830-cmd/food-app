import { GoogleGenAI } from "@google/genai";

// Safely access process.env for browser environments where 'process' might not be defined
const getApiKey = () => {
  try {
    // Check if process is defined (Node/Bundler environment)
    if (typeof process !== 'undefined' && process.env) {
      return process.env.API_KEY || '';
    }
    // Fallback for Vite or other env injections if needed, or return empty string
    return ''; 
  } catch (e) {
    return '';
  }
};

const apiKey = getApiKey();

export const getSmartFoodRecommendations = async (query: string, availableCuisines: string[]): Promise<string[]> => {
  if (!apiKey) {
    console.warn("Gemini API Key missing");
    // Return empty array instead of crashing if key is missing
    return [];
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
      User is craving: "${query}".
      Available cuisines: ${availableCuisines.join(', ')}.
      
      Based on the user's craving, suggest up to 3 most relevant cuisines from the available list.
      Return ONLY a JSON array of strings. Do not include markdown formatting or explanations.
      Example: ["Italian", "Pizza"]
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text || "[]";
    // Clean up any potential markdown code blocks if the model adds them despite instructions
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini recommendation error:", error);
    return [];
  }
};