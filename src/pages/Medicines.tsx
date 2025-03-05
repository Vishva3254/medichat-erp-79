
import { useState } from 'react';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/ui/Transitions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, Filter, Plus, Search } from 'lucide-react';

interface Medicine {
  id: string;
  name: string;
  type: string;
  dosage: string;
  manufacturer: string;
  stock: number;
  expiry: string;
  price: number;
}

const sampleMedicines: Medicine[] = [
  {
    id: 'm1',
    name: 'Amoxicillin',
    type: 'Antibiotic',
    dosage: '500mg',
    manufacturer: 'Pfizer Inc.',
    stock: 125,
    expiry: '2025-06-15',
    price: 12.99
  },
  {
    id: 'm2',
    name: 'Lisinopril',
    type: 'Blood Pressure',
    dosage: '10mg',
    manufacturer: 'Merck & Co.',
    stock: 85,
    expiry: '2024-11-20',
    price: 15.50
  },
  {
    id: 'm3',
    name: 'Atorvastatin',
    type: 'Cholesterol',
    dosage: '20mg',
    manufacturer: 'AstraZeneca',
    stock: 62,
    expiry: '2025-03-10',
    price: 22.75
  },
  {
    id: 'm4',
    name: 'Metformin',
    type: 'Diabetes',
    dosage: '1000mg',
    manufacturer: 'Novartis',
    stock: 114,
    expiry: '2025-01-05',
    price: 8.25
  },
  {
    id: 'm5',
    name: 'Levothyroxine',
    type: 'Thyroid',
    dosage: '50mcg',
    manufacturer: 'GlaxoSmithKline',
    stock: 95,
    expiry: '2024-10-15',
    price: 14.80
  },
  {
    id: 'm6',
    name: 'Albuterol',
    type: 'Respiratory',
    dosage: '90mcg',
    manufacturer: 'Roche',
    stock: 38,
    expiry: '2024-08-22',
    price: 19.95
  },
  {
    id: 'm7',
    name: 'Sertraline',
    type: 'Antidepressant',
    dosage: '50mg',
    manufacturer: 'Eli Lilly',
    stock: 72,
    expiry: '2025-04-18',
    price: 17.35
  },
  {
    id: 'm8',
    name: 'Ibuprofen',
    type: 'Pain Reliever',
    dosage: '400mg',
    manufacturer: 'Johnson & Johnson',
    stock: 186,
    expiry: '2025-09-30',
    price: 6.99
  }
];

const medicineTypes = [
  'All Types',
  'Antibiotic',
  'Blood Pressure',
  'Cholesterol',
  'Diabetes',
  'Thyroid',
  'Respiratory',
  'Antidepressant',
  'Pain Reliever'
];

const Medicines = () => {
  const [medicines, setMedicines] = useState<Medicine[]>(sampleMedicines);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'out'>('all');

  const filteredMedicines = medicines.filter(medicine => {
    // Filter by search
    if (searchQuery && !medicine.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Filter by type
    if (typeFilter !== 'All Types' && medicine.type !== typeFilter) {
      return false;
    }

    // Filter by stock
    if (stockFilter === 'low' && medicine.stock > 20) {
      return false;
    }
    if (stockFilter === 'out' && medicine.stock > 0) {
      return false;
    }

    return true;
  });

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <FadeIn>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Medicines Inventory</h1>
          <p className="text-muted-foreground">
            Manage and track medicines stock and information
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9">
          <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
            <div className="w-full md:w-auto flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search medicines..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select
                value={typeFilter}
                onValueChange={setTypeFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  {medicineTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button
                variant={stockFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStockFilter('all')}
              >
                All Stock
              </Button>
              <Button
                variant={stockFilter === 'low' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStockFilter('low')}
              >
                Low Stock
              </Button>
              <Button
                variant={stockFilter === 'out' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStockFilter('out')}
              >
                Out of Stock
              </Button>
            </div>
            
            <Button className="shrink-0">
              <Plus className="mr-2 h-4 w-4" /> Add Medicine
            </Button>
          </div>
          
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="h-10 px-4 text-left font-medium">Name</th>
                    <th className="h-10 px-4 text-left font-medium">Type</th>
                    <th className="h-10 px-4 text-left font-medium">Dosage</th>
                    <th className="h-10 px-4 text-left font-medium">Manufacturer</th>
                    <th className="h-10 px-4 text-left font-medium">Stock</th>
                    <th className="h-10 px-4 text-left font-medium">Expiry Date</th>
                    <th className="h-10 px-4 text-left font-medium">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMedicines.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="h-24 text-center text-muted-foreground">
                        No medicines found
                      </td>
                    </tr>
                  ) : (
                    filteredMedicines.map((medicine) => (
                      <tr key={medicine.id} className="border-b hover:bg-muted/50">
                        <td className="p-4 font-medium">{medicine.name}</td>
                        <td className="p-4">{medicine.type}</td>
                        <td className="p-4">{medicine.dosage}</td>
                        <td className="p-4">{medicine.manufacturer}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            medicine.stock === 0
                              ? 'bg-destructive/20 text-destructive'
                              : medicine.stock < 20
                                ? 'bg-warning/20 text-warning'
                                : 'bg-success/20 text-success'
                          }`}>
                            {medicine.stock === 0 ? 'Out of stock' : medicine.stock < 20 ? 'Low stock' : medicine.stock}
                          </span>
                        </td>
                        <td className="p-4">{new Date(medicine.expiry).toLocaleDateString()}</td>
                        <td className="p-4">${medicine.price.toFixed(2)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Inventory Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Stock Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Items</span>
                    <span className="font-medium">{medicines.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Low Stock</span>
                    <span className="font-medium">{medicines.filter(m => m.stock > 0 && m.stock < 20).length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Out of Stock</span>
                    <span className="font-medium">{medicines.filter(m => m.stock === 0).length}</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">Expiring Soon</h3>
                <div className="space-y-2">
                  {medicines
                    .filter(m => {
                      const expiryDate = new Date(m.expiry);
                      const now = new Date();
                      const threeMonthsFromNow = new Date();
                      threeMonthsFromNow.setMonth(now.getMonth() + 3);
                      return expiryDate <= threeMonthsFromNow;
                    })
                    .slice(0, 3)
                    .map(medicine => (
                      <div key={medicine.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{medicine.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(medicine.expiry).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">By Type</h3>
                <div className="space-y-2">
                  {Array.from(new Set(medicines.map(m => m.type))).map(type => (
                    <div key={type} className="flex justify-between items-center">
                      <span className="text-sm">{type}</span>
                      <span className="font-medium">{medicines.filter(m => m.type === type).length}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Medicines;
