import { GoogleGenAI, Type } from "@google/genai";
import { ExtractionResult } from "../types";

const MODEL_NAME = "gemini-2.5-flash";

export const analyzeSourceCode = async (htmlSource: string): Promise<ExtractionResult> => {
  // Force cast to string because the build process ensures this is replaced, 
  // or it will be undefined at runtime if missing, but TS needs to know it's a string.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const systemInstruction = `You are a technical web scraper assistant. 
I will provide you with the HTML source code of a Pinterest Board page.
Your task is to extract the 'Board ID'.

Rules:
1. Search for a numeric ID associated with the board. 
2. It is often found in <script id="__PWS_DATA__"> or similar JSON structures under keys like 'board_id', 'objectId', or within 'resource_response.data'.
3. Also extract the Board Name and Owner Name if possible.
4. If you cannot find the Board ID, set it to null.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          { text: `Input HTML length: ${htmlSource.length} characters.\n\n${htmlSource.substring(0, 900000)}` }
        ]
      },
      config: {
        systemInstruction: systemInstruction,
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