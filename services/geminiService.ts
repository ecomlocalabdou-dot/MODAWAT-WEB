
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateExcerpt = async (content: string) => {
  if (!process.env.API_KEY) return content.slice(0, 150) + '...';
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `قم بتلخيص هذا النص في جملتين قصيرتين وجذابتين لتكون وصفاً لمقال (Meta Description) باللغة العربية: ${content}`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Gemini Error:", error);
    return content.slice(0, 150) + '...';
  }
};

export const suggestTitle = async (content: string) => {
  if (!process.env.API_KEY) return "عنوان مقترح";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `اقترح عنواناً جذاباً ومحسناً لمحركات البحث (SEO) لهذا المحتوى العربي: ${content}`,
    });
    return response.text.trim().replace(/"/g, '');
  } catch (error) {
    console.error("Gemini Error:", error);
    return "عنوان جديد";
  }
};
