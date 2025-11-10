import React, { useRef, useEffect } from 'react';

interface Customer {
  id: string;
  name: string;
  address: string;
  city?: string;
  state?: string;
  distance?: number;
  icon?: string;
}

interface SuggestedCustomersProps {
  suggestions: Customer[];
  selectedCustomerId?: string;
  onSelectSuggestion: (customer: Customer) => void;
  onSearchAll: () => void;
}

export default function SuggestedCustomers({
  suggestions,
  selectedCustomerId,
  onSelectSuggestion,
  onSearchAll,
}: SuggestedCustomersProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Show suggestions section only if there are suggestions
  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
          Suggested near you
        </h3>
        <button
          onClick={onSearchAll}
          className="w-full px-4 py-2 text-center text-sm font-medium text-primary hover:bg-blue-50 rounded-lg transition-colors"
        >
          Search all customers →
        </button>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
        Suggested near you
      </h3>

      {/* Horizontal Scrollable List */}
      <div
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        {suggestions.map((customer) => (
          <button
            key={customer.id}
            onClick={() => onSelectSuggestion(customer)}
            className={`
              flex-shrink-0 w-40 p-3 rounded-lg border-2 transition-all snap-start
              ${
                selectedCustomerId === customer.id
                  ? 'border-primary bg-blue-50 shadow-ios-md'
                  : 'border-gray-200 bg-white hover:border-primary shadow-ios-sm'
              }
            `}
          >
            {/* Icon & Name */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{customer.icon || '🏪'}</span>
              <div className="text-left flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {customer.name}
                </p>
              </div>
            </div>

            {/* Distance */}
            {customer.distance && (
              <p className="text-xs text-gray-500 text-left">
                {customer.distance} mi away
              </p>
            )}

            {/* Selected Badge */}
            {selectedCustomerId === customer.id && (
              <div className="mt-2 text-xs font-semibold text-primary">
                ✓ Selected
              </div>
            )}
          </button>
        ))}
      </div>

      {/* View All CTA */}
      <button
        onClick={onSearchAll}
        className="w-full mt-3 px-4 py-2 text-center text-sm font-medium text-primary hover:bg-blue-50 rounded-lg transition-colors"
      >
        Search all customers →
      </button>
    </div>
  );
}

