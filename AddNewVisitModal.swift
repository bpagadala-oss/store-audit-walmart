import SwiftUI

struct AddNewVisitModal: View {
    @Binding var isPresented: Bool
    @State private var visitType = "Grocery / Sales"
    @State private var visitDate = Date()
    @State private var visitTime = Date()
    @State private var isAllDay = false
    @State private var selectedCustomer: Customer?
    @State private var showCustomerLookup = false
    
    let visitTypes = ["Grocery / Sales", "Maintenance", "Installation", "Support", "Other"]
    
    var body: some View {
        ZStack {
            VStack(spacing: 0) {
                // MARK: - Header
                VStack {
                    HStack {
                        Button(action: { isPresented = false }) {
                            Text("Cancel")
                                .font(.body)
                                .foregroundColor(.blue)
                        }
                        
                        Spacer()
                        
                        Text("Add New Visit")
                            .font(.headline)
                            .fontWeight(.semibold)
                        
                        Spacer()
                        
                        Button(action: saveVisit) {
                            Text("Save")
                                .font(.body)
                                .fontWeight(.semibold)
                                .foregroundColor(.blue)
                        }
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 12)
                    
                    Divider()
                }
                
                // MARK: - Form Content
                ScrollView {
                    VStack(spacing: 20) {
                        // Visit Type Picker
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Visit Type")
                                .font(.subheadline)
                                .fontWeight(.medium)
                                .foregroundColor(.gray)
                            
                            Picker("Visit Type", selection: $visitType) {
                                ForEach(visitTypes, id: \.self) { type in
                                    Text(type).tag(type)
                                }
                            }
                            .pickerStyle(.segmented)
                            .tint(.blue)
                        }
                        
                        // Date Field
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Date")
                                .font(.subheadline)
                                .fontWeight(.medium)
                                .foregroundColor(.gray)
                            
                            DatePicker(
                                "Date",
                                selection: $visitDate,
                                displayedComponents: [.date]
                            )
                            .datePickerStyle(.compact)
                            .tint(.blue)
                        }
                        
                        // Time Field
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Time")
                                .font(.subheadline)
                                .fontWeight(.medium)
                                .foregroundColor(.gray)
                            
                            DatePicker(
                                "Time",
                                selection: $visitTime,
                                displayedComponents: [.hourAndMinute]
                            )
                            .datePickerStyle(.compact)
                            .tint(.blue)
                        }
                        
                        // All Day Event Toggle
                        VStack(alignment: .leading, spacing: 8) {
                            HStack {
                                Text("All Day Event")
                                    .font(.subheadline)
                                    .fontWeight(.medium)
                                
                                Spacer()
                                
                                Toggle("", isOn: $isAllDay)
                                    .tint(.blue)
                            }
                        }
                        
                        // Customer Field
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Customer")
                                .font(.subheadline)
                                .fontWeight(.medium)
                                .foregroundColor(.gray)
                            
                            Button(action: { showCustomerLookup = true }) {
                                HStack {
                                    Text(selectedCustomer?.name ?? "Select Customer")
                                        .foregroundColor(selectedCustomer == nil ? .gray : .black)
                                    
                                    Spacer()
                                    
                                    Image(systemName: "chevron.right")
                                        .foregroundColor(.gray)
                                }
                                .frame(maxWidth: .infinity)
                                .padding(12)
                                .background(Color(.systemGray6))
                                .cornerRadius(8)
                            }
                        }
                        
                        Spacer()
                            .frame(height: 20)
                    }
                    .padding(16)
                }
            }
            
            if showCustomerLookup {
                CustomerLookupModal(
                    isPresented: $showCustomerLookup,
                    selectedCustomer: $selectedCustomer
                )
                .transition(.move(edge: .trailing))
            }
        }
        .environmentObject(CustomerDataManager.shared)
    }
    
    private func saveVisit() {
        print("Saving visit:")
        print("  Type: \(visitType)")
        print("  Date: \(visitDate.formatted(date: .abbreviated, time: .omitted))")
        print("  Time: \(visitTime.formatted(date: .omitted, time: .shortened))")
        print("  All Day: \(isAllDay)")
        print("  Customer: \(selectedCustomer?.name ?? "None selected")")
        
        isPresented = false
    }
}

#Preview {
    @State var isPresented = true
    return AddNewVisitModal(isPresented: $isPresented)
        .presentationDetents([.large])
}
