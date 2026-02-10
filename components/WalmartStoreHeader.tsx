import React, { useState } from 'react';
import { ChevronLeft, Share2 } from 'lucide-react';

export default function WalmartStoreHeader() {
  const [selectedStore, setSelectedStore] = useState('Store');

  const tasks = [
    { id: 1, number: '1', title: 'Store check', completed: false },
    { id: 2, number: '2', title: 'Capture Survey', completed: false },
    { id: 3, number: '3', title: 'Asset Audit', completed: false },
    { id: 4, number: '3', title: 'Asset Audit', completed: false },
    { id: 5, number: '3', title: 'Asset Audit', completed: false },
    { id: 6, number: '4', title: 'Visit Sur...', completed: false },
  ];

  return (
    <div className="w-full bg-white">
      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-2 text-xs font-medium text-gray-700 bg-gray-50 border-b border-gray-200">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <span>Mon Jun 10</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
          </svg>
          <span>100%</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
          </svg>
        </div>
      </div>

      {/* Main Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        {/* Top Row - Back Button & Title */}
        <div className="flex items-center justify-between mb-5">
          <button className="flex items-center text-blue-600 hover:text-blue-700 font-semibold text-base">
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Walmart Store Tasks</h1>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2 border-2 border-red-500 text-red-500 rounded-full font-semibold text-sm hover:bg-red-50 transition">
              End Visit
            </button>
            <button className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white shadow-md hover:shadow-lg transition">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Store Selector Dropdown */}
        <div className="flex items-center gap-2 mb-6">
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-full hover:border-blue-400 transition font-medium text-gray-700">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
            {selectedStore}
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>
        </div>

        {/* Task Timeline */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {tasks.map((task, index) => (
            <button
              key={task.id}
              className={`px-5 py-2 rounded-full font-medium text-sm whitespace-nowrap transition flex-shrink-0 ${
                index === 0
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                  : 'bg-gray-100 text-gray-700 border-2 border-gray-300 hover:border-gray-400'
              }`}
            >
              {task.number}. {task.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
