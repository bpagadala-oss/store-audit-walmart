# Setup Instructions for iPad Mini "Add New Visit" Modal

## Prerequisites
- Xcode 14.0 or later
- macOS 12.0 or later
- Apple Developer Account (for device testing)

## Step-by-Step Setup

### 1. Create a New Xcode Project
```bash
# Option A: Using Xcode GUI
# 1. Open Xcode
# 2. Select "Create a new Xcode project"
# 3. Choose "iOS" platform
# 4. Select "App" template
# 5. Configure project settings:
#    - Product Name: "AddNewVisit"
#    - Team ID: Your team (if needed)
#    - Organization Identifier: "com.example"
#    - Interface: SwiftUI
#    - Life Cycle: SwiftUI App
#    - Language: Swift
```

### 2. File Structure in Xcode

Once you have created the project, add these files to your project:

```
AddNewVisit/
├── AddNewVisitApp.swift
├── AddNewVisitModal.swift
├── CustomerLookupModal.swift
├── CustomerModel.swift
├── Preview Content/
│   └── Preview Assets.xcassets
└── AddNewVisit.entitlements
```

### 3. Copy Files to Project

For each Swift file:
1. In Xcode, right-click the project folder
2. Select "Add Files to AddNewVisit..."
3. Navigate to and select each `.swift` file
4. Ensure "Copy items if needed" is checked
5. Click "Add"

Alternatively, you can drag and drop the files directly into Xcode.

### 4. Update Main Entry Point

Delete or replace the default `AddNewVisitApp.swift` file with the provided one. The provided file already contains the `@main` entry point.

### 5. Build Settings (Optional)

For iPad Mini optimization:
1. Select project in Project Navigator
2. Go to Build Settings
3. Search for "Deployment Target"
4. Set iOS Deployment Target to 14.0 or later
5. Set Supported Platforms to "iOS" (or include iPadOS if needed)

### 6. Run on iPad Mini Simulator

**Option A: Using Simulator**
```bash
# Start iPad Mini simulator
open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app

# Or from Xcode:
# 1. Select simulator from top menu: iPad mini (7th generation)
# 2. Press Cmd+R to run
```

**Option B: Using Physical iPad Mini**
```bash
# 1. Connect iPad to Mac via USB
# 2. Trust the connection on iPad
# 3. Select iPad from Xcode's device menu
# 4. Press Cmd+R to run
```

### 7. Verify Functionality

Test the following features:

#### Add New Visit Modal:
- [ ] Modal appears on launch
- [ ] Visit Type picker works (try selecting different types)
- [ ] Date picker opens and allows selection
- [ ] Time picker opens and allows selection
- [ ] All Day Event toggle works
- [ ] Customer field displays "Select Customer" placeholder

#### Customer Lookup:
- [ ] Tapping Customer field opens lookup modal
- [ ] Search bar appears at top
- [ ] Customer list displays with names and addresses
- [ ] Typing in search filters results
- [ ] Selecting a customer closes modal and updates Customer field
- [ ] Back button returns to Add New Visit modal

#### Save Functionality:
- [ ] Console prints visit details when Save is tapped
- [ ] Modal dismisses after Save
- [ ] Cancel button closes modal without saving

## Troubleshooting

### Issue: "Type 'CustomerDataManager' is not defined"
**Solution**: Ensure all four Swift files are added to the project and the target is set correctly.

### Issue: Preview not showing
**Solution**: 
1. Click Resume in the preview canvas
2. Or restart Xcode
3. Ensure all files are in the same target

### Issue: Blue tint color not appearing
**Solution**: Colors use iOS system colors which may appear different based on light/dark mode. This is normal.

### Issue: Modal doesn't appear on launch
**Solution**: In `AddNewVisitApp.swift`, check that `@State private var showAddVisitModal = true`

## Architecture Overview

The project follows these design patterns:

### MVVM (Model-View-ViewModel)
- **Models**: `Customer` struct, `CustomerDataManager` class
- **Views**: `AddNewVisitModal`, `CustomerLookupModal`, `SearchBar`, `CustomerListRow`
- **State Management**: `@State`, `@Binding`, `@EnvironmentObject`

### Separation of Concerns
- **AddNewVisitApp**: App lifecycle and routing
- **AddNewVisitModal**: Main form UI and logic
- **CustomerLookupModal**: Search and selection UI
- **CustomerModel**: Data models and business logic

### Data Flow
```
ContentView
    ↓
AddNewVisitModal
    ├── State: visitType, visitDate, visitTime, etc.
    └── Tap Customer Field
        ↓
        CustomerLookupModal
            ├── EnvironmentObject: CustomerDataManager
            └── Filtered Search Results
                ↓
                Select Customer → Updates Binding
```

## Customization Guide

### Change Initial Date/Time
Edit `AddNewVisitModal.swift`:
```swift
@State private var visitDate = Date()  // Change to custom date
@State private var visitTime = Date()  // Change to custom time
```

### Add More Customers
Edit `CustomerModel.swift` `loadSampleData()`:
```swift
Customer(name: "Store Name", address: "Street Address, City, State ZIP")
```

### Change Colors
Search and replace `.blue` with your preferred system color:
- `.blue` → `.green`, `.red`, `.orange`, etc.
- Or use custom colors: `Color(red: 0.0, green: 0.5, blue: 1.0)`

### Modify Field Labels
Edit the `Text()` labels in `AddNewVisitModal.swift`:
```swift
Text("Visit Type")  // Change to your label
```

## iPad-Specific Optimization

The project uses:
- **Form Sheet Presentation**: `.presentationDetents([.large])` for modals
- **Proper Spacing**: 16pt padding optimized for iPad
- **Touch Targets**: Minimum 44pt x 44pt hit areas
- **Landscape Support**: Views adapt to landscape orientation
- **Larger Fonts**: Readable at distance on larger screen

## Next Steps

1. **Backend Integration**: Connect to your API for real customer data
2. **Validation**: Add field validation before saving
3. **Error Handling**: Implement error states and alerts
4. **Photo Support**: Add photo capture or upload
5. **History**: Store and display past visits
6. **Sync**: Implement offline sync capabilities

## Support

For issues or questions:
1. Check the README.md for feature documentation
2. Review code comments marked with `// MARK:`
3. Test on actual iPad Mini device for accurate display
4. Check Xcode console for debug output

---

Happy coding! 🚀
