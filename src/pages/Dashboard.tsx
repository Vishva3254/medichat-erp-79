
import { CalendarDays, ChevronRight, Clock, Plus, User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { Appointment, AppointmentCard } from '@/components/dashboard/AppointmentCard';
import { Link } from 'react-router-dom';
import { FadeIn, SlideIn, StaggerChildren } from '@/components/ui/Transitions';

// Sample data
const appointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Alex Johnson',
    time: '09:00 AM',
    avatar: '',
    status: 'completed',
    type: 'Check-up',
  },
  {
    id: '2',
    patientName: 'Maria Garcia',
    time: '10:30 AM',
    avatar: '',
    status: 'completed',
    type: 'Follow-up',
  },
  {
    id: '3',
    patientName: 'Robert Chen',
    time: '11:45 AM',
    avatar: '',
    status: 'in-progress',
    type: 'Consultation',
  },
  {
    id: '4',
    patientName: 'Sophia Lee',
    time: '01:15 PM',
    avatar: '',
    status: 'scheduled',
    type: 'New Patient',
  },
  {
    id: '5',
    patientName: 'David Wilson',
    time: '02:30 PM',
    avatar: '',
    status: 'scheduled',
    type: 'Follow-up',
  },
];

const Dashboard = () => {
  const upcomingAppointments = appointments.filter(
    (app) => app.status === 'scheduled' || app.status === 'in-progress'
  );

  const completedAppointments = appointments.filter(
    (app) => app.status === 'completed'
  );

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 space-y-8">
      <FadeIn>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, Dr. Carter. Here's an overview of your day.
        </p>
      </FadeIn>

      <SlideIn delay={0.1}>
        <DashboardStats />
      </SlideIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SlideIn delay={0.2}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
              <Button asChild variant="ghost" size="sm">
                <Link to="/appointments" className="flex items-center">
                  View all <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {upcomingAppointments.length === 0 ? (
              <div className="glass-card p-6 text-center">
                <p className="text-muted-foreground">No upcoming appointments</p>
              </div>
            ) : (
              <StaggerChildren staggerDelay={0.05} className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              </StaggerChildren>
            )}
          </SlideIn>

          <SlideIn delay={0.3}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Completed Today</h2>
              <Button variant="outline" size="sm">
                <Plus className="mr-1 h-4 w-4" /> Add notes
              </Button>
            </div>

            <StaggerChildren staggerDelay={0.05} className="space-y-4 mt-4">
              {completedAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </StaggerChildren>
          </SlideIn>
        </div>

        <div className="space-y-6">
          <SlideIn delay={0.4}>
            <div className="glass-card p-5">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Add New Patient
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Schedule Appointment
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Clock className="mr-2 h-4 w-4" />
                  View Today's Schedule
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <User className="mr-2 h-4 w-4" />
                  Patient Search
                </Button>
              </div>
            </div>
          </SlideIn>

          <SlideIn delay={0.5}>
            <div className="glass-card p-5">
              <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
              <div className="space-y-4">
                {[
                  { action: 'Updated patient records', time: '15 mins ago', user: 'You' },
                  { action: 'Approved lab results', time: '1 hour ago', user: 'You' },
                  { action: 'Added new appointment', time: '2 hours ago', user: 'Nurse Johnson' },
                  { action: 'Updated clinic hours', time: '3 hours ago', user: 'Admin Staff' },
                ].map((activity, index) => (
                  <div key={index} className="flex justify-between items-start text-sm pb-3 border-b border-border last:border-0 last:pb-0">
                    <div>
                      <p>{activity.action}</p>
                      <p className="text-xs text-muted-foreground">by {activity.user}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </SlideIn>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
