
export type Record = {
  id: string;
  patientName: string;
  patientId: string;
  recordType: string;
  date: string;
  provider: string;
  status: 'complete' | 'pending' | 'draft';
};

// Sample data
export const medicalRecords: Record[] = [
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
