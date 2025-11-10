import React, { useState, useMemo } from 'react';

interface Customer {
  id: string;
  name: string;
  address: string;
  category?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  priority?: 'High' | 'Medium' | 'Low';
  classOfTrade?: 'Retail' | 'Wholesale' | 'Distribution';
  tradeOrg?: string;
  substituted?: boolean;
  overdue?: boolean;
}

interface CustomerLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (customer: Customer) => void;
}

const SAMPLE_CUSTOMERS: Customer[] = [
  { 
    id: '1', 
    name: 'Target Store #145', 
    address: '123 Main St, Anytown, CA 90210',
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '90210',
    category: 'Retail',
    priority: 'High',
    classOfTrade: 'Retail',
    tradeOrg: 'Target Corp',
    substituted: false,
    overdue: false
  },
  { 
    id: '2', 
    name: 'Walmart Supercenter', 
    address: '456 Oak Ave, Springfield, IL 62701',
    street: '456 Oak Ave',
    city: 'Springfield',
    state: 'IL',
    zip: '62701',
    category: 'Retail',
    priority: 'High',
    classOfTrade: 'Retail',
    tradeOrg: 'Walmart Inc',
    substituted: false,
    overdue: true
  },
  { 
    id: '3', 
    name: 'Whole Foods Market', 
    address: '789 Pine Rd, Boulder, CO 80301',
    street: '789 Pine Rd',
    city: 'Boulder',
    state: 'CO',
    zip: '80301',
    category: 'Grocery',
    priority: 'Medium',
    classOfTrade: 'Retail',
    tradeOrg: 'Whole Foods',
    substituted: true,
    overdue: false
  },
  { 
    id: '4', 
    name: 'Trader Joe\'s #234', 
    address: '321 Maple Dr, Seattle, WA 98101',
    street: '321 Maple Dr',
    city: 'Seattle',
    state: 'WA',
    zip: '98101',
    category: 'Grocery',
    priority: 'Medium',
    classOfTrade: 'Retail',
    tradeOrg: 'Trader Joe\'s',
    substituted: false,
    overdue: false
  },
  { 
    id: '5', 
    name: 'CVS Pharmacy #567', 
    address: '654 Cedar Ln, Portland, OR 97201',
    street: '654 Cedar Ln',
    city: 'Portland',
    state: 'OR',
    zip: '97201',
    category: 'Pharmacy',
    priority: 'Low',
    classOfTrade: 'Retail',
    tradeOrg: 'CVS Health',
    substituted: false,
    overdue: true
  },
  { 
    id: '6', 
    name: 'Costco Warehouse', 
    address: '987 Birch St, Austin, TX 78701',
    street: '987 Birch St',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    category: 'Warehouse',
    priority: 'High',
    classOfTrade: 'Wholesale',
    tradeOrg: 'Costco',
    substituted: false,
    overdue: false
  },
  { 
    id: '7', 
    name: 'Best Buy #890', 
    address: '147 Elm Ave, Denver, CO 80202',
    street: '147 Elm Ave',
    city: 'Denver',
    state: 'CO',
    zip: '80202',
    category: 'Electronics',
    priority: 'Medium',
    classOfTrade: 'Retail',
    tradeOrg: 'Best Buy Co',
    substituted: true,
    overdue: false
  },
  { 
    id: '8', 
    name: 'Home Depot #123', 
    address: '258 Spruce Rd, Boston, MA 02101',
    street: '258 Spruce Rd',
    city: 'Boston',
    state: 'MA',
    zip: '02101',
    category: 'Hardware',
    priority: 'High',
    classOfTrade: 'Retail',
    tradeOrg: 'Home Depot',
    substituted: false,
    overdue: true
  },
  { 
    id: '9', 
    name: 'Lowe\'s Home Improvement', 
    address: '369 Willow Ln, Miami, FL 33101',
    street: '369 Willow Ln',
    city: 'Miami',
    state: 'FL',
    zip: '33101',
    category: 'Hardware',
    priority: 'Medium',
    classOfTrade: 'Retail',
    tradeOrg: 'Lowe\'s Co',
    substituted: false,
    overdue: false
  },
  { 
    id: '10', 
    name: 'Bed Bath & Beyond #456', 
    address: '741 Ash Dr, Chicago, IL 60601',
    street: '741 Ash Dr',
    city: 'Chicago',
    state: 'IL',
    zip: '60601',
    category: 'Retail',
    priority: 'Low',
    classOfTrade: 'Retail',
    tradeOrg: 'Bed Bath Beyond',
    substituted: true,
    overdue: true
  },
  { 
    id: '11', 
    name: 'Kohls Department Store', 
    address: '852 Fir Ave, Houston, TX 77001',
    street: '852 Fir Ave',
    city: 'Houston',
    state: 'TX',
    zip: '77001',
    category: 'Retail',
    priority: 'Medium',
    classOfTrade: 'Retail',
    tradeOrg: 'Kohl\'s',
    substituted: false,
    overdue: false
  },
  { 
    id: '12', 
    name: 'Target Store #256', 
    address: '963 Spruce St, Phoenix, AZ 85001',
    street: '963 Spruce St',
    city: 'Phoenix',
    state: 'AZ',
    zip: '85001',
    category: 'Retail',
    priority: 'High',
    classOfTrade: 'Retail',
    tradeOrg: 'Target Corp',
    substituted: false,
    overdue: false
  },
  { 
    id: '13', 
    name: 'Walgreens #789', 
    address: '159 Holly Rd, Philadelphia, PA 19101',
    street: '159 Holly Rd',
    city: 'Philadelphia',
    state: 'PA',
    zip: '19101',
    category: 'Pharmacy',
    priority: 'Low',
    classOfTrade: 'Retail',
    tradeOrg: 'Walgreens',
    substituted: false,
    overdue: false
  },
  { 
    id: '14', 
    name: 'Best Buy #234', 
    address: '753 Dogwood Ln, San Antonio, TX 78201',
    street: '753 Dogwood Ln',
    city: 'San Antonio',
    state: 'TX',
    zip: '78201',
    category: 'Electronics',
    priority: 'Medium',
    classOfTrade: 'Retail',
    tradeOrg: 'Best Buy Co',
    substituted: false,
    overdue: false
  },
  { 
    id: '15', 
    name: 'Whole Foods #890', 
    address: '456 Juniper Ave, San Diego, CA 92101',
    street: '456 Juniper Ave',
    city: 'San Diego',
    state: 'CA',
    zip: '92101',
    category: 'Grocery',
    priority: 'High',
    classOfTrade: 'Retail',
    tradeOrg: 'Whole Foods',
    substituted: true,
    overdue: false
  },
];

