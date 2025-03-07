
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  CalendarDays, 
  FileText, 
  Home, 
  Menu, 
  MessageSquare, 
  Settings, 
  Users, 
  X,
  BarChart3,
  ClipboardList,
  Pill,
  Bell,
  Stethoscope,
  FileBox,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

type SidebarItem = {
  title: string;
  icon: React.ElementType;
  path: string;
};

type SidebarProps = {
  onCallNurse: () => void;
  nurseRequested: boolean;
  timeLeft?: number | null;
};

const mainItems: SidebarItem[] = [
  { title: 'Dashboard', icon: Home, path: '/' },
  { title: 'Patients', icon: Users, path: '/patients' },
  { title: 'Appointments', icon: CalendarDays, path: '/appointments' },
  { title: 'Records', icon: FileText, path: '/records' },
  { title: 'Analytics', icon: BarChart3, path: '/analytics' },
  { title: 'Medicines', icon: Pill, path: '/medicines' },
];

const otherItems: SidebarItem[] = [
  { title: 'Chat Assistant', icon: MessageSquare, path: '/chat' },
  { title: 'Tasks', icon: ClipboardList, path: '/tasks' },
  { title: 'Prescriptions', icon: FileBox, path: '/prescriptions' },
  { title: 'Settings', icon: Settings, path: '/settings' },
];

export const Sidebar = ({ onCallNurse, nurseRequested, timeLeft }: SidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {!isOpen && (
        <button 
          onClick={toggleSidebar} 
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-background/80 shadow-md border border-border backdrop-blur-sm lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      )}

      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
        />
      )}

      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out shadow-md",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">MD</span>
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">MediChat</span>
          </Link>
          {isMobile && (
            <button 
              onClick={toggleSidebar} 
              className="p-1.5 rounded-md hover:bg-sidebar-accent/80 text-muted-foreground"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="flex-1 py-4 overflow-y-auto scrollbar-thin">
          <nav className="px-3 space-y-1">
            <div className="mb-2">
              <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Main
              </p>
              {mainItems.map((item) => (
                <SidebarLink
                  key={item.title}
                  item={item}
                  isActive={location.pathname === item.path}
                />
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-sidebar-border/70">
              <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Other
              </p>
              {otherItems.map((item) => (
                <SidebarLink
                  key={item.title}
                  item={item}
                  isActive={location.pathname === item.path}
                />
              ))}
            </div>
          </nav>
        </div>

        <div className="p-4 border-t border-sidebar-border space-y-4">
          <button 
            onClick={onCallNurse}
            disabled={nurseRequested}
            className={cn(
              "w-full flex items-center gap-2 p-3 rounded-lg transition-all duration-300 relative overflow-hidden shadow-sm",
              nurseRequested 
                ? "bg-success/20 text-success-foreground border border-success/40"
                : "bg-gradient-to-r from-success to-success/90 text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            )}
            aria-label="Call a nurse"
          >
            {nurseRequested ? (
              <>
                <div className="absolute inset-0 bg-success/10 animate-pulse"></div>
                <Bell size={18} className="animate-pulse" />
                <div className="flex flex-col items-start">
                  <span className="font-medium text-sm">Nurse Called</span>
                  {timeLeft !== null && (
                    <span className="text-xs">Arriving in {timeLeft}s</span>
                  )}
                </div>
              </>
            ) : (
              <>
                <Bell size={18} />
                <span className="font-medium">Call Nurse</span>
                <ChevronRight size={16} className="ml-auto" />
              </>
            )}
          </button>

          <div className="flex items-center p-3 rounded-lg bg-sidebar-accent/30 border border-sidebar-border/50">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-lg font-medium text-primary">DR</span>
            </div>
            <div className="flex-1 min-w-0 ml-3">
              <p className="text-sm font-medium truncate">Dr. Samantha Carter</p>
              <p className="text-xs text-muted-foreground truncate">Cardiologist</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const SidebarLink = ({ 
  item, 
  isActive 
}: { 
  item: SidebarItem; 
  isActive: boolean;
}) => {
  return (
    <Link
      to={item.path}
      className={cn(
        "sidebar-item group",
        isActive 
          ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-sm" 
          : "text-sidebar-foreground hover:bg-sidebar-accent/70"
      )}
    >
      <item.icon size={18} className={cn(
        "transition-transform group-hover:scale-110",
        isActive ? "" : "text-muted-foreground"
      )} />
      <span>{item.title}</span>
    </Link>
  );
};
