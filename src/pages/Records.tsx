
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { FadeIn, SlideIn } from '@/components/ui/Transitions';
import { Download, File, FileCog, FileText, Filter, Search } from 'lucide-react';

type Record = {
  id: string;
  patientName: string;
  patientId: string;
  recordType: string;
  date: string;
  provider: string;
  status: 'complete' | 'pending' | 'draft';
};

// Sample data
const medicalRecords: Record[] = [
  {
    id: 'rec-001',
    patientName: 'John Smith',
    patientId: 'P-12345',
    recordType: 'Progress Note',
    date: '2023-06-10',
    provider: 'Dr. Samantha Carter',
    status: 'complete',
  },
  {
    id: 'rec-002',
    patientName: 'Emily Johnson',
    patientId: 'P-12346',
    recordType: 'Lab Results',
    date: '2023-06-09',
    provider: 'Dr. Samantha Carter',
    status: 'complete',
  },
  {
    id: 'rec-003',
    patientName: 'Michael Williams',
    patientId: 'P-12347',
    recordType: 'Radiology Report',
    date: '2023-06-08',
    provider: 'Dr. James Wilson',
    status: 'complete',
  },
  {
    id: 'rec-004',
    patientName: 'Sarah Brown',
    patientId: 'P-12348',
    recordType: 'Medication Chart',
    date: '2023-06-07',
    provider: 'Dr. Samantha Carter',
    status: 'complete',
  },
  {
    id: 'rec-005',
    patientName: 'John Smith',
    patientId: 'P-12345',
    recordType: 'Consultation Note',
    date: '2023-06-05',
    provider: 'Dr. Samantha Carter',
    status: 'complete',
  },
  {
    id: 'rec-006',
    patientName: 'Robert Chen',
    patientId: 'P-12349',
    recordType: 'Progress Note',
    date: '2023-06-15',
    provider: 'Dr. James Wilson',
    status: 'draft',
  },
  {
    id: 'rec-007',
    patientName: 'Maria Garcia',
    patientId: 'P-12350',
    recordType: 'Lab Results',
    date: '2023-06-14',
    provider: 'Dr. Samantha Carter',
    status: 'pending',
  },
];

const Records = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'complete' | 'pending' | 'draft'>('all');

  const filteredRecords = medicalRecords.filter((record) => {
    // Filter by search query
    const matchesSearch =
      record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.recordType.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by status
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'complete':
        return 'badge-green';
      case 'pending':
        return 'badge-yellow';
      case 'draft':
        return 'badge-blue';
      default:
        return 'badge-blue';
    }
  };

  const getRecordTypeIcon = (type: string) => {
    switch (type) {
      case 'Progress Note':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'Lab Results':
        return <FileCog className="h-4 w-4 text-green-500" />;
      case 'Radiology Report':
        return <File className="h-4 w-4 text-purple-500" />;
      case 'Medication Chart':
        return <FileText className="h-4 w-4 text-orange-500" />;
      case 'Consultation Note':
        return <FileText className="h-4 w-4 text-blue-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <FadeIn>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Medical Records</h1>
          <p className="text-muted-foreground">
            Access and manage patient medical records
          </p>
        </div>
      </FadeIn>

      <SlideIn delay={0.1}>
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by patient name, ID, or record type..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="flex rounded-md overflow-hidden border border-input">
              {(['all', 'complete', 'pending', 'draft'] as const).map((status) => (
                <button
                  key={status}
                  className={`px-3 py-2 text-sm font-medium ${
                    statusFilter === status
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-transparent hover:bg-muted'
                  }`}
                  onClick={() => setStatusFilter(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
            
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </SlideIn>

      <SlideIn delay={0.2} className="glass-card">
        <div className="rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Record Type</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    No records found
                  </TableCell>
                </TableRow>
              ) : (
                filteredRecords.map((record) => (
                  <TableRow key={record.id} className="table-row">
                    <TableCell className="flex items-center gap-2">
                      {getRecordTypeIcon(record.recordType)}
                      {record.recordType}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{record.patientName}</div>
                        <div className="text-xs text-muted-foreground">
                          {record.patientId}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(record.date)}</TableCell>
                    <TableCell>{record.provider}</TableCell>
                    <TableCell>
                      <span className={`badge ${getStatusBadgeClass(record.status)}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </SlideIn>
    </div>
  );
};

export default Records;
