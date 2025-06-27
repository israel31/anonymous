import { kv } from '@/lib/kv';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { question } = await request.json();

  if (!question || typeof question !== 'string') {
    return NextResponse.json({ message: 'Invalid question' }, { status: 400 });
  }

  const questionId = nanoid(8); // e.g., 'aKq3sLp8'
  const resultsId = `secret-${nanoid(12)}`; // e.g., 'secret-xZp9rMv'

  const questionData = {
    questionText: question,
    createdAt: new Date().toISOString(),
    resultsId: resultsId,
    answers: [],
  };

  try {
    // Save the main question data
    await kv.set(questionId, questionData);
    // Save the index for the results page
    await kv.set(resultsId, questionId);

    return NextResponse.json({ questionId, resultsId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to create question' }, { status: 500 });
  }
}