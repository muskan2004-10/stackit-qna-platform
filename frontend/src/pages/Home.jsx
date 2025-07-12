import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QuestionCard from '../components/cards/QuestionCard';
import TagFilter from '../components/ui/TagFilter';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import useApi from '../hooks/useApi';
import api from '../services/api';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

const Home = () => {
  const [activeTag, setActiveTag] = useState('');
  const [page, setPage] = useState(1);
  const { data, loading, error } = useApi(
    () => api.get('/questions', { params: { page, tag: activeTag }}), 
    [page, activeTag]
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <main className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Top Questions
            </h1>
            <div className="flex gap-4">
              <button className="btn-primary">Ask Question</button>
            </div>
          </div>
          
          <TagFilter activeTag={activeTag} onChange={setActiveTag} />
          
          {loading ? (
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <SkeletonLoader key={i} type="question" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-red-500">Error loading questions</h3>
            </div>
          ) : (
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {data?.questions.map(question => (
                <motion.div key={question._id} variants={itemVariants}>
                  <QuestionCard question={question} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </main>
        
        <aside className="w-full md:w-80">
          <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
              Community Stats
            </h3>
            <div className="space-y-4">
              <StatCard 
                icon="users" 
                value="12.4k" 
                label="Developers" 
              />
              <StatCard 
                icon="question-circle" 
                value="8.2k" 
                label="Questions" 
              />
              <StatCard 
                icon="comments" 
                value="24.7k" 
                label="Answers" 
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const StatCard = ({ icon, value, label }) => (
  <div className="flex items-center gap-4">
    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
      <i className={`fas fa-${icon} text-blue-600 dark:text-blue-400 text-lg`}></i>
    </div>
    <div>
      <div className="font-bold text-2xl text-gray-900 dark:text-white">{value}</div>
      <div className="text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  </div>
);

export default Home;