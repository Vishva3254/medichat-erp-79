
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
  FileMedical
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type SidebarItem = {
  title: string;
  icon: React.ElementType;
  path: string;
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
  { title: 'Prescriptions', icon: FileMedical, path: '/prescriptions' },
  { title: 'Settings', icon: Settings, path: '/settings' },
];

export const Sidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={toggleSidebar} 
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-background shadow-md border border-border lg:hidden"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">MD</span>
            </div>
            <span className="text-xl font-semibold">MediChat</span>
          </Link>
          {isMobile && (
            <button 
              onClick={toggleSidebar} 
              className="p-1 rounded-md hover:bg-sidebar-accent"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <div className="flex-1 py-4 overflow-y-auto">
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
            
            <div className="mt-6 pt-4 border-t border-sidebar-border">
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

        <div className="p-4 border-t border-sidebar-border space-y-3">
          <button 
            className="w-full flex items-center gap-2 p-2 rounded-md bg-success text-white hover:bg-success/90 transition-colors"
            aria-label="Call a nurse"
          >
            <Bell size={18} />
            <span className="font-medium">Call Nurse</span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <span className="text-lg font-medium">DR</span>
            </div>
            <div className="flex-1 min-w-0">
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
        "sidebar-item",
        isActive ? "sidebar-item-active" : "sidebar-item-inactive"
      )}
    >
      <item.icon size={18} />
      <span>{item.title}</span>
    </Link>
  );
};
