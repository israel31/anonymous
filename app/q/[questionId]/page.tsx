import { kv } from '@/lib/kv';
import AnswerForm from '@/components/AnswerForm';

// This is the full, official type definition for props on a dynamic page.
// It includes searchParams, which we aren't using, but defining it
// satisfies the compiler and removes all ambiguity. THIS IS THE KEY.
type Props = {
  params: { questionId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// We apply our robust, official type here.
export default async function QuestionPage({ params }: Props) {
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