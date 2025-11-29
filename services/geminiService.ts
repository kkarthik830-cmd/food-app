import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Note: In a real prod app, you should handle missing keys gracefully. 
// We will instantiate strictly when called to avoid init errors if key is missing initially.

export const getSmartFoodRecommendations = async (query: string, availableCuisines: string[]): Promise<string[]> => {
  if (!apiKey) {
    console.warn("Gemini API Key missing");
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
