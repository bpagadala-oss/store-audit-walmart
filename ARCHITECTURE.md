# Architecture & Data Flow Guide

## 📐 Application Architecture

### Component Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│         AddNewVisitApp (@main Entry Point)              │
│                                                         │
│  └─ WindowGroup                                         │
│     └─ ContentView                                      │
│        └─ Sheet Modifier (triggers modal presentation) │
│           └─ AddNewVisitModal                           │
│              ├─ Form Fields (5 fields)                  │
│              └─ [Conditional] CustomerLookupModal       │
│                 ├─ SearchBar                            │
│                 └─ List<CustomerListRow>                │
└─────────────────────────────────────────────────────────┘
```

### File Dependency Graph

```
┌──────────────────────┐
│ AddNewVisitApp.swift │
│  (@main entry point) │
└──────────┬───────────┘
           │
           ├─── imports SwiftUI
           │
           └─── uses ContentView
                 │
                 ├─── uses AddNewVisitModal
                 │
                 └─── Sheet Presentation
                       │
                       ├─── imports AddNewVisitModal
                       │
                       └─── uses CustomerLookupModal
                             │
                             ├─── imports CustomerLookupModal
                             ├─── uses SearchBar (internal component)
                             ├─── uses CustomerListRow (internal component)
                             └─── @EnvironmentObject CustomerDataManager
                                   │
                                   └─── imports CustomerModel.swift

┌──────────────────────────────┐
│ CustomerModel.swift          │
│  (Data Layer)                │
│                              │
│  ├─ Customer (Struct)        │
│  └─ CustomerDataManager      │
│     (Singleton)              │
│     - 15 sample customers    │
│     - Search functionality   │
│     - Observable pattern     │
└──────────────────────────────┘
```

---

## 🔄 State Management Flow

### Global State

```
┌─────────────────────────────────────────────────────────────────┐
│ ContentView (@State)                                            │
│                                                                 │
│  @State var showAddVisitModal: Bool = true                      │
│  │                                                              │
│  └─ Binding passed to AddNewVisitModal                          │
└─────────────────────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────────────────────┐
│ AddNewVisitModal (@State & @Binding)                            │
│                                                                 │
│  Local State:                                                   │
│  ├─ @State var visitType: String                               │
│  ├─ @State var visitDate: Date                                 │
│  ├─ @State var visitTime: Date                                 │
│  ├─ @State var isAllDay: Bool                                  │
│  ├─ @State var selectedCustomer: Customer?                     │
│  ├─ @State var showCustomerLookup: Bool                        │
│  │                                                              │
│  Bindings:                                                      │
│  └─ @Binding var isPresented: Bool                             │
│                                                                 │
│  Environment:                                                   │
│  └─ @EnvironmentObject var dataManager: CustomerDataManager    │
└─────────────────────────────────────────────────────────────────┘
        ↓ (if showCustomerLookup == true)
┌─────────────────────────────────────────────────────────────────┐
│ CustomerLookupModal (@Binding & @EnvironmentObject)            │
│                                                                 │
│  Local State:                                                   │
│  ├─ @State var searchText: String                              │
│  │                                                              │
│  Bindings:                                                      │
│  ├─ @Binding var isPresented: Bool                             │
│  └─ @Binding var selectedCustomer: Customer?                   │
│                                                                 │
│  Environment:                                                   │
│  └─ @EnvironmentObject var dataManager: CustomerDataManager    │
│                                                                 │
│  Computed Property:                                             │
│  └─ var filteredCustomers: [Customer]                          │
│     (Filters based on searchText)                              │
└─────────────────────────────────────────────────────────────────┘
```

### Data Binding Pattern

```
ContentView
    |
    | @Binding $showAddVisitModal
    v
AddNewVisitModal
    |
    ├─ Local: visitType, visitDate, visitTime, isAllDay
    |
    ├─ @Binding $selectedCustomer ──────┐
    |                                    |
    | showCustomerLookup = true         |
    |                                    |
    v                                    |
CustomerLookupModal                     |
    |                                    |
    | User selects: selectCustomer()   |
    |                                    |
    └─────── Updates @Binding ──────────┘
             selectedCustomer
             (syncs back to AddNewVisitModal)
    |
    | isPresented = false
    v
Modal dismisses
    |
