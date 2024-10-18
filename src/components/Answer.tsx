import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { processConfluence } from '../api/process-confluence';

const Answer: React.FC = () => {
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnswer = async () => {
      const { confluenceLink, question } = location.state as { confluenceLink: string; question: string };
      try {
        setLoading(true);
        const result = await processConfluence(confluenceLink, question);
        setAnswer(result.answer);
      } catch (error) {
        console.error('Error fetching answer:', error);
        setError('An error occurred while processing your request. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnswer();
  }, [location.state]);

  const handleRating = (value: number) => {
    setRating(value);
    // Here you would typically send the rating to your backend
    console.log(`User rated the answer: ${value} stars`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Answer</h2>
      {loading ? (
        <div className="bg-white p-4 rounded shadow mb-4">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : (
        <div className="bg-white p-4 rounded shadow mb-4">
          <p>{answer}</p>
        </div>
      )}
      {!loading && !error && (
        <div className="mb-4">
          <p className="mb-2">Rate this answer:</p>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRating(star)}
              className={`text-2xl ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
            >
              ★
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => navigate('/')}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Ask Another Question
      </button>
    </div>
  );
};

export default Answer;