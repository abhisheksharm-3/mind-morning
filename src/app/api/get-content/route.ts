// app/api/quote-question/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);

async function getQuote(): Promise<string> {
  const response = await fetch('https://api.quotable.io/random');
  if (!response.ok) {
    throw new Error('Quote API request failed');
  }
  const data = await response.json();
  return data.content;
}

async function getQuestion(): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const prompt = `Generate a thought-provoking question that encourages self-reflection and personal growth. The question should be:
  1. Open-ended and not easily answered with a simple yes or no
  2. Relevant to personal development, goal setting, or life philosophy
  3. Concise (15 words or less) but impactful
  4. Suitable for daily contemplation
  5. Inspiring and motivational without being cliché
  6. Applicable to a wide range of individuals regardless of their background
  
  Please provide only the question without any additional context or explanation. No Markdown syntax as well`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().trim();
}

export async function GET() {
  try {
    const isQuestion = Math.random() < 0.5; // 50% chance for quote or question
    const content = isQuestion ? await getQuestion() : await getQuote();
    const type = isQuestion ? 'question' : 'quote';

    return NextResponse.json({ content, type });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { 
        content: "What's one small step you can take today towards your biggest goal?",
        type: 'question'
      },
      { status: 500 }
    );
  }
}