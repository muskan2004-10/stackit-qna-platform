import React, { useState } from 'react';
import AdminStats from '../components/admin/AdminStats';
import UserManagement from '../components/admin/UserManagement';
import ContentModeration from '../components/admin/ContentModeration';
import ReportsDownload from '../components/admin/ReportsDownload';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('stats');
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage community content and users
        </p>
      </div>
      
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-8">
          {['stats', 'users', 'moderation', 'reports'].map((tab) => (
            <button
              key={tab}
              className={`px-1 py-4 font-medium text-sm ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {activeTab === 'stats' && <AdminStats />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'moderation' && <ContentModeration />}
        {activeTab === 'reports' && <ReportsDownload />}
      </div>
    </div>
  );
};

export default AdminDashboard;