import { GoogleGenAI, Type } from "@google/genai";
import { Quote, Category } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuote = async (category: string): Promise<Quote> => {
  try {
    const prompt = `Generate a unique, inspiring, and short quote about ${category}. Do not use famous existing quotes if possible, create something original.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING, description: "The quote text itself" },
            author: { type: Type.STRING, description: "The author name (or 'AI Generated')" },
          },
          required: ["text", "author"],
        },
      },
    });

    const json = JSON.parse(response.text || '{}');
    
    return {
      id: `ai-${Date.now()}`,
      text: json.text || "Could not generate a quote at this time.",
      author: json.author || "Gemini AI",
      category: Category.AI_GENERATED
    };
  } catch (error) {
    console.error("Error generating quote:", error);
    return {
      id: `err-${Date.now()}`,
      text: "Creativity is intelligence having fun. (Fallback)",
      author: "Albert Einstein",
      category: Category.AI_GENERATED
    };
  }
};
