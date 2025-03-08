
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SlideIn } from '@/components/ui/Transitions';
import { Filter, Search } from 'lucide-react';

interface RecordsFilterProps {
  onSearchChange: (value: string) => void;
  onStatusChange: (status: 'all' | 'complete' | 'pending' | 'draft') => void;
  searchQuery: string;
  statusFilter: 'all' | 'complete' | 'pending' | 'draft';
}

const RecordsFilter = ({ 
  onSearchChange, 
  onStatusChange, 
  searchQuery, 
  statusFilter 
}: RecordsFilterProps) => {
  return (
    <SlideIn delay={0.1}>
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by patient name, ID, or record type..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
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
                onClick={() => onStatusChange(status)}
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
  );
};

export default RecordsFilter;
