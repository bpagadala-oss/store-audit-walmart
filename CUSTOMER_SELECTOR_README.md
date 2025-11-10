# CustomerSelector Component Documentation

## 🎯 Overview

The **CustomerSelector** component provides a clean, mobile-friendly interface for selecting customers in the "Add New Visit" modal. It features:

- ✅ Clean, minimal design with iOS-like aesthetics
- ✅ "Suggested near you" section for quick selection
- ✅ Horizontal scrollable customer cards with distance info
- ✅ Auto-fill and highlighting of selected customer
- ✅ Fallback "Search all customers" CTA
- ✅ Fully responsive (mobile-first)
- ✅ Built with Tailwind CSS
- ✅ Modular and reusable

---

## 📦 Components

### 1. **CustomerSelector** (Main Component)
**File:** `components/CustomerSelector.tsx`

The main container component that manages:
- Customer selection state
- Display of the main customer field
- Rendering suggested customers section
- Opening customer lookup modal

#### Props:
```typescript
interface CustomerSelectorProps {
  selectedCustomer?: Customer | null;
  onSelect: (customer: Customer) => void;
}
```

#### Usage:
```tsx
<CustomerSelector
  selectedCustomer={selectedCustomer}
  onSelect={setSelectedCustomer}
/>
```

---

### 2. **SuggestedCustomers** (Suggestions Section)
**File:** `components/SuggestedCustomers.tsx`

Displays a horizontal scrollable list of suggested customers based on proximity or preferences.

#### Features:
- 3-5 customer cards with icons and distance
- Active selection highlight with checkmark
- Smooth horizontal scrolling
- Emoji icons for visual identification
- "Search all customers →" fallback CTA

#### Props:
```typescript
interface SuggestedCustomersProps {
  suggestions: Customer[];
  selectedCustomerId?: string;
  onSelectSuggestion: (customer: Customer) => void;
  onSearchAll: () => void;
}
```

#### Design:
- **Pill-shaped buttons** for each suggestion
- **Distance display** (e.g., "0.3 mi away")
- **Selected state** shows checkmark and blue highlight
- **Responsive** - stacks on very small screens

---

### 3. **AddNewVisitModalV2** (Updated Modal)
**File:** `components/AddNewVisitModalV2.tsx`

Enhanced version of the modal with Tailwind CSS styling and the new CustomerSelector.

#### Features:
- Mobile-first responsive design
- Slide-up modal on mobile, center on desktop
- Better spacing and typography
- Improved form controls
- Integrated CustomerSelector

---

## 🎨 Design System

### Colors
- **Primary:** `#007AFF` (iOS blue)
- **Success:** `#34C759`
- **Warning:** `#FF9500`
- **Danger:** `#FF3B30`

### Shadows (Tailwind)
```css
shadow-ios-sm  /* 0 1px 3px rgba(0, 0, 0, 0.1) */
shadow-ios-md  /* 0 4px 12px rgba(0, 0, 0, 0.15) */
shadow-ios-lg  /* 0 8px 24px rgba(0, 0, 0, 0.2) */
```

### Typography
- **Labels:** 12px, semibold, uppercase, tracking-wider
- **Main text:** 16px, medium
- **Helper text:** 13px, regular

---

## 🚀 Installation & Setup

### 1. Install Dependencies
```bash
npm install
# Installs Tailwind CSS, PostCSS, and Autoprefixer
```

### 2. Tailwind Configuration
The following files are already configured:
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration
- `styles/globals.css` - Tailwind directives

### 3. Run Development Server
```bash
npm run dev
# Server runs at http://localhost:3000
```

---

## 🔧 Usage Example

### Basic Implementation
```tsx
import { useState } from 'react';
import AddNewVisitModalV2 from '@/components/AddNewVisitModalV2';

export default function MyPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Open Add New Visit
      </button>
      <AddNewVisitModalV2 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
}
```

### Standalone CustomerSelector
```tsx
import CustomerSelector from '@/components/CustomerSelector';

export default function MyComponent() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  return (
    <CustomerSelector
      selectedCustomer={selectedCustomer}
      onSelect={setSelectedCustomer}
    />
  );
}
```

---

## 📱 Responsive Design

