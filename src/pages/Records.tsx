
import { useState } from 'react';
import RecordsHeader from '@/components/records/RecordsHeader';
import RecordsFilter from '@/components/records/RecordsFilter';
import RecordsTable from '@/components/records/RecordsTable';
import { medicalRecords } from '@/components/records/data';

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

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <RecordsHeader />
      
      <RecordsFilter
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        onSearchChange={setSearchQuery}
        onStatusChange={setStatusFilter}
      />
      
      <RecordsTable records={filteredRecords} />
    </div>
  );
};

export default Records;
