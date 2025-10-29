# iPad Mini "Add New Visit" Modal - iOS SwiftUI Project

A complete iOS SwiftUI application demonstrating a professional modal interface for managing field visits with customer lookup functionality. Designed specifically for iPad Mini with Form Sheet presentation style.

## 📱 Project Overview

This project implements a modern iOS modal interface featuring:
- **Add New Visit Modal**: Comprehensive form for creating new customer visits
- **Customer Lookup Modal**: Searchable customer selection with real-time filtering
- **Responsive Design**: Optimized for iPad Mini displays
- **Clean Architecture**: Modular SwiftUI components with proper separation of concerns

## 🏗️ Project Structure

```
├── AddNewVisitApp.swift          # Main app entry point and content view
├── AddNewVisitModal.swift        # Primary modal form component
├── CustomerLookupModal.swift     # Customer selection modal with search
├── CustomerModel.swift           # Data models and manager
└── README.md                     # Project documentation
```

## 📋 Components

### 1. **AddNewVisitApp.swift**
- Main app entry point (`@main`)
- ContentView with sheet presentation
- Initial setup and app lifecycle

### 2. **AddNewVisitModal.swift**
The main "Add New Visit" form includes:
- **Header Section**
  - Cancel button (top-left)
  - Title "Add New Visit" (center)
  - Save button (top-right)
- **Form Fields**
  - **Visit Type**: Segmented picker with options:
    - Grocery / Sales
    - Maintenance
    - Installation
    - Support
    - Other
  - **Date**: Date picker initialized to 11/10/2025
  - **Time**: Time picker initialized to 3:30 PM
  - **All Day Event**: Toggle switch
  - **Customer**: Read-only selection field with lookup modal trigger
- **Save Logic**: Prints visit details and dismisses modal

### 3. **CustomerLookupModal.swift**
Advanced customer selection interface:
- **Header**
  - Back button
  - "Select Customer" title
  - Done button
- **Persistent Search Bar**
  - Search by customer name or address
  - Real-time filtering
  - Clear button when text is entered
- **Virtualized Customer List**
  - Each list item displays two lines:
    - Primary: Customer Name (e.g., "Target Store #145")
    - Secondary: Address (e.g., "123 Main St, Anytown, CA 90210")
  - Empty state with helpful message
  - Tap to select and auto-dismiss
- **Included Components**
  - `SearchBar`: Reusable search component
  - `CustomerListRow`: Individual customer list item

### 4. **CustomerModel.swift**
Data models and management:
- **Customer Struct**
  - `id`: Unique UUID
  - `name`: Customer name
  - `address`: Customer address
  - Conforms to `Identifiable` and `Equatable`
- **CustomerDataManager**
  - Singleton pattern for shared access
  - `@Published` customers array for reactive updates
  - Sample data with 15 representative customers
  - Search functionality with case-insensitive filtering

## 🎯 Key Features

### Form Fields Implementation
- **Date/Time Pickers**: Use iOS native `DatePicker` with `.compact` style
- **Segmented Picker**: Clean interface for visit type selection
- **Toggle Switch**: All-day event option
- **Custom Button Field**: Customer selection with visual indicator

### Search & Filtering
- Real-time search across customer names and addresses
- Case-insensitive matching
- Instant visual feedback with empty state

### Navigation Flow
1. User opens Add New Visit modal
2. Taps on Customer field
3. Customer Lookup modal slides in (right edge transition)
4. Searches and selects customer
5. Modal dismisses, customer field updates
6. User can save the visit

### Data Persistence
- Sample data includes 15 realistic customer records
- Easily extensible for backend integration
- Search manager for filtering operations

## 🎨 Design Specifications

### Colors
- **Primary**: System Blue (#007AFF)
- **Background**: System Background & System Gray 6
- **Text**: Black (titles) and Gray (secondary)
- **Accents**: System Blue for interactive elements

### Typography
- **Headlines**: 17pt, Semibold
- **Body**: 16pt, Regular
- **Subheadlines**: 13pt, Medium/Regular
- **Labels**: 13pt, Medium, Gray

### Layout
- **Padding**: 16pt standard margins
- **Spacing**: 20pt between sections, 8pt between form elements
- **Corner Radius**: 8pt for buttons and fields
- **List Height**: Adaptive based on content

## 🚀 How to Use

### Running the App
1. Open in Xcode (14.0+)
2. Select iPad Mini as target device
3. Press Cmd+R to run
4. The Add New Visit modal will appear automatically

### Interacting with the Modal

**Adding a Visit:**
1. Select visit type from segmented picker
2. Tap date field to choose date
3. Tap time field to choose time
4. Toggle "All Day Event" if needed
5. Tap customer field to open lookup
6. Search and select customer
7. Tap Save

**Searching for Customers:**
1. Type customer name (e.g., "Target")
2. Or type address portion (e.g., "Main St")
3. Results update in real-time
4. Tap to select

## 🔧 Customization

### Adding Custom Customers
Edit `CustomerDataManager.loadSampleData()` in `CustomerModel.swift`:
```swift
Customer(name: "Your Store Name", address: "Your Address")
```

### Modifying Form Fields
Edit the form fields in `AddNewVisitModal.swift` VStack:
- Change `visitTypes` array for visit type options
- Adjust date/time formats as needed
- Add additional fields in the form

### Styling Updates
- Colors: Use `Color(.systemBlue)` for system colors
- Fonts: Update `.font(.headline)` modifiers
- Spacing: Adjust padding and spacing values

## 📱 iPad Mini Optimization

The design is optimized for iPad Mini's 7.9" display:
- Form Sheet presentation for modal dialogs
- Appropriate padding for touch targets
- Readable font sizes for distance viewing
- List virtualization for performance with large customer lists

## 🔌 Future Enhancements

- Backend API integration for real customer data
- Image upload for customer photos
- Multiple selection support
- Visit history and analytics
- Offline sync capabilities
- Custom field validation
- Photo attachment capability

## 📄 License

This project is provided as-is for demonstration purposes.