### Breakpoints
- **Mobile:** < 768px (stack layout)
- **Tablet:** 768px - 1024px (horizontal cards)
- **Desktop:** > 1024px (full width)

### Mobile Considerations
- Touch-friendly button sizes (44px minimum)
- Slide-up modal animation
- Horizontal scrolling for suggestions
- Optimized spacing for thumb navigation

---

## 🎯 Key Features

### 1. Auto-fill Behavior
When a suggestion is selected:
- ✓ Customer field auto-fills with the name
- ✓ Selected card highlights in blue
- ✓ "✓ Selected" badge appears
- ✓ User can immediately proceed to save

### 2. Search Integration
- Clicking "Search all customers →" opens the full lookup modal
- Full filtering and sorting capabilities
- Quick return to main modal after selection

### 3. Distance Display
Shows proximity to suggested customers:
```
0.3 mi away
0.8 mi away
1.2 mi away
```

---

## 🛠️ Customization

### Adding More Suggestions
Edit `SUGGESTED_CUSTOMERS` in `CustomerSelector.tsx`:
```typescript
const SUGGESTED_CUSTOMERS: Customer[] = [
  {
    id: '101',
    name: 'Target Store #145',
    address: '123 Main St, Anytown, CA',
    distance: 0.3,
    icon: '🎯',
  },
  // Add more...
];
```

### Custom Icons
Use emoji or custom icons:
```typescript
{
  icon: '🏪',  // Default store
  icon: '📍',  // Location
  icon: '⭐',  // Favorite
  icon: '🚗',  // Branch/location
}
```

### Styling Adjustments
All styling uses Tailwind classes - easy to customize:
```tsx
// Change button styles
<button className="px-4 py-3 bg-white border border-gray-300 rounded-lg">
  // Customize colors, padding, borders, etc.
</button>
```

---

## 🔌 API Integration

### Real Data Integration
To connect to real geolocation/customer API:

**In `CustomerSelector.tsx`:**
```typescript
// Replace SUGGESTED_CUSTOMERS with API call
useEffect(() => {
  fetchNearbyCustomers(userLocation).then(setSuggestions);
}, [userLocation]);
```

### Customer Interface
```typescript
interface Customer {
  id: string;
  name: string;
  address: string;
  city?: string;
  state?: string;
  distance?: number;
  icon?: string;
  // Add more fields as needed
}
```

---

## ✅ Testing Checklist

- [ ] Mobile view - suggestions scroll horizontally
- [ ] Tablet view - cards display properly
- [ ] Desktop view - responsive layout holds
- [ ] Click suggestion - auto-fills customer field
- [ ] Select another suggestion - highlight changes
- [ ] Click "Search all customers" - lookup modal opens
- [ ] Select from lookup - closes and updates field
- [ ] Cancel modal - all state preserved
- [ ] Save form - customer data submitted

---

## 🎨 Visual Hierarchy

1. **Primary:** Customer name and field (largest, most prominent)
2. **Secondary:** Suggested customers section (scrollable cards)
3. **Tertiary:** Distance labels and metadata
4. **Quaternary:** "Search all customers" CTA

---

## 📊 Files Modified/Created

- ✅ `components/CustomerSelector.tsx` - New main component
- ✅ `components/SuggestedCustomers.tsx` - New suggestions component
- ✅ `components/AddNewVisitModalV2.tsx` - Enhanced modal
- ✅ `tailwind.config.js` - Tailwind configuration
- ✅ `postcss.config.js` - PostCSS configuration
- ✅ `styles/globals.css` - Updated with Tailwind directives
- ✅ `pages/index.tsx` - Updated to use V2 modal
- ✅ `package.json` - Added Tailwind dependencies

---

## 🚀 Next Steps

1. **Test locally** - Run `npm run dev` and test all interactions
2. **Integrate real data** - Connect to customer API
3. **Add geolocation** - Use browser geolocation API
4. **Deploy to Vercel** - Push code and deploy
5. **Gather feedback** - Test with real users

---

## 📞 Support

For questions or issues:
1. Check component props and types
2. Review usage examples
3. Verify Tailwind CSS is properly configured
4. Check browser console for errors

---

**Happy building! 🚀**

