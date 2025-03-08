
import { useTheme } from '@/providers/ThemeProvider';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { theme } = useTheme();

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'complete':
        return theme === 'dark' ? 'badge-green dark:bg-green-900/30 dark:text-green-300' : 'badge-green';
      case 'pending':
        return theme === 'dark' ? 'badge-yellow dark:bg-yellow-900/30 dark:text-yellow-300' : 'badge-yellow';
      case 'draft':
        return theme === 'dark' ? 'badge-blue dark:bg-blue-900/30 dark:text-blue-300' : 'badge-blue';
      default:
        return theme === 'dark' ? 'badge-blue dark:bg-blue-900/30 dark:text-blue-300' : 'badge-blue';
    }
  };

  return (
    <span className={`badge ${getStatusBadgeClass(status)}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
