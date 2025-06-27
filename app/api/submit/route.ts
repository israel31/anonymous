import { kv } from '@/lib/kv';
import { NextRequest, NextResponse } from 'next/server';

interface QuestionData {
  questionText: string;
  answers: string[];
}

export async function POST(request: NextRequest) {
  const { questionId, answer } = await request.json();

  if (!questionId || !answer) {
    return NextResponse.json({ message: 'Missing data' }, { status: 400 });
  }

  try {
    const questionData: QuestionData | null = await kv.get(questionId);

    if (!questionData) {
      return NextResponse.json({ message: 'Question not found' }, { status: 404 });
    }

    questionData.answers.push(answer);
    await kv.set(questionId, questionData);

    return NextResponse.json({ message: 'Answer submitted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to submit answer' }, { status: 500 });
  }
}