import WalmartStoreHeader from '../components/WalmartStoreHeader';

export default function WalmartHeaderDemo() {
  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      {/* iPad 11 Frame - 1194 x 834 (Landscape) */}
      <div className="bg-black rounded-3xl shadow-2xl" style={{ width: '1194px', height: '834px' }}>
        {/* iPad bezel */}
        <div className="w-full h-full bg-white rounded-3xl overflow-hidden flex flex-col">
          {/* Status bar area */}
          <WalmartStoreHeader />
          
          {/* Content area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-8 bg-gray-50">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Walmart Store Tasks</h2>
              <p className="text-gray-600 mb-6">
                iPad 11" Landscape (1194 × 834px) - Pixel Perfect Design
              </p>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500">
                  This component is optimized for iPad 11-inch displays in landscape orientation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
