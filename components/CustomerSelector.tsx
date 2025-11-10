import React, { useState, useMemo } from 'react';
import SuggestedCustomers from './SuggestedCustomers';
import CustomerLookupModal from './CustomerLookupModal';

interface Customer {
  id: string;
  name: string;
  address: string;
  city?: string;
  state?: string;
  distance?: number;
  icon?: string;
}

interface CustomerSelectorProps {
  selectedCustomer?: Customer | null;
  onSelect: (customer: Customer) => void;
}

// Sample suggested customers (would come from geolocation/API in real app)
const SUGGESTED_CUSTOMERS: Customer[] = [
  {
    id: '101',
    name: 'Target Store #145',
    address: '123 Main St, Anytown, CA',
    city: 'Anytown',
    state: 'CA',
    distance: 0.3,
    icon: '🎯',
  },
  {
    id: '102',
    name: 'Walmart Supercenter',
    address: '456 Oak Ave, Anytown, CA',
    city: 'Anytown',
    state: 'CA',
    distance: 0.8,
    icon: '🛒',
  },
  {
    id: '103',
    name: 'Best Buy',
    address: '789 Electronics Blvd, Anytown, CA',
    city: 'Anytown',
    state: 'CA',
    distance: 1.2,
    icon: '📱',
  },
  {
    id: '104',
    name: 'Home Depot',
    address: '321 Hardware Ln, Anytown, CA',
    city: 'Anytown',
    state: 'CA',
    distance: 1.5,
    icon: '🏠',
  },
];

export default function CustomerSelector({
  selectedCustomer,
  onSelect,
}: CustomerSelectorProps) {
  const [showLookup, setShowLookup] = useState(false);

  const handleSelectSuggested = (customer: Customer) => {
    onSelect(customer);
  };

  const handleSelectFromLookup = (customer: Customer) => {
    onSelect(customer);
    setShowLookup(false);
  };

  return (
    <div className="w-full">
      {/* Main Customer Field */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
          Customer
        </label>
        <button
          onClick={() => setShowLookup(true)}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg flex items-center justify-between hover:border-primary transition-colors shadow-ios-sm"
        >
          <span
            className={
              selectedCustomer
                ? 'text-gray-900 font-medium'
                : 'text-gray-400'
            }
          >
            {selectedCustomer?.name || 'Select Customer'}
          </span>
          <span className="text-gray-400 text-xl">›</span>
        </button>
      </div>

      {/* Suggested Near You Section */}
      <SuggestedCustomers
        suggestions={SUGGESTED_CUSTOMERS}
        selectedCustomerId={selectedCustomer?.id}
        onSelectSuggestion={handleSelectSuggested}
        onSearchAll={() => setShowLookup(true)}
      />

      {/* Customer Lookup Modal */}
      {showLookup && (
        <CustomerLookupModal
          isOpen={showLookup}
          onClose={() => setShowLookup(false)}
          onSelect={handleSelectFromLookup}
        />
      )}
    </div>
  );
}

