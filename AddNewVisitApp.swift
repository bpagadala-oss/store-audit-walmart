import SwiftUI

@main
struct AddNewVisitApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

// MARK: - Content View
struct ContentView: View {
    @State private var showAddVisitModal = true
    
    var body: some View {
        ZStack {
            Color(.systemGray6)
                .ignoresSafeArea()
            
            Text("Main Content")
                .font(.headline)
        }
        .sheet(isPresented: $showAddVisitModal) {
            AddNewVisitModal(isPresented: $showAddVisitModal)
                .presentationDetents([.large])
                .presentationDragIndicator(.visible)
        }
    }
}
