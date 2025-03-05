
import { CalendarDays, Clock, UserCheck, CreditCard } from 'lucide-react';
import { SlideIn } from '../ui/Transitions';

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  delay?: number;
};

const StatCard = ({ title, value, change, isPositive, icon, delay = 0 }: StatCardProps) => (
  <SlideIn delay={delay} className="glass-card p-5 col-span-1">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
        <h3 className="text-2xl font-semibold">{value}</h3>
        <div className="flex items-center mt-1">
          <span className={`text-xs font-medium ${isPositive ? 'text-success' : 'text-danger'}`}>
            {isPositive ? '↑' : '↓'} {change}
          </span>
          <span className="text-xs text-muted-foreground ml-1">vs last month</span>
        </div>
      </div>
      <div className="p-3 rounded-lg bg-primary/10">
        {icon}
      </div>
    </div>
  </SlideIn>
);

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard
        title="Today's Appointments"
        value="24"
        change="12%"
        isPositive={true}
        icon={<CalendarDays className="h-5 w-5 text-primary" />}
        delay={0.1}
      />
      <StatCard
        title="Patients Seen"
        value="18"
        change="8%"
        isPositive={true}
        icon={<UserCheck className="h-5 w-5 text-primary" />}
        delay={0.2}
      />
      <StatCard
        title="Avg. Wait Time"
        value="14 min"
        change="5%"
        isPositive={false}
        icon={<Clock className="h-5 w-5 text-primary" />}
        delay={0.3}
      />
      <StatCard
        title="Revenue"
        value="$4,256"
        change="15%"
        isPositive={true}
        icon={<CreditCard className="h-5 w-5 text-primary" />}
        delay={0.4}
      />
    </div>
  );
};
