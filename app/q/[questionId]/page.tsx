import { kv } from '@/lib/kv';
import AnswerForm from '@/components/AnswerForm';

// This is the simplest and most robust way to type the props for a page.
// We are not using a custom interface, to avoid any conflicts.
export default async function QuestionPage({ params }: { params: { questionId: string } }) {
  const { questionId } = params;
  const questionData: { questionText: string } | null = await kv.get(questionId);

  if (!questionData) {
    return (
      <div className="text-center p-4">
        <h1>Question not found.</h1>
      </div>
    );
  }

  return (
    <AnswerForm
      questionId={questionId}
      questionText={questionData.questionText}
    />
  );
}