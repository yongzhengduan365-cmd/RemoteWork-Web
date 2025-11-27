
import { GoogleGenAI } from "@google/genai";
import { PLATFORMS } from "../constants";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const getPlatformRecommendation = async (userQuery: string): Promise<string> => {
  try {
    const ai = getClient();
    
    // Construct a context-aware prompt with enhanced metadata
    const platformContext = PLATFORMS.map(p => 
      `- ${p.name} (${p.platformType} | ${p.language}):
       Industries: ${p.industries.join(', ')}
       Types: ${p.jobTypes.join(', ')}
       Salary Tier: ${p.salaryTier}
       Description: ${p.description}`
    ).join('\n');

    const prompt = `
      You are an expert Remote Work Advisor for "RemoteHub".
      
      I have a database of the following platforms:
      ${platformContext}
      
      The user is asking: "${userQuery}"
      
      Please analyze the user's request (skillset, preferences, language, desired income level) and recommend the best platforms from the list above. 
      
      Guidelines:
      1. If they ask for high salary, look for '$$$' tier.
      2. If they ask for beginners/freelance, look for '$' tier or 'Freelance Market'.
      3. Reply in Chinese (中文).
      
      Structure your answer with:
      1. A direct recommendation (Top 1-3 picks).
      2. Why these platforms fit the user.
      3. A quick strategy tip.
      
      Keep it encouraging and professional.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "抱歉，我暂时无法分析您的需求，请稍后再试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "抱歉，AI 助手当前不可用（可能是 API Key 配置问题）。请直接浏览列表寻找合适的机会。";
  }
};
