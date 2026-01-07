
import { GoogleGenAI, Type } from "@google/genai";
import { PromptConfig, GeneratedPrompt } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const enhancePrompt = async (config: PromptConfig): Promise<GeneratedPrompt[]> => {
  const prompt = `
    Transform the following idea into 3 professional, high-quality image generation prompts in English.
    
    Idea: ${config.idea}
    Style: ${config.style}
    Lighting: ${config.lighting}
    Camera: ${config.camera}
    Mood: ${config.mood}
    Artist Influence: ${config.artist}
    Aspect Ratio: ${config.aspectRatio}

    Instructions:
    - Return an array of 3 variations.
    - Each variation must be a detailed English prompt optimized for Midjourney/DALL-E.
    - Include descriptive words about textures, materials, and composition.
    - Provide a short Arabic description of what this specific variation emphasizes.
    - List 5-7 relevant English tags.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            english: { type: Type.STRING },
            arabicDescription: { type: Type.STRING },
            tags: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            }
          },
          required: ["english", "arabicDescription", "tags"]
        }
      }
    }
  });

  try {
    const text = response.text;
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("حدث خطأ أثناء معالجة البيانات من الذكاء الاصطناعي");
  }
};
