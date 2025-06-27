import { kv } from '@/lib/kv';

interface QuestionData {
  questionText: string;
  answers: string[];
}

export default async function ResultsPage({ params }: { params: { resultsId: string } }) {
  const resultsId = params.resultsId;

  // 1. Use the secret resultsId to find the public questionId
  const questionId: string | null = await kv.get(resultsId);

  if (!questionId) {
    return <div className="text-center p-4"><h1>Results not found.</h1><p>This link may be invalid or expired.</p></div>;
  }
  
  // 2. Use the questionId to get the full question data
  const questionData: QuestionData | null = await kv.get(questionId);

  if (!questionData) {
    return <div className="text-center p-4"><h1>Question data could not be loaded.</h1></div>;
  }

  const { questionText, answers } = questionData;

  return (
    <div className="w-full max-w-lg mx-auto p-4 space-y-6">
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-gray-600 text-sm">Your Question:</p>
        <h1 className="text-xl font-semibold">{questionText}</h1>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">
          {answers.length} Anonymous Answer{answers.length !== 1 ? 's' : ''}
        </h2>
        <div className="space-y-3">
          {answers.length > 0 ? (
            answers.map((answer, index) => (
              <div key={index} className="bg-white border p-4 rounded-lg shadow-sm">
                <p>{answer}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No answers yet. Share your link!</p>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-6 text-center">
            Tip: Screenshot this page to share the results!
        </p>
      </div>
    </div>
  );
}