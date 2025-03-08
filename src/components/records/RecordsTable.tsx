
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { SlideIn } from '@/components/ui/Transitions';
import { RecordTypeIcon } from './RecordTypeIcon';
import { StatusBadge } from './StatusBadge';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';

export type Record = {
  id: string;
  patientName: string;
  patientId: string;
  recordType: string;
  date: string;
  provider: string;
  status: 'complete' | 'pending' | 'draft';
};

interface RecordsTableProps {
  records: Record[];
}

const RecordsTable = ({ records }: RecordsTableProps) => {
  const { theme } = useTheme();

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <SlideIn delay={0.2}>
      <div className={cn(
        "rounded-lg overflow-hidden border", 
        theme === 'dark' ? "bg-card border-border" : "glass-card"
      )}>
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
            {records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              records.map((record) => (
                <TableRow key={record.id} className="table-row">
                  <TableCell className="flex items-center gap-2">
                    <RecordTypeIcon type={record.recordType} />
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
                    <StatusBadge status={record.status} />
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
  );
};

export default RecordsTable;
