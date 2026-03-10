import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userInput, prompts } = body;

    if (!userInput || !prompts || !Array.isArray(prompts)) {
      return Response.json(
        { error: "Missing userInput or prompts." },
        { status: 400 }
      );
    }

    const results = await Promise.all(
      prompts.map(async (prompt: string) => {
        const fullPrompt = `${prompt}\n\nUser input: ${userInput}`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: fullPrompt,
        });

        return {
          prompt,
          reply: response.text,
        };
      })
    );

    return Response.json({ results });
  } catch (error) {
    console.error("Compare API error:", error);
    return Response.json(
      { error: "Something went wrong during comparison." },
      { status: 500 }
    );
  }
}