AddNewVisitModal displays selected customer
```

---

## 🔀 User Interaction Flow

### Complete User Journey: Adding a New Visit

```
START
  |
  v
┌──────────────────────────────────────────────┐
│ 1. App Launches                              │
│    - ContentView loads                       │
│    - showAddVisitModal = true                │
│    - Modal sheet presents                    │
└──────────────────────────────────────────────┘
  |
  v
┌──────────────────────────────────────────────┐
│ 2. AddNewVisitModal Displays                 │
│    - Title: "Add New Visit"                  │
│    - 5 form fields visible                   │
│    - Default values shown                    │
└──────────────────────────────────────────────┘
  |
  +─────────────────┬─────────────────┬────────────────┐
  |                 |                 |                |
  v                 v                 v                v
┌──────┐     ┌─────────┐     ┌──────────┐     ┌────────┐
│ Step │─ or │ Step 4: │ ──or─ │ Step 5: │ ──or─ │ Step 6:│
│  3a: │     │ Pick    │     │ Toggle  │     │ Select │
│ Pick │     │ Time    │     │ All Day │     │Customer│
│ Visit│     │         │     │ Event   │     │        │
│ Type │     │         │     │         │     │        │
└──────┘     └─────────┘     └──────────┘     └────────┘
  |
  |
  +────────────────────────────────────────────────────────┐
  |                                                        |
  v                                                        v
(User can click any field)                  ┌────────────────────────────┐
  |                                         │ Step 6: Tap Customer Field │
  |                                         │  showCustomerLookup = true │
  |                                         └────────────┬───────────────┘
  |                                                      |
  |                                                      v
  |                                         ┌────────────────────────────┐
  |                                         │ 6a. Customer Lookup Modal  │
  |                                         │     - SearchBar displays   │
  |                                         │     - List loads 15 items  │
  |                                         └────────────┬───────────────┘
  |                                                      |
  |                                                      v
  |                                         ┌────────────────────────────┐
  |                                         │ 6b. User Searches (opt)    │
  |                                         │ - searchText updates       │
  |                                         │ - filteredCustomers updates│
  |                                         │ - List re-renders          │
  |                                         └────────────┬───────────────┘
  |                                                      |
  |                                                      v
  |                                         ┌────────────────────────────┐
  |                                         │ 6c. User Selects Customer  │
  |                                         │ - selectCustomer() called  │
  |                                         │ - @Binding updated         │
  |                                         │ - isPresented = false      │
  |                                         └────────────┬───────────────┘
  |                                                      |
  +──────────────────────────────────────────────────────+
  |
  v
┌──────────────────────────────────────────────┐
│ 7. Back to AddNewVisitModal                  │
│    - Customer field now shows selected name  │
│    - User can modify other fields            │
│    - Or save the visit                       │
└──────────────────────────────────────────────┘
  |
  +──────────────┬──────────────────┐
  |              |                  |
  |              | User taps Save   | User taps Cancel
  v              v                  v
┌──────┐  ┌──────────────────┐  ┌──────────────┐
│ Edit │  │ 8. Save Visit    │  │ 9. Dismiss   │
│Other │  │ - Print details  │  │ - isPresented│
│Fields│  │ - Modal closes   │  │   = false    │
│      │  │ - Return to main │  │ - Return to  │
│      │  │   content view   │  │   main view  │
└──────┘  └──────────────────┘  └──────────────┘
  |
  └─────────────┬──────────────────┘
               |
               v
            END
```

---

## 🎯 Component Interaction Matrix

| Component | Parent | Child | State | Binding | Environment |
|-----------|--------|-------|-------|---------|-------------|
| AddNewVisitApp | - | ContentView | - | - | - |
| ContentView | AddNewVisitApp | AddNewVisitModal | showAddVisitModal | - | - |
| AddNewVisitModal | ContentView | CustomerLookupModal | 6 local states | 1 binding | DataManager |
| CustomerLookupModal | AddNewVisitModal | SearchBar, List | searchText | 2 bindings | DataManager |
| SearchBar | CustomerLookupModal | - | - | 1 binding | - |
| CustomerListRow | List | - | - | - | - |
| CustomerDataManager | - | - | customers | @Published | - |

---

## 📊 Data Structure Relationships

```
┌─────────────────────────────────────┐
│ Customer Struct                     │
│                                     │
│ ├─ id: UUID (unique identifier)    │
│ ├─ name: String                    │
│ └─ address: String                 │
│                                     │
│ Conforms to:                        │
│ ├─ Identifiable (for List)          │
│ └─ Equatable (for comparison)       │
└─────────────────────────────────────┘
         ↑
         |
         | 1-to-Many
         |