const STATES = ['CA', 'IL', 'CO', 'WA', 'OR', 'TX', 'MA', 'FL', 'PA', 'AZ'];
const PRIORITIES = ['High', 'Medium', 'Low'];
const CLASS_OF_TRADE = ['Retail', 'Wholesale', 'Distribution'];

export default function CustomerLookupModal({ isOpen, onClose, onSelect }: CustomerLookupModalProps) {
  const [searchText, setSearchText] = useState('');
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  
  // Quick filter states
  const [showHighPriorityOnly, setShowHighPriorityOnly] = useState(false);
  const [showRecentVisits, setShowRecentVisits] = useState(false);
  const [showMyTerritory, setShowMyTerritory] = useState(false);
  
  // Advanced filter states
  const [filterName, setFilterName] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterZip, setFilterZip] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterClassOfTrade, setFilterClassOfTrade] = useState('');
  const [filterSubstituted, setFilterSubstituted] = useState<'On' | 'Ignore' | 'Off'>('Ignore');
  const [filterOverdue, setFilterOverdue] = useState<'On' | 'Ignore' | 'Off'>('Ignore');

  const filteredCustomers = useMemo(() => {
    let results = SAMPLE_CUSTOMERS;

    // Quick filters
    if (showHighPriorityOnly) {
      results = results.filter(c => c.priority === 'High');
    }
    if (showRecentVisits) {
      // Simulate recent visits - in real app would check lastVisitDate
      results = results.filter(c => c.overdue || c.priority === 'High');
    }
    if (showMyTerritory) {
      // Simulate user's territory - in real app would check user's assigned territory
      results = results.filter(c => c.state === 'CA' || c.state === 'TX');
    }

    // Basic search
    if (searchText.trim()) {
      const query = searchText.toLowerCase();
      results = results.filter(customer =>
        customer.name.toLowerCase().includes(query) ||
        customer.address.toLowerCase().includes(query)
      );
    }

    // Advanced filters
    if (filterName) {
      results = results.filter(c => c.name.toLowerCase().includes(filterName.toLowerCase()));
    }
    if (filterCity) {
      results = results.filter(c => c.city?.toLowerCase().includes(filterCity.toLowerCase()));
    }
    if (filterState) {
      results = results.filter(c => c.state === filterState);
    }
    if (filterZip) {
      results = results.filter(c => c.zip?.includes(filterZip));
    }
    if (filterPriority) {
      results = results.filter(c => c.priority === filterPriority);
    }
    if (filterClassOfTrade) {
      results = results.filter(c => c.classOfTrade === filterClassOfTrade);
    }
    if (filterSubstituted !== 'Ignore') {
      const substValue = filterSubstituted === 'On';
      results = results.filter(c => c.substituted === substValue);
    }
    if (filterOverdue !== 'Ignore') {
      const overdueValue = filterOverdue === 'On';
      results = results.filter(c => c.overdue === overdueValue);
    }

    return results;
  }, [searchText, filterName, filterCity, filterState, filterZip, filterPriority, filterClassOfTrade, filterSubstituted, filterOverdue, showHighPriorityOnly, showRecentVisits, showMyTerritory]);

  const resetFilters = () => {
    setSearchText('');
    setFilterName('');
    setFilterCity('');
    setFilterState('');
    setFilterZip('');
    setFilterPriority('');
    setFilterClassOfTrade('');
    setFilterSubstituted('Ignore');
    setFilterOverdue('Ignore');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal modal-lookup-large">
        {/* Header */}
        <div className="modal-header">
          <button className="btn-text" onClick={onClose}>‹ Back</button>
          <h2>Search Customers</h2>
          <button className="btn-text btn-primary" onClick={onClose}>✓ Done</button>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Quick search by name or address"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="search-input"
            />
            {searchText && (
              <button className="clear-btn" onClick={() => setSearchText('')}>✕</button>
            )}
          </div>
          <button 
            className="advanced-filter-toggle"
            onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
          >
            {showAdvancedFilter ? '− Filters' : '+ Filters'}
          </button>
        </div>

        {/* Quick Filters */}
        <div className="quick-filters">
          <button
            className={`quick-filter-btn ${showHighPriorityOnly ? 'active' : ''}`}
            onClick={() => setShowHighPriorityOnly(!showHighPriorityOnly)}
          >
            ⭐ High Priority
          </button>
          <button
            className={`quick-filter-btn ${showRecentVisits ? 'active' : ''}`}
            onClick={() => setShowRecentVisits(!showRecentVisits)}
          >
            📅 Recent Visits
          </button>
          <button
            className={`quick-filter-btn ${showMyTerritory ? 'active' : ''}`}
            onClick={() => setShowMyTerritory(!showMyTerritory)}
          >
            🗺️ My Territory
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilter && (
          <div className="advanced-filters">
            <div className="filter-row">
              <div className="filter-group">
                <label>Name</label>
                <input 
                  type="text" 
                  placeholder="Contains..." 
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  className="filter-input"
                />
              </div>
              <div className="filter-group">
                <label>City</label>
                <input 
                  type="text" 
                  placeholder="Contains..." 
                  value={filterCity}
                  onChange={(e) => setFilterCity(e.target.value)}
                  className="filter-input"
                />
              </div>
            </div>

            <div className="filter-row">
              <div className="filter-group">
                <label>State</label>
                <select 
                  value={filterState}
                  onChange={(e) => setFilterState(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Any</option>
                  {STATES.map(state => <option key={state} value={state}>{state}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label>ZIP Code</label>
                <input 
                  type="text" 
                  placeholder="Contains..." 
                  value={filterZip}
                  onChange={(e) => setFilterZip(e.target.value)}
                  className="filter-input"
                />
              </div>
            </div>

            <div className="filter-row">
              <div className="filter-group">
                <label>Priority</label>
                <select 
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Any</option>
                  {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label>Class of Trade</label>
                <select 
                  value={filterClassOfTrade}
                  onChange={(e) => setFilterClassOfTrade(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Any</option>
                  {CLASS_OF_TRADE.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="filter-row">
              <div className="filter-group">
                <label>Substituted</label>
                <div className="toggle-group">
                  {(['On', 'Ignore', 'Off'] as const).map(val => (
                    <button
                      key={val}
                      className={`toggle-btn ${filterSubstituted === val ? 'active' : ''}`}
                      onClick={() => setFilterSubstituted(val)}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
              <div className="filter-group">
                <label>Overdue</label>
                <div className="toggle-group">
                  {(['On', 'Ignore', 'Off'] as const).map(val => (
                    <button
                      key={val}
                      className={`toggle-btn ${filterOverdue === val ? 'active' : ''}`}
                      onClick={() => setFilterOverdue(val)}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="filter-actions">
              <button className="clear-all-btn" onClick={resetFilters}>Clear All</button>
              <div className="results-info">
                {filteredCustomers.length} result{filteredCustomers.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        )}

        {/* Customer List */}
        <div className="customer-list-advanced">
          {filteredCustomers.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <div className="empty-title">No customers found</div>
              <div className="empty-message">Try adjusting your filters</div>
            </div>
          ) : (
            filteredCustomers.map(customer => (
              <div
                key={customer.id}
                className="customer-item-advanced"
                onClick={() => onSelect(customer)}
              >
                <div className="customer-main">
                  <div className="customer-name">{customer.name}</div>
                  <div className="customer-address">{customer.address}</div>
                </div>
                <div className="customer-meta">
                  {customer.priority && <span className={`badge priority-${customer.priority.toLowerCase()}`}>{customer.priority}</span>}
                  {customer.category && <span className="badge category">{customer.category}</span>}
                  {customer.substituted && <span className="badge substituted">Substituted</span>}
                  {customer.overdue && <span className="badge overdue">Overdue</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
