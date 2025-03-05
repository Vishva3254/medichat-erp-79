
import { CheckCircle, Clock, MoreVertical, X } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { StaggerItem } from '../ui/Transitions';

export type Appointment = {
  id: string;
  patientName: string;
  time: string;
  avatar: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  type: string;
};

type AppointmentCardProps = {
  appointment: Appointment;
};

export const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const getStatusColor = () => {
    switch (appointment.status) {
      case 'scheduled':
        return 'bg-blue-50 text-blue-700';
      case 'completed':
        return 'bg-green-50 text-green-700';
      case 'cancelled':
        return 'bg-red-50 text-red-700';
      case 'in-progress':
        return 'bg-yellow-50 text-yellow-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const getStatusIcon = () => {
    switch (appointment.status) {
      case 'scheduled':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <X className="h-4 w-4" />;
      case 'in-progress':
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <StaggerItem>
      <div className="glass-card p-4 card-hover">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {appointment.avatar ? (
                  <img src={appointment.avatar} alt={appointment.patientName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm font-medium">
                    {appointment.patientName.split(' ').map(n => n[0]).join('')}
                  </span>
                )}
              </div>
              <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${getStatusColor()}`}>
                {getStatusIcon()}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-sm">{appointment.patientName}</h3>
              <div className="flex items-center mt-1">
                <span className="text-xs text-muted-foreground">{appointment.time}</span>
                <span className="mx-1.5 w-1 h-1 rounded-full bg-muted-foreground"></span>
                <span className="text-xs text-muted-foreground">{appointment.type}</span>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="p-1.5 hover:bg-muted rounded-md">
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Reschedule</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">Cancel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </StaggerItem>
  );
};
