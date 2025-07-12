import React, { useState } from 'react';
import { FaArrowUp, FaArrowDown, FaCheck } from 'react-icons/fa';
import useApi from '../../hooks/useApi';
import api from '../../services/api';

const VoteWidget = ({ initialScore, userVote, onVote, isAnswer = false, accepted = false }) => {
  const [score, setScore] = useState(initialScore);
  const [currentVote, setCurrentVote] = useState(userVote);
  const [isAccepting, setIsAccepting] = useState(false);
  const { execute: submitVote, loading } = useApi(api.post);
  
  const handleVote = async (value) => {
    if (loading) return;
    
    const originalScore = score;
    const originalVote = currentVote;
    
    // Optimistic UI update
    let newScore = score;
    if (currentVote === value) {
      setCurrentVote(0);
      newScore = score - value;
    } else {
      const voteChange = currentVote ? (value - currentVote) * 2 : value;
      setCurrentVote(value);
      newScore = score + voteChange;
    }
    setScore(newScore);
    
    try {
      await submitVote('/api/votes', {
        value,
        type: isAnswer ? 'answer' : 'question',
        targetId: onVote
      });
    } catch (err) {
      // Revert on error
      setScore(originalScore);
      setCurrentVote(originalVote);
    }
  };
  
  const handleAcceptAnswer = async () => {
    if (isAccepting) return;
    setIsAccepting(true);
    
    try {
      await api.put(`/api/answers/${onVote}/accept`);
      if (typeof accepted === 'function') {
        accepted(true);
      }
    } catch (err) {
      console.error('Accept answer error:', err);
    }
    
    setIsAccepting(false);
  };

  return (
    <div className="flex flex-col items-center mr-4">
      <button
        onClick={() => handleVote(1)}
        disabled={loading}
        className={`p-2 rounded-full ${
          currentVote === 1 
            ? 'bg-green-100 text-green-600 dark:bg-green-900/50' 
            : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        aria-label="Upvote"
      >
        <FaArrowUp className="w-4 h-4" />
      </button>
      
      <div className="my-1 font-mono font-bold text-gray-700 dark:text-gray-300">
        {score}
      </div>
      
      <button
        onClick={() => handleVote(-1)}
        disabled={loading}
        className={`p-2 rounded-full ${
          currentVote === -1 
            ? 'bg-red-100 text-red-600 dark:bg-red-900/50' 
            : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        aria-label="Downvote"
      >
        <FaArrowDown className="w-4 h-4" />
      </button>
      
      {isAnswer && (
        <button
          onClick={handleAcceptAnswer}
          disabled={isAccepting}
          className={`mt-4 p-2 rounded-full ${
            accepted 
              ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50' 
              : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          aria-label={accepted ? "Accepted answer" : "Accept answer"}
        >
          <FaCheck className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default VoteWidget;