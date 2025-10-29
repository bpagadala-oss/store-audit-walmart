import React, { useState } from 'react';
import CustomerLookupModal from './CustomerLookupModal';

interface Customer {
  id: string;
  name: string;
  address: string;
}

interface AddNewVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VISIT_TYPES = [
  'Grocery / Sales',
  'Maintenance',
  'Installation',
  'Support',
  'Other'
];

export default function AddNewVisitModal({ isOpen, onClose }: AddNewVisitModalProps) {
  const [visitType, setVisitType] = useState('Grocery / Sales');
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split('T')[0]);
  const [visitTime, setVisitTime] = useState('15:30');
  const [isAllDay, setIsAllDay] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCustomerLookup, setShowCustomerLookup] = useState(false);

  const handleSave = () => {
    console.log('Saving visit:', {
      visitType,
      visitDate,
      visitTime,
      isAllDay,
      customer: selectedCustomer?.name || 'None selected'
    });
    onClose();
  };

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowCustomerLookup(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal modal-large">
        {/* Header */}
        <div className="modal-header">
          <button className="btn-text" onClick={onClose}>Cancel</button>
          <h2>Add New Visit</h2>
          <button className="btn-text btn-primary" onClick={handleSave}>Save</button>
        </div>

        {/* Form Content */}
        <div className="modal-content">
          {/* Visit Type */}
          <div className="form-group">
            <label>Visit Type</label>
            <div className="segmented-control">
              {VISIT_TYPES.map(type => (
                <button
                  key={type}
                  className={`segment ${visitType === type ? 'active' : ''}`}
                  onClick={() => setVisitType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Time */}
          <div className="form-group">
            <label>Time</label>
            <input
              type="time"
              value={visitTime}
              onChange={(e) => setVisitTime(e.target.value)}
              className="input-field"
            />
          </div>

          {/* All Day Event */}
          <div className="form-group">
            <div className="toggle-row">
              <label>All Day Event</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={isAllDay}
                  onChange={(e) => setIsAllDay(e.target.checked)}
                />
                <span className="toggle-slider" />
              </label>
            </div>
          </div>

          {/* Customer */}
          <div className="form-group">
            <label>Customer</label>
            <button
              className="customer-field"
              onClick={() => setShowCustomerLookup(true)}
            >
              <span className={selectedCustomer ? 'has-value' : 'placeholder'}>
                {selectedCustomer?.name || 'Select Customer'}
              </span>
              <span className="chevron">›</span>
            </button>
          </div>
        </div>
      </div>

      {/* Customer Lookup Modal */}
      {showCustomerLookup && (
        <CustomerLookupModal
          isOpen={showCustomerLookup}
          onClose={() => setShowCustomerLookup(false)}
          onSelect={handleCustomerSelect}
        />
      )}
    </>
  );
}
