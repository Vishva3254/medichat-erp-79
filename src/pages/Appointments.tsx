
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Appointment, AppointmentCard } from '@/components/dashboard/AppointmentCard';
import { FadeIn, SlideIn, StaggerChildren } from '@/components/ui/Transitions';
import { Button } from '@/components/ui/button';
import { CalendarClock, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

// Sample data organized by date
const appointmentsByDate: Record<string, Appointment[]> = {
  "2023-06-15": [
    {
      id: '1',
      patientName: 'Alex Johnson',
      time: '09:00 AM',
      avatar: '',
      status: 'scheduled',
      type: 'Check-up',
    },
    {
      id: '2',
      patientName: 'Maria Garcia',
      time: '10:30 AM',
      avatar: '',
      status: 'scheduled',
      type: 'Follow-up',
    },
  ],
  "2023-06-16": [
    {
      id: '3',
      patientName: 'Robert Chen',
      time: '11:45 AM',
      avatar: '',
      status: 'scheduled',
      type: 'Consultation',
    },
  ],
  "2023-06-17": [
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
    {
      id: '6',
      patientName: 'Emma Brown',
      time: '03:45 PM',
      avatar: '',
      status: 'scheduled',
      type: 'Check-up',
    },
  ],
};

const Appointments = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const dateString = date ? date.toISOString().split('T')[0] : '';
  const selectedDayAppointments = appointmentsByDate[dateString] || [];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const navigateDay = (days: number) => {
    if (!date) return;
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate);
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <FadeIn>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Appointments</h1>
          <p className="text-muted-foreground">
            Manage your appointment schedule
          </p>
        </div>
      </FadeIn>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SlideIn delay={0.1} className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view appointments</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
              />
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage appointments</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                New Appointment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CalendarClock className="mr-2 h-4 w-4" />
                View Schedule
              </Button>
            </CardContent>
          </Card>
        </SlideIn>
        
        <SlideIn delay={0.2} className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>{date ? formatDate(date) : 'No date selected'}</CardTitle>
                <CardDescription>
                  {selectedDayAppointments.length} appointments scheduled
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" onClick={() => navigateDay(-1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" onClick={() => navigateDay(1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {selectedDayAppointments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No appointments scheduled for this day</p>
                  <Button variant="outline" className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Appointment
                  </Button>
                </div>
              ) : (
                <StaggerChildren staggerDelay={0.05} className="space-y-4">
                  {selectedDayAppointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))}
                </StaggerChildren>
              )}
            </CardContent>
          </Card>
        </SlideIn>
      </div>
    </div>
  );
};

export default Appointments;
