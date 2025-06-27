// Forcing a new build on Vercel
'use client';

import { useState } from 'react';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [links, setLinks] = useState<{ questionUrl: string; resultsUrl: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim().length < 5) {
      alert('Please enter a longer question.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message);

      const { questionId, resultsId } = data;
      const baseUrl = window.location.origin;
      setLinks({
        questionUrl: `${baseUrl}/q/${questionId}`,
        resultsUrl: `${baseUrl}/r/${resultsId}`,
      });
    } catch (error) {
      alert('Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (links) {
    return (
      <div className="w-full max-w-md mx-auto p-4 space-y-4">
        <h1 className="text-xl font-semibold text-center">Your Links are Ready!</h1>
        <div className="bg-gray-100 p-4 rounded-lg space-y-2">
          <p className="text-sm font-medium">🔗 Share this link for answers:</p>
          <input type="text" readOnly value={links.questionUrl} className="w-full p-2 border rounded" onClick={(e) => e.currentTarget.select()} />
          <p className="text-sm font-medium mt-4">🤫 Keep this secret link for results:</p>
          <input type="text" readOnly value={links.resultsUrl} className="w-full p-2 border rounded" onClick={(e) => e.currentTarget.select()} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Create an Anonymous Q&A</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g., Who was your semester crush?"
          className="w-full p-3 border rounded-lg h-32"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded-lg font-semibold disabled:bg-gray-500"
        >
          {loading ? 'Creating...' : 'Create Question'}
        </button>
      </form>
    </div>
  );
}