
import { File, FileCog, FileText } from 'lucide-react';

interface RecordTypeIconProps {
  type: string;
}

export const RecordTypeIcon = ({ type }: RecordTypeIconProps) => {
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
