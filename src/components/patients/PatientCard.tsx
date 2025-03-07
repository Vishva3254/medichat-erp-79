
import { MoreVertical, Phone, Mail, MapPin } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { StaggerItem } from '../ui/Transitions';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';

export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  address: string;
  status: 'active' | 'inactive';
  lastVisit: string;
  avatar?: string;
};

interface PatientCardProps {
  patient: Patient;
}

export const PatientCard = ({ patient }: PatientCardProps) => {
  const { theme } = useTheme();
  
  return (
    <StaggerItem>
      <div className={cn(
        "p-5 card-hover rounded-lg border shadow-sm transition-all", 
        theme === 'dark' 
          ? "bg-card text-card-foreground border-border/40" 
          : "glass-card"
      )}>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center overflow-hidden",
              theme === 'dark' ? "bg-muted" : "bg-gray-200"
            )}>
              {patient.avatar ? (
                <img src={patient.avatar} alt={patient.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-lg font-medium">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-medium">{patient.name}</h3>
              <div className="flex items-center mt-1">
                <span className="text-xs text-muted-foreground">{patient.age} years</span>
                <span className="mx-1.5 w-1 h-1 rounded-full bg-muted-foreground"></span>
                <span className="text-xs text-muted-foreground">{patient.gender}</span>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="p-1.5 hover:bg-muted rounded-md">
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View profile</DropdownMenuItem>
              <DropdownMenuItem>Schedule appointment</DropdownMenuItem>
              <DropdownMenuItem>Edit information</DropdownMenuItem>
              <DropdownMenuItem>View medical records</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 text-muted-foreground mr-2" />
            <span>{patient.phone}</span>
          </div>
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 text-muted-foreground mr-2" />
            <span>{patient.email}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
            <span className="truncate">{patient.address}</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Last visit</p>
            <p className="text-sm">{patient.lastVisit}</p>
          </div>
          <div className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            patient.status === 'active' 
              ? theme === 'dark' 
                ? 'bg-success-dark/30 text-success-light' 
                : 'bg-success-light text-success'
              : theme === 'dark'  
                ? 'bg-muted/60 text-muted-foreground' 
                : 'bg-muted text-muted-foreground'
          )}>
            {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
          </div>
        </div>
      </div>
    </StaggerItem>
  );
};
