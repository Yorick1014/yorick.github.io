import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { GeminiModel } from '../types';

const apiKey = process.env.API_KEY || '';

// Initialize the client
const ai = new GoogleGenAI({ apiKey });

/**
 * Sends a message to the "About Me" chatbot.
 * Uses Gemini Flash for speed.
 */
export const sendChatMsg = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[],
  context: string
): Promise<string> => {
  if (!apiKey) return "API Key is missing. Please check configuration.";

  try {
    const chat: Chat = ai.chats.create({
      model: GeminiModel.FLASH,
      config: {
        maxOutputTokens: 150, // Limit output length for speed
        systemInstruction: `You are Yorick's AI Assistant. 
        Context: ${context}
        
        Rules:
        1. Answer strictly based on the context.
        2. Be extremely concise (max 2 sentences).
        3. Be friendly and witty.
        4. If unknown, say "I'm not sure, ask Yorick directly!"`,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      })),
    });

    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "Thinking...";
  } catch (error) {
    console.error("Chat Error:", error);
    return "Connection error.";
  }
};

/**
 * Analyzes a project to generate a "Technical Deep Dive" or "Marketing Pitch".
 * Uses Gemini Flash now for maximum speed.
 */
export const analyzeProject = async (
  projectTitle: string,
  projectDetails: string,
  mode: 'technical' | 'marketing'
): Promise<string> => {
  if (!apiKey) return "API Key missing.";

  // Highly optimized prompts for speed and brevity
  const prompt = mode === 'technical'
    ? `Analyze project "${projectTitle}": "${projectDetails}". 
       List 3 key technical challenges/stack choices in bullet points. 
       Keep it extremely concise (max 10 words per bullet).`
    : `Write a high-energy 1-sentence marketing pitch (max 20 words) with emojis for "${projectTitle}": "${projectDetails}".`;

  try {
    // Switched to FLASH for speed
    const response = await ai.models.generateContent({
      model: GeminiModel.FLASH,
      contents: prompt,
      config: {
        maxOutputTokens: 100, // Enforce short response
      }
    });
    return response.text || "Analysis failed.";
  } catch (error) {
    console.error("Analysis Error:", error);
    return "Could not analyze.";
  }
};

/**
 * Helps draft a contact message.
 * Uses Flash for low latency.
 */
export const draftContactMessage = async (topic: string, tone: string): Promise<string> => {
  if (!apiKey) return "API Key missing.";

  try {
    const response = await ai.models.generateContent({
      model: GeminiModel.FLASH,
      contents: `Draft a very short contact message body (max 50 words) about "${topic}". Tone: ${tone}. No subject line.`,
      config: {
        maxOutputTokens: 200,
      }
    });
    return response.text || "";
  } catch (error) {
    console.error("Drafting Error:", error);
    return "Could not draft message.";
  }
};