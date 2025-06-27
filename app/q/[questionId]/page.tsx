import { kv } from '@/lib/kv';
import { useState } from 'react';

// ======================================================================
// 1. This is the CLIENT Component that handles the form.
// It runs in the browser and is NOT async.
// ======================================================================
function AnswerForm({ questionId, questionText }: { questionId: string; questionText: string }) {
  'use client'; // This directive must be at the top of the client part

  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, answer }),
      });
      setSubmitted(true);
    } catch (error) { // The error variable is now used here
      console.error(error);
      alert('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center p-4">
        <h2 className="text-xl font-semibold">Thank You!</h2>
        <p>Your anonymous answer has been submitted.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        {/* We use the questionText prop here */}
        <p className="text-center text-lg font-medium">{questionText}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your anonymous answer..."
          className="w-full p-3 border rounded-lg h-32"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded-lg font-semibold disabled:bg-gray-500"
        >
          {loading ? 'Submitting...' : 'Submit Anonymously'}
        </button>
      </form>
    </div>
  );
}

// ======================================================================
// 2. This is the main PAGE component. It is a SERVER Component.
// It can be async and is responsible for fetching data.
// ======================================================================
export default async function QuestionPage({ params }: { params: { questionId: string } }) {
  const questionId = params.questionId;
  const questionData: { questionText: string } | null = await kv.get(questionId);

  if (!questionData) {
    return <div className="text-center p-4"><h1>Question not found.</h1></div>;
  }

  // It passes the fetched data down to the Client Component as a prop.
  return <AnswerForm questionId={questionId} questionText={questionData.questionText} />;
}