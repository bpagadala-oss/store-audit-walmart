import React, { useState } from 'react';
import AddNewVisitModalV2 from '../components/AddNewVisitModalV2';

export default function Home() {
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center p-4">
      <main className="text-center bg-white rounded-2xl shadow-ios-lg p-10 max-w-md">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome</h1>
        <p className="text-gray-600 mb-8">Add New Visit Modal - Web Version</p>
        <button 
          className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-ios-md"
          onClick={() => setShowModal(true)}
        >
          Open Add New Visit
        </button>
      </main>

      {showModal && (
        <AddNewVisitModalV2 isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
