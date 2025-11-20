import { GoogleGenAI, Type } from "@google/genai";
import { ExtractionResult } from "../types";

const MODEL_NAME = "gemini-2.5-flash";

export const analyzeSourceCode = async (htmlSource: string): Promise<ExtractionResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are a technical web scraper assistant. 
    I will provide you with the HTML source code of a Pinterest Board page.
    Your task is to extract the 'Board ID'.
    
    Rules:
    1. Search for a numeric ID associated with the board. 
    2. It is often found in <script id="__PWS_DATA__"> or similar JSON structures under keys like 'board_id', 'objectId', or within 'resource_response.data'.
    3. Also extract the Board Name and Owner Name if possible.
    4. If you cannot find the Board ID, set it to null.
    
    Input HTML length: ${htmlSource.length} characters.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            { text: htmlSource.substring(0, 900000) } // Safety cap to stay within token limits, though Flash handles 1M.
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            boardId: { type: Type.STRING, description: "The numeric ID of the Pinterest board" },
            boardName: { type: Type.STRING, description: "The title of the board" },
            ownerName: { type: Type.STRING, description: "The username or full name of the board owner" }
          }
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response from Gemini.");
    }

    return JSON.parse(resultText) as ExtractionResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      boardId: null,
      boardName: null,
      ownerName: null,
      error: error instanceof Error ? error.message : "Unknown error occurred during analysis"
    };
  }
};
