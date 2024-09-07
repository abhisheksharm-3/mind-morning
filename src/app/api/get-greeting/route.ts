import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from 'next/server';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function GET(request: NextRequest) {
  // Get timeOfDay from query parameters
  const searchParams = request.nextUrl.searchParams;
  const timeOfDay = searchParams.get('timeOfDay') || 'day';

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: "GEMINI_API_KEY is not set" }, { status: 500 });
  }

  // Select the model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  // Craft the improved prompt
  const prompt = `Generate a concise, impactful greeting for a Chrome extension's new tab page, adhering to these specific guidelines:

  1. Content:
     - Incorporate the time of day: ${timeOfDay}
     - Be witty, clever, and friendly
     - Ensure it's growth-inducing and motivational
     - Include a subtle call-to-action for personal development or productivity
  
  2. Style:
     - Use active voice and positive language
     - Incorporate a touch of humor or playfulness
     - Avoid clichés and overly common phrases
  
  3. Structure:
     - Keep it between 10-15 words
     - Start with a dynamic verb or interjection
     - End with a thought-provoking or inspiring note
  
  4. Tone:
     - Energetic and uplifting
     - Encouraging but not pushy
     - Suitable for all ages and backgrounds
  
  5. Format:
     - Do not use quotation marks in the response
     - Capitalize the first word and any proper nouns
     - Use appropriate punctuation for emphasis if needed

  Ensure the greeting is unique, memorable, and aligns perfectly with the time of day while motivating the user to make the most of their browsing session.`;

  try {
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim().replace(/^["']|["']$/g, '');

    return NextResponse.json({ greeting: text });
  } catch (error) {
    console.error('Error generating greeting from Gemini API:', error);
    return NextResponse.json({ error: 'Failed to generate greeting' }, { status: 500 });
  }
}