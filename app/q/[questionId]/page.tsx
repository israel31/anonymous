import { kv } from '@/lib/kv';
import AnswerForm from '@/components/AnswerForm';

// We are explicitly defining what the props for this page should look like.
// This makes TypeScript very happy.
interface QuestionPageProps {
  params: {
    questionId: string;
  };
}

// Now, we use our clear definition here.
export default async function QuestionPage({ params }: QuestionPageProps) {
  const { questionId } = params; // A cleaner way to get the id
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