import SwiftUI

struct CustomerLookupModal: View {
    @Binding var isPresented: Bool
    @Binding var selectedCustomer: Customer?
    @State private var searchText = ""
    @EnvironmentObject var dataManager: CustomerDataManager
    
    var filteredCustomers: [Customer] {
        if searchText.isEmpty {
            return dataManager.customers
        }
        return dataManager.customers.filter { customer in
            customer.name.localizedCaseInsensitiveContains(searchText) ||
            customer.address.localizedCaseInsensitiveContains(searchText)
        }
    }
    
    var body: some View {
        VStack(spacing: 0) {
            // MARK: - Header
            HStack {
                Button(action: { isPresented = false }) {
                    Image(systemName: "chevron.left")
                        .font(.body)
                        .fontWeight(.medium)
                        .foregroundColor(.blue)
                }
                
                Spacer()
                
                Text("Select Customer")
                    .font(.headline)
                    .fontWeight(.semibold)
                
                Spacer()
                
                Button(action: { isPresented = false }) {
                    Text("Done")
                        .font(.body)
                        .fontWeight(.semibold)
                        .foregroundColor(.blue)
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 12)
            
            Divider()
            
            // MARK: - Search Bar
            SearchBar(text: $searchText)
                .padding(12)
                .background(Color(.systemGray6))
            
            // MARK: - Customer List (Virtualized)
            if filteredCustomers.isEmpty {
                VStack(spacing: 12) {
                    Image(systemName: "magnifyingglass")
                        .font(.system(size: 48))
                        .foregroundColor(.gray)
                    
                    Text("No customers found")
                        .font(.headline)
                        .foregroundColor(.gray)
                    
                    if !searchText.isEmpty {
                        Text("Try a different search term")
                            .font(.subheadline)
                            .foregroundColor(.gray)
                    }
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .background(Color(.systemBackground))
            } else {
                List(filteredCustomers, id: \.id) { customer in
                    CustomerListRow(customer: customer)
                        .contentShape(Rectangle())
                        .onTapGesture {
                            selectCustomer(customer)
                        }
                }
                .listStyle(.plain)
            }
        }
        .background(Color(.systemBackground))
        .navigationBarBackButtonHidden(true)
    }
    
    private func selectCustomer(_ customer: Customer) {
        selectedCustomer = customer
        isPresented = false
    }
}

// MARK: - Search Bar Component
struct SearchBar: View {
    @Binding var text: String
    
    var body: some View {
        HStack {
            Image(systemName: "magnifyingglass")
                .foregroundColor(.gray)
            
            TextField("Search by name or address", text: $text)
                .textFieldStyle(.roundedBorder)
            
            if !text.isEmpty {
                Button(action: { text = "" }) {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundColor(.gray)
                }
            }
        }
        .padding(8)
        .background(Color(.systemGray6))
        .cornerRadius(8)
    }
}

// MARK: - Customer List Row
struct CustomerListRow: View {
    let customer: Customer
    
    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(customer.name)
                .font(.body)
                .fontWeight(.semibold)
                .foregroundColor(.black)
            
            Text(customer.address)
                .font(.subheadline)
                .foregroundColor(.gray)
                .lineLimit(2)
        }
        .padding(.vertical, 8)
    }
}

#Preview {
    @State var isPresented = true
    @State var selectedCustomer: Customer? = nil
    
    return CustomerLookupModal(
        isPresented: $isPresented,
        selectedCustomer: $selectedCustomer
    )
    .environmentObject(CustomerDataManager.shared)
}
