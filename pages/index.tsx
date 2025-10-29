import React, { useState } from 'react';
import AddNewVisitModal from '../components/AddNewVisitModal';

export default function Home() {
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="container">
      <main className="main-content">
        <h1>Welcome</h1>
        <p>Add New Visit Modal - Web Version</p>
        <button 
          className="button-primary"
          onClick={() => setShowModal(true)}
        >
          Open Add New Visit
        </button>
      </main>

      {showModal && (
        <AddNewVisitModal isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
