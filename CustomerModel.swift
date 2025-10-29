import Foundation

// MARK: - Customer Model
struct Customer: Identifiable, Equatable {
    let id: UUID
    let name: String
    let address: String
    
    init(name: String, address: String) {
        self.id = UUID()
        self.name = name
        self.address = address
    }
    
    static func == (lhs: Customer, rhs: Customer) -> Bool {
        lhs.id == rhs.id
    }
}

// MARK: - Customer Data Manager
class CustomerDataManager: ObservableObject {
    static let shared = CustomerDataManager()
    
    @Published var customers: [Customer] = []
    
    private init() {
        loadSampleData()
    }
    
    private func loadSampleData() {
        customers = [
            Customer(name: "Target Store #145", address: "123 Main St, Anytown, CA 90210"),
            Customer(name: "Walmart Supercenter", address: "456 Oak Ave, Springfield, IL 62701"),
            Customer(name: "Whole Foods Market", address: "789 Pine Rd, Boulder, CO 80301"),
            Customer(name: "Trader Joe's #234", address: "321 Maple Dr, Seattle, WA 98101"),
            Customer(name: "CVS Pharmacy #567", address: "654 Cedar Ln, Portland, OR 97201"),
            Customer(name: "Costco Warehouse", address: "987 Birch St, Austin, TX 78701"),
            Customer(name: "Best Buy #890", address: "147 Elm Ave, Denver, CO 80202"),
            Customer(name: "Home Depot #123", address: "258 Spruce Rd, Boston, MA 02101"),
            Customer(name: "Lowe's Home Improvement", address: "369 Willow Ln, Miami, FL 33101"),
            Customer(name: "Bed Bath & Beyond #456", address: "741 Ash Dr, Chicago, IL 60601"),
            Customer(name: "Kohls Department Store", address: "852 Fir Ave, Houston, TX 77001"),
            Customer(name: "Target Store #256", address: "963 Spruce St, Phoenix, AZ 85001"),
            Customer(name: "Walgreens #789", address: "159 Holly Rd, Philadelphia, PA 19101"),
            Customer(name: "Best Buy #234", address: "753 Dogwood Ln, San Antonio, TX 78201"),
            Customer(name: "Whole Foods #890", address: "456 Juniper Ave, San Diego, CA 92101"),
        ]
    }
    
    func searchCustomers(query: String) -> [Customer] {
        if query.isEmpty {
            return customers
        }
        return customers.filter { customer in
            customer.name.localizedCaseInsensitiveContains(query) ||
            customer.address.localizedCaseInsensitiveContains(query)
        }
    }
}
