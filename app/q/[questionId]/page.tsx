// This is a pure Server Component. No 'use client', no useState.
import { kv } from '@/lib/kv';
import AnswerForm from '@/components/AnswerForm'; // Import the component from its new file

export default async function QuestionPage({ params }: { params: { questionId: string } }) {
  const questionId = params.questionId;
  const questionData: { questionText: string } | null = await kv.get(questionId);

  if (!questionData) {
    return <div className="text-center p-4"><h1>Question not found.</h1></div>;
  }

  // Pass the server data to the client component as props
  return <AnswerForm questionId={questionId} questionText={questionData.questionText} />;
}