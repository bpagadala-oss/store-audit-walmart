import React, { useState } from 'react';
import CustomerSelector from './CustomerSelector';

interface Customer {
  id: string;
  name: string;
  address: string;
  city?: string;
  state?: string;
  distance?: number;
  icon?: string;
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

export default function AddNewVisitModalV2({ isOpen, onClose }: AddNewVisitModalProps) {
  const [visitType, setVisitType] = useState('Grocery / Sales');
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split('T')[0]);
  const [visitTime, setVisitTime] = useState('15:30');
  const [isAllDay, setIsAllDay] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

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

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose} 
      />
      
      <div className="fixed inset-0 flex items-end md:items-center justify-center z-50 p-4">
        <div className="w-full md:w-96 bg-white rounded-t-2xl md:rounded-2xl shadow-ios-lg max-h-[95vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white rounded-t-2xl">
            <button 
              onClick={onClose}
              className="text-base font-medium text-primary hover:opacity-70 transition-opacity"
            >
              Cancel
            </button>
            <h2 className="text-xl font-semibold text-gray-900">Add New Visit</h2>
            <button 
              onClick={handleSave}
              className="text-base font-bold text-primary hover:opacity-70 transition-opacity"
            >
              Save
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6">
            {/* Visit Type */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                Visit Type
              </label>
              <div className="flex flex-wrap gap-2">
                {VISIT_TYPES.map(type => (
                  <button
                    key={type}
                    onClick={() => setVisitType(type)}
                    className={`
                      px-3 py-2 rounded-lg text-sm font-medium transition-all
                      ${visitType === type 
                        ? 'bg-primary text-white shadow-ios-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                Date
              </label>
              <input
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 shadow-ios-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                Time
              </label>
              <input
                type="time"
                value={visitTime}
                onChange={(e) => setVisitTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 shadow-ios-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* All Day Event */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-900">All Day Event</label>
              <button
                onClick={() => setIsAllDay(!isAllDay)}
                className={`
                  relative inline-flex w-14 h-8 rounded-full transition-colors
                  ${isAllDay ? 'bg-primary' : 'bg-gray-300'}
                `}
              >
                <span
                  className={`
                    inline-block h-6 w-6 rounded-full bg-white shadow-ios-sm transition-transform
                    ${isAllDay ? 'translate-x-7' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {/* Customer Selector - NEW COMPONENT */}
            <CustomerSelector
              selectedCustomer={selectedCustomer}
              onSelect={setSelectedCustomer}
            />
          </div>
        </div>
      </div>
    </>
  );
}

