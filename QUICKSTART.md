# Quick Start Guide - iPad Mini "Add New Visit" Modal

## 🚀 Get Running in 5 Minutes

### Step 1: Create Xcode Project
```bash
# Open Xcode and create a new iOS App project:
# - File → New → Project
# - Choose: iOS → App
# - Product Name: AddNewVisit
# - Interface: SwiftUI
# - Language: Swift
```

### Step 2: Copy Swift Files
Copy these 4 files into your Xcode project:
- `AddNewVisitApp.swift`
- `AddNewVisitModal.swift`
- `CustomerLookupModal.swift`
- `CustomerModel.swift`

**Drag & drop into Xcode**, or:
1. Right-click project folder → "Add Files to AddNewVisit..."
2. Select all 4 Swift files
3. Ensure "Copy items if needed" is checked

### Step 3: Delete Default Files (Optional)
If Xcode created default `ContentView.swift` or `AddNewVisitApp.swift`, you can delete them. The provided files already include these.

### Step 4: Run
```bash
# Select device: iPad mini (7th generation) from top menu
# Press: Cmd + R
```

✅ **Done!** The modal should appear immediately.

---

## 📱 What You'll See

### On Launch
- Full-screen modal titled "Add New Visit"
- 5 form fields ready to use
- Modal covers the screen with Cancel/Save buttons

### Form Fields (Top to Bottom)
1. **Visit Type** - Segmented control with 5 options
2. **Date** - Date picker initialized to today
3. **Time** - Time picker initialized to current time
4. **All Day Event** - Toggle switch (off by default)
5. **Customer** - Button showing "Select Customer"

### Test It Out
```
1. Tap different visit types → See segment change
2. Tap date field → Calendar picker opens
3. Tap time field → Time picker opens
4. Toggle "All Day Event" → Switch animates
5. Tap "Select Customer" → Customer lookup modal slides in
   a. Type in search (e.g., "Target") → See filtering
   b. Tap a customer → Modal closes, customer name appears
6. Tap "Save" → Console prints details, modal dismisses
```

---

## 🎯 File Reference

| File | Purpose | Lines |
|------|---------|-------|
| AddNewVisitApp.swift | App entry point + main content | 40 |
| AddNewVisitModal.swift | Main form modal | 180 |
| CustomerLookupModal.swift | Customer search + selection | 160 |
| CustomerModel.swift | Data models + manager | 65 |
| **Total** | **4 Swift files** | **~445** |

---

## 🔧 Testing Checklist

- [ ] App launches without errors
- [ ] Modal appears on screen
- [ ] Visit Type segmented picker works
- [ ] Date picker opens and works
- [ ] Time picker opens and works
- [ ] All Day toggle animates
- [ ] Tapping Customer field opens lookup modal
- [ ] Search bar filters customers in real-time
- [ ] Selecting a customer closes lookup and updates field
- [ ] Back button in lookup goes back
- [ ] Save button closes the modal
- [ ] Cancel button closes the modal without saving

---

## 💡 Pro Tips

### View Console Output
```bash
# When you tap Save, output appears in Xcode console:
# Menu: View → Debug Area → Show Debug Area (Cmd+Shift+Y)
```

### Try Different Data
Edit `CustomerModel.swift` and add more customers:
```swift
Customer(name: "Your Store", address: "123 Main St, City, ST 12345")
```

### Change Initial Date/Time
Edit `AddNewVisitModal.swift` to set custom defaults:
```swift
@State private var visitDate = Date()  // Today
@State private var visitTime = Date()  // Now
```

### Dark Mode
The app automatically adapts to Dark Mode. Test it:
- Xcode: Scheme → Edit Scheme → Run → Options → Appearance: Dark

### iPad Landscape Mode
Rotate your iPad/simulator (Cmd+Right Arrow) to test landscape.

---

## ❓ Troubleshooting

### "Cannot find type 'Customer' in scope"
**Solution**: Ensure `CustomerModel.swift` is added to the project and included in the build target.

### Modal doesn't appear
**Solution**: Check that `showAddVisitModal = true` in `AddNewVisitApp.swift`.

### Build fails with import errors
**Solution**: Make sure all 4 Swift files are:
1. Added to the project (File Inspector shows them)
2. In the same target (Build Phases tab)
3. Using correct filenames

### Preview not loading
**Solution**:
1. Click "Resume" in the preview canvas
2. Try Cmd+Shift+K to clean build folder
3. Close and reopen the file

### Nothing appears
**Solution**:
1. Check Xcode console for errors (Cmd+Shift+Y)
2. Try Product → Clean Build Folder (Cmd+Shift+K)
3. Restart Xcode

---

## 📚 Next Steps

After you get the basic app running:

1. **Add Backend**: Connect to your API for real customer data
2. **Validation**: Add error checking before save
3. **Persistence**: Save visits to Core Data or database
4. **Photos**: Add ability to take photos during visit
5. **Maps**: Show customer location on map
6. **Offline**: Sync data when connection available

---

## 📖 Documentation Files

For more details, check these files:

| File | Purpose |
|------|---------|
| `README.md` | Complete feature documentation |
| `SETUP_INSTRUCTIONS.md` | Detailed setup guide + troubleshooting |
| `PROJECT_SUMMARY.md` | Quick reference + statistics |
| `ARCHITECTURE.md` | Data flow + design patterns |
| `QUICKSTART.md` | This file - fast setup |

---

## 🎓 Learning from This Project

This project demonstrates:
- ✅ SwiftUI modals and sheets
- ✅ Form handling with multiple field types
- ✅ State management (@State, @Binding, @EnvironmentObject)
- ✅ Search and filtering
- ✅ List virtualization
- ✅ Custom components
- ✅ MVVM architecture
- ✅ iOS design best practices

---

## 💬 Questions?

1. Check `README.md` for feature docs
2. Check `ARCHITECTURE.md` for technical details
3. Check `SETUP_INSTRUCTIONS.md` for setup issues
4. Review code comments (look for `// MARK:`)
5. Check Xcode console for error messages

---

## ✨ You're All Set!

You now have a fully functional iPad mini modal with:
- ✅ Add New Visit form
- ✅ Customer lookup with search
- ✅ Responsive design
- ✅ Professional UI
- ✅ Ready for customization

**Happy coding!** 🚀

---

**Created**: October 29, 2025
**Status**: ✅ Ready to Use