┌─────────────────────────────────────┐
│ CustomerDataManager                 │
│                                     │
│ ├─ @Published var customers: [...]  │
│ └─ init() loads 15 sample customers │
│                                     │
│ Methods:                            │
│ └─ searchCustomers(query) -> [...]  │
└─────────────────────────────────────┘
         ↑
         |
         | Shared via
         | @EnvironmentObject
         |
    ┌────┴────┐
    |          |
AddNewVisitModal
    |          |
    +──────────+
  CustomerLookupModal
```

---

## 🔌 Integration Points & APIs

### AddNewVisitModal Public Interface

```swift
struct AddNewVisitModal: View {
    @Binding var isPresented: Bool          // Input/Output: Modal visibility
    @EnvironmentObject var dataManager      // Input: Customer data source
    
    // Internal state (private)
    @State private var visitType            // Form field
    @State private var visitDate            // Form field
    @State private var visitTime            // Form field
    @State private var isAllDay             // Form field
    @State private var selectedCustomer     // Form field
    @State private var showCustomerLookup   // Toggle lookup modal
    
    // Methods
    private func saveVisit()                // Saves and dismisses
}
```

### CustomerLookupModal Public Interface

```swift
struct CustomerLookupModal: View {
    @Binding var isPresented: Bool          // Input/Output: Modal visibility
    @Binding var selectedCustomer           // Output: Selected customer
    @EnvironmentObject var dataManager      // Input: Customer data source
    
    // Internal state (private)
    @State private var searchText           // Search input
    
    // Computed properties
    var filteredCustomers                   // Filtered results
    
    // Methods
    private func selectCustomer(_:)         // Selection handler
}
```

### CustomerDataManager Public Interface

```swift
class CustomerDataManager: ObservableObject {
    static let shared: CustomerDataManager  // Singleton instance
    
    @Published var customers: [Customer]    // Reactive customer list
    
    // Methods
    func searchCustomers(query: String) -> [Customer]  // Search API
}
```

---

## 🎨 View Hierarchy & Rendering

### AddNewVisitModal Layout

```
ZStack
├─ VStack (Main container)
│  ├─ VStack (Header)
│  │  ├─ HStack
│  │  │  ├─ Button (Cancel)
│  │  │  ├─ Spacer
│  │  │  ├─ Text (Title)
│  │  │  ├─ Spacer
│  │  │  └─ Button (Save)
│  │  └─ Divider
│  │
│  └─ ScrollView (Content)
│     └─ VStack (Form fields)
│        ├─ VStack (Visit Type) ────┐
│        │  ├─ Text (Label)         │
│        │  └─ Picker (Segmented)   │
│        │                           │
│        ├─ VStack (Date)           │
│        │  ├─ Text (Label)         │
│        │  └─ DatePicker           │
│        │                           │
│        ├─ VStack (Time)           │
│        │  ├─ Text (Label)         │
│        │  └─ DatePicker           │
│        │                           │
│        ├─ VStack (All Day)        │
│        │  ├─ HStack              │
│        │  │  ├─ Text (Label)     │
│        │  │  ├─ Spacer           │
│        │  │  └─ Toggle           │
│        │  └─ [...]               │
│        │                           │
│        ├─ VStack (Customer)       │
│        │  ├─ Text (Label)         │
│        │  └─ Button (Select)      │
│        │                           │
│        └─ Spacer
│
└─ [Conditional] CustomerLookupModal
   (if showCustomerLookup == true)
```

### CustomerLookupModal Layout

```
VStack
├─ HStack (Header)
│  ├─ Button (Back)
│  ├─ Spacer
│  ├─ Text (Title)
│  ├─ Spacer
│  └─ Button (Done)
│
├─ Divider
│
├─ SearchBar (Custom)
│  ├─ Image (Magnifying glass)
│  ├─ TextField
│  └─ Button (Clear, conditional)
│
├─ [if empty] VStack (Empty state)
│  ├─ Image (Icon)
│  ├─ Text (Message)
│  └─ Text (Hint, conditional)
│
└─ [if not empty] List
   ├─ CustomerListRow
   │  ├─ Text (Name)
   │  └─ Text (Address)
   └─ ...more rows...
