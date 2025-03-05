
import { useState } from 'react';
import { FadeIn, SlideIn } from '@/components/ui/Transitions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const patientData = [
  { month: 'Jan', newPatients: 65, returnPatients: 42 },
  { month: 'Feb', newPatients: 59, returnPatients: 45 },
  { month: 'Mar', newPatients: 80, returnPatients: 55 },
  { month: 'Apr', newPatients: 81, returnPatients: 60 },
  { month: 'May', newPatients: 56, returnPatients: 48 },
  { month: 'Jun', newPatients: 55, returnPatients: 65 },
];

const appointmentData = [
  { name: 'Mon', scheduled: 24, completed: 21, cancelled: 3 },
  { name: 'Tue', scheduled: 18, completed: 17, cancelled: 1 },
  { name: 'Wed', scheduled: 22, completed: 20, cancelled: 2 },
  { name: 'Thu', scheduled: 25, completed: 22, cancelled: 3 },
  { name: 'Fri', scheduled: 30, completed: 28, cancelled: 2 },
];

const diagnosisData = [
  { name: 'Hypertension', value: 30 },
  { name: 'Diabetes', value: 25 },
  { name: 'Asthma', value: 15 },
  { name: 'Arthritis', value: 12 },
  { name: 'Heart Disease', value: 18 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Analytics = () => {
  const [period, setPeriod] = useState('week');

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <FadeIn>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">
            Visualize your practice metrics and patient statistics
          </p>
        </div>
      </FadeIn>

      <div className="mb-6">
        <Tabs defaultValue="patients" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>
          
          <TabsContent value="patients">
            <SlideIn delay={0.1}>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Patient Growth</CardTitle>
                      <CardDescription>New vs returning patients over time</CardDescription>
                    </div>
                    <select
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                      className="p-2 rounded border bg-card"
                    >
                      <option value="week">Last Week</option>
                      <option value="month">Last Month</option>
                      <option value="quarter">Last Quarter</option>
                      <option value="year">Last Year</option>
                    </select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={patientData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="newPatients" name="New Patients" fill="#0284c7" />
                        <Bar dataKey="returnPatients" name="Return Patients" fill="#06b6d4" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>
          </TabsContent>
          
          <TabsContent value="appointments">
            <SlideIn delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Statistics</CardTitle>
                  <CardDescription>Weekly appointment overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={appointmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="scheduled" name="Scheduled" stroke="#8884d8" />
                        <Line type="monotone" dataKey="completed" name="Completed" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="cancelled" name="Cancelled" stroke="#ff7300" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>
          </TabsContent>
          
          <TabsContent value="diagnosis">
            <SlideIn delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>Common Diagnoses</CardTitle>
                  <CardDescription>Distribution of diagnoses across patients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full flex justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={diagnosisData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {diagnosisData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>
          </TabsContent>
          
          <TabsContent value="revenue">
            <SlideIn delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analysis</CardTitle>
                  <CardDescription>Monthly revenue breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { month: 'Jan', consultations: 4000, procedures: 2400, tests: 1800 },
                          { month: 'Feb', consultations: 3500, procedures: 2200, tests: 1600 },
                          { month: 'Mar', consultations: 5000, procedures: 3100, tests: 2200 },
                          { month: 'Apr', consultations: 4800, procedures: 2700, tests: 2000 },
                          { month: 'May', consultations: 3800, procedures: 2600, tests: 1900 },
                          { month: 'Jun', consultations: 4200, procedures: 2900, tests: 2100 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                        <Legend />
                        <Bar dataKey="consultations" name="Consultations" fill="#8884d8" />
                        <Bar dataKey="procedures" name="Procedures" fill="#82ca9d" />
                        <Bar dataKey="tests" name="Tests & Labs" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
