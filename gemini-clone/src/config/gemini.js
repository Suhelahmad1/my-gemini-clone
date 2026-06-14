import { GoogleGenAI } from "@google/genai";

/**
 * Sends prompt to Gemini using the globally active 2.5 flash model.
 * @param {string} prompt - Dynamic input from Context.
 */
async function runChat(prompt) {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  try {
    // ✅ Change the model name here to 2.5-flash or 2.0-flash
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    console.log("Gemini Live Output:", response.text);
    return response.text;
  } catch (error) {
    console.error("Gemini Production Error:", error);
    // Agar quota 429 error dobara aata hai toh screen par clear message dikhega
    if (
      error.toString().includes("429") ||
      error.toString().includes("EXHAUSTED")
    ) {
      return "Quota Exceeded! Please wait a minute or create a new API Key in Google AI Studio.";
    }
    return "Error generating response. Please try again.";
  }
}

export default runChat;