```

---

## 📈 Performance Considerations

### Optimization Strategies Used

1. **List Virtualization**
   - SwiftUI's `List` automatically handles virtualization
   - Only renders visible cells
   - Recycles cells off-screen
   - Efficiently handles 15+ customers

2. **Filtering**
   - Computed property `filteredCustomers`
   - Case-insensitive matching
   - Direct string search (no regex overhead)
   - Real-time, no debouncing needed for 15 items

3. **State Management**
   - Minimal @State variables
   - @Binding for data synchronization
   - @EnvironmentObject shared single instance
   - No unnecessary view refreshes

4. **Memory Usage**
   - Singleton CustomerDataManager (one instance)
   - Sample data pre-loaded (negligible size)
   - Proper cleanup on modal dismissal
   - No memory leaks with view bindings

---

## 🔄 State Mutation Flows

### Visit Type Selection
```
User taps Picker option
    ↓
@State var visitType updated
    ↓
AddNewVisitModal body re-renders
    ↓
Picker reflects new selection
```

### Customer Selection
```
User taps customer in lookup list
    ↓
selectCustomer(_ customer) called
    ↓
$selectedCustomer binding updated
    ↓
AddNewVisitModal sees binding change
    ↓
showCustomerLookup = false
    ↓
CustomerLookupModal dismissed
    ↓
AddNewVisitModal re-renders with selected customer
    ↓
Customer field shows customer name
```

### Search Filtering
```
User types in search field
    ↓
TextField text binding updated
    ↓
@State var searchText changed
    ↓
filteredCustomers computed property re-evaluated
    ↓
List<filteredCustomers> re-renders
    ↓
Matching customers display
```

---

## 🎓 Design Patterns Used

### 1. MVVM (Model-View-ViewModel)
- **Model**: `Customer`, `CustomerDataManager`
- **View**: SwiftUI components
- **ViewModel**: Implicit (state management)

### 2. Singleton Pattern
- `CustomerDataManager.shared`
- Single instance across entire app
- Thread-safe (ObservableObject handles dispatch)

### 3. Container/Presentational Pattern
- `AddNewVisitModal`: Container component
- `SearchBar`, `CustomerListRow`: Presentational components

### 4. Compound Component Pattern
- `CustomerLookupModal` encapsulates `SearchBar` and `CustomerListRow`
- Each has single responsibility
- Composed together for complete feature

### 5. Observable/Reactive Pattern
- `@Published` in `CustomerDataManager`
- `@State` for local state
- `@Binding` for parent-child communication
- Automatic UI updates on data changes

---

## 🚀 Execution Timeline

```
T+0ms:    App launches
T+10ms:   AddNewVisitApp executes
T+20ms:   WindowGroup creates ContentView
T+30ms:   ContentView renders with modal state
T+50ms:   AddNewVisitModal sheet presents
T+100ms:  Form fields render with default values
T+150ms:  CustomerDataManager initializes with 15 customers
T+200ms:  UI fully interactive

User interaction:
T+1000ms: User taps Customer field
T+1050ms: showCustomerLookup = true
T+1100ms: CustomerLookupModal renders with transition
T+1150ms: SearchBar and list display

T+2000ms: User types search query
T+2010ms: searchText updates
T+2020ms: filteredCustomers re-computed
T+2030ms: List re-renders with filtered results

T+3000ms: User taps customer row
T+3010ms: selectCustomer() called
T+3020ms: $selectedCustomer binding updated
T+3030ms: isPresented = false
T+3100ms: CustomerLookupModal transitions out
T+3150ms: AddNewVisitModal shows selected customer

T+4000ms: User taps Save
T+4010ms: saveVisit() executes
T+4020ms: Console output printed
T+4030ms: isPresented = false
T+4100ms: Modal dismisses
T+4150ms: Back to content view
```

---

## 📚 Related Files

- **README.md**: Feature documentation
- **SETUP_INSTRUCTIONS.md**: Setup guide
- **PROJECT_SUMMARY.md**: Quick reference
- **All Swift files**: Implementation details with `// MARK:` sections

---

**Last Updated**: October 29, 2025
