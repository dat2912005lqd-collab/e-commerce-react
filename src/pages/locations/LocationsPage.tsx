import { useEffect, useState } from 'react';

interface Location {
  id: number;
  name: string;
  address: string;
}

const LocationsPage = () => {
  const [locations, setLocations] = useState<Location[]>([
    { id: 1, name: 'Chi nhánh Hà Nội', address: '123 Đường Phố, Hà Nội' },
    { id: 2, name: 'Chi nhánh HCM', address: '456 Đường Phố, TP.HCM' },
    { id: 3, name: 'Chi nhánh Đà Nẵng', address: '789 Đường Phố, Đà Nẵng' },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cửa hàng</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {locations.map(loc => (
          <div key={loc.id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{loc.name}</h3>
            <p className="text-gray-600">{loc.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsPage;