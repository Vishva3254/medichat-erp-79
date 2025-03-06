import { useState, useRef, useEffect } from 'react';
import { FadeIn, SlideIn, StaggerChildren, StaggerItem } from '@/components/ui/Transitions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { Calendar, Clock, Download, Edit3, FileText, Mic, MicOff, Pill, Plus, Printer, Send, Trash2, User, Phone, Weight, Activity } from 'lucide-react';
import { Patient } from '@/components/patients/PatientCard';

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
      isFinal: boolean;
      length: number;
    };
    length: number;
  };
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

const patients: Patient[] = [
  {
    id: "p1",
    name: "John Smith",
    age: 45,
    gender: "Male",
    phone: "(555) 123-4567",
    email: "john.smith@example.com",
    address: "123 Main St, Springfield, IL",
    status: "active",
    lastVisit: "May 15, 2023",
  },
  {
    id: "p2",
    name: "Emily Johnson",
    age: 32,
    gender: "Female",
    phone: "(555) 234-5678",
    email: "emily.johnson@example.com",
    address: "456 Oak Ave, Springfield, IL",
    status: "active",
    lastVisit: "June 2, 2023",
  },
  {
    id: "p3",
    name: "Michael Williams",
    age: 58,
    gender: "Male",
    phone: "(555) 345-6789",
    email: "michael.williams@example.com",
    address: "789 Elm St, Springfield, IL",
    status: "inactive",
    lastVisit: "March 10, 2023",
  },
];

const medicines = [
  { id: 'm1', name: 'Amoxicillin', dosage: '500mg', type: 'Antibiotic' },
  { id: 'm2', name: 'Lisinopril', dosage: '10mg', type: 'Blood Pressure' },
  { id: 'm3', name: 'Atorvastatin', dosage: '20mg', type: 'Cholesterol' },
  { id: 'm4', name: 'Metformin', dosage: '1000mg', type: 'Diabetes' },
  { id: 'm5', name: 'Levothyroxine', dosage: '50mcg', type: 'Thyroid' },
  { id: 'm6', name: 'Albuterol', dosage: '90mcg', type: 'Respiratory' },
  { id: 'm7', name: 'Sertraline', dosage: '50mg', type: 'Antidepressant' },
  { id: 'm8', name: 'Ibuprofen', dosage: '400mg', type: 'Pain Reliever' },
];

interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  patientAge?: number;
  patientWeight?: string;
  patientPhone?: string;
  date: string;
  medicines: Array<{
    id: string;
    name: string;
    dosage: string;
    instructions: string;
    duration: string;
  }>;
  notes: string;
  status: 'draft' | 'sent' | 'completed';
}

const samplePrescriptions: Prescription[] = [
  {
    id: 'rx1',
    patientId: 'p1',
    patientName: 'John Smith',
    patientAge: 45,
    patientWeight: '75 kg',
    patientPhone: "(555) 123-4567",
    date: '2023-06-15',
    medicines: [
      {
        id: 'm1',
        name: 'Amoxicillin',
        dosage: '500mg',
        instructions: 'Take 1 pill 3 times daily with food',
        duration: '10 days'
      },
      {
        id: 'm8',
        name: 'Ibuprofen',
        dosage: '400mg',
        instructions: 'Take 1 pill every 6 hours as needed for pain',
        duration: '5 days'
      }
    ],
    notes: 'Patient allergic to penicillin. Follow up in 2 weeks.',
    status: 'sent'
  },
  {
    id: 'rx2',
    patientId: 'p2',
    patientName: 'Emily Johnson',
    patientAge: 32,
    patientWeight: '60 kg',
    patientPhone: "(555) 234-5678",
    date: '2023-06-14',
    medicines: [
      {
        id: 'm7',
        name: 'Sertraline',
        dosage: '50mg',
        instructions: 'Take 1 pill daily in the morning',
        duration: '30 days'
      }
    ],
    notes: 'Renewal prescription. Patient reports improvement in symptoms.',
    status: 'completed'
  }
];

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(samplePrescriptions);
  const [filter, setFilter] = useState<'all' | 'draft' | 'sent' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newPrescription, setNewPrescription] = useState<Omit<Prescription, 'id'>>({
    patientId: '',
    patientName: '',
    date: new Date().toISOString().split('T')[0],
    medicines: [],
    notes: '',
    status: 'draft'
  });
  const [selectedMedicine, setSelectedMedicine] = useState({
    id: '',
    name: '',
    dosage: '',
    instructions: '',
    duration: ''
  });
  const [isRecording, setIsRecording] = useState(false);
  const [recordingFor, setRecordingFor] = useState<'notes' | 'instructions' | null>(null);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionConstructor();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        setTranscript(finalTranscript || interimTranscript);
        
        if (recordingFor === 'notes') {
          setNewPrescription(prev => ({
            ...prev,
            notes: prev.notes + ' ' + (finalTranscript || interimTranscript)
          }));
        } else if (recordingFor === 'instructions') {
          setSelectedMedicine(prev => ({
            ...prev,
            instructions: prev.instructions + ' ' + (finalTranscript || interimTranscript)
          }));
        }
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
        toast({
          title: "Speech Recognition Error",
          description: `Error: ${event.error}`,
          variant: "destructive",
        });
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [recordingFor]);

  const toggleRecording = (type: 'notes' | 'instructions') => {
    if (!recognitionRef.current) {
      toast({
        title: "Speech Recognition Not Available",
        description: "Your browser doesn't support speech recognition",
        variant: "destructive",
      });
      return;
    }
    
    if (isRecording && recordingFor === type) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setRecordingFor(null);
      setTranscript('');
    } else {
      if (isRecording) {
        recognitionRef.current.stop();
      }
      setRecordingFor(type);
      setTranscript('');
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const handleAddMedicine = () => {
    if (!selectedMedicine.id || !selectedMedicine.instructions || !selectedMedicine.duration) {
      toast({
        title: "Missing Information",
        description: "Please select a medicine and fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    const medicineToAdd = {
      id: selectedMedicine.id,
      name: selectedMedicine.name,
      dosage: selectedMedicine.dosage,
      instructions: selectedMedicine.instructions,
      duration: selectedMedicine.duration
    };
    
    setNewPrescription(prev => ({
      ...prev,
      medicines: [...prev.medicines, medicineToAdd]
    }));
    
    setSelectedMedicine({
      id: '',
      name: '',
      dosage: '',
      instructions: '',
      duration: ''
    });
  };

  const handleRemoveMedicine = (index: number) => {
    setNewPrescription(prev => ({
      ...prev,
      medicines: prev.medicines.filter((_, i) => i !== index)
    }));
  };

  const handleSavePrescription = () => {
    if (!newPrescription.patientId) {
      toast({
        title: "Patient Required",
        description: "Please select a patient for this prescription",
        variant: "destructive",
      });
      return;
    }
    
    if (newPrescription.medicines.length === 0) {
      toast({
        title: "Medicines Required",
        description: "Please add at least one medicine to the prescription",
        variant: "destructive",
      });
      return;
    }
    
    const prescriptionToAdd: Prescription = {
      ...newPrescription,
      id: Date.now().toString()
    };
    
    setPrescriptions([prescriptionToAdd, ...prescriptions]);
    
    toast({
      title: "Prescription Saved",
      description: `Prescription saved for ${prescriptionToAdd.patientName}`,
      variant: "default",
    });
    
    setNewPrescription({
      patientId: '',
      patientName: '',
      date: new Date().toISOString().split('T')[0],
      medicines: [],
      notes: '',
      status: 'draft'
    });
  };

  const handlePatientSelect = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      setNewPrescription(prev => ({
        ...prev,
        patientId: patient.id,
        patientName: patient.name,
        patientAge: patient.age,
        patientPhone: patient.phone,
        patientWeight: ''
      }));
    }
  };

  const handleMedicineSelect = (medicineId: string) => {
    const medicine = medicines.find(m => m.id === medicineId);
    if (medicine) {
      setSelectedMedicine({
        id: medicine.id,
        name: medicine.name,
        dosage: medicine.dosage,
        instructions: '',
        duration: ''
      });
    }
  };

  const handleSendToPharmacy = (prescriptionId: string) => {
    setPrescriptions(prescriptions.map(prescription => 
      prescription.id === prescriptionId 
        ? { ...prescription, status: 'sent' as const } 
        : prescription
    ));
    
    toast({
      title: "Prescription Sent",
      description: "Prescription has been sent to the pharmacy",
      variant: "default",
    });
  };

  const handleDownloadPrescription = (prescriptionId: string) => {
    toast({
      title: "Prescription Downloaded",
      description: "Prescription has been downloaded as PDF",
      variant: "default",
    });
  };

  const handleWhatsAppSend = (prescriptionId: string, phoneNumber: string) => {
    const formattedNumber = phoneNumber.replace(/[^\d]/g, '');
    if (formattedNumber) {
      window.open(`https://wa.me/${formattedNumber}?text=Your prescription is ready.`, '_blank');
      
      toast({
        title: "WhatsApp Message",
        description: "Opening WhatsApp to send message",
        variant: "default",
      });
    } else {
      toast({
        title: "Error",
        description: "Valid phone number required",
        variant: "destructive",
      });
    }
  };

  const filteredPrescriptions = prescriptions.filter(prescription => {
    if (filter !== 'all' && prescription.status !== filter) return false;
    
    if (searchQuery && !prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <FadeIn>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Prescriptions</h1>
          <p className="text-muted-foreground">
            Create and manage patient prescriptions
          </p>
        </div>
      </FadeIn>

      <Tabs defaultValue="list">
        <TabsList className="mb-6">
          <TabsTrigger value="list">Prescription List</TabsTrigger>
          <TabsTrigger value="create">Create Prescription</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="w-full sm:w-64">
              <Input
                placeholder="Search prescriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'draft' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('draft')}
              >
                Draft
              </Button>
              <Button
                variant={filter === 'sent' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('sent')}
              >
                Sent
              </Button>
              <Button
                variant={filter === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('completed')}
              >
                Completed
              </Button>
            </div>
          </div>

          {filteredPrescriptions.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-muted-foreground">No prescriptions found</p>
            </Card>
          ) : (
            <SlideIn className="space-y-4">
              {filteredPrescriptions.map((prescription) => (
                <Card key={prescription.id} className="overflow-hidden">
                  <div className="bg-primary/10 p-4 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/20 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">HealthCare Clinic</h3>
                          <p className="text-sm text-muted-foreground">123 Medical Avenue, Suite 100</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        prescription.status === 'draft' 
                          ? 'bg-muted text-muted-foreground' 
                          : prescription.status === 'sent'
                            ? 'bg-primary/20 text-primary'
                            : 'bg-green-100 text-green-800'
                      }`}>
                        {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User size={16} className="text-primary" />
                            <span className="font-medium">Patient:</span> {prescription.patientName}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-primary" />
                            <span className="font-medium">Date:</span> {new Date(prescription.date).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Activity size={16} className="text-primary" />
                            <span className="font-medium">Age:</span> {prescription.patientAge || 'N/A'} years
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Weight size={16} className="text-primary" />
                            <span className="font-medium">Weight:</span> {prescription.patientWeight || 'N/A'}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Phone size={16} className="text-primary" />
                            <span className="font-medium">Phone:</span> {prescription.patientPhone || 'N/A'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2 px-2 py-1 bg-muted inline-block rounded">Medications</h4>
                        <div className="rounded-md border overflow-hidden">
                          <table className="min-w-full divide-y divide-border">
                            <thead className="bg-muted/50">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Medication</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Dosage</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Instructions</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Duration</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                              {prescription.medicines.map((medicine, index) => (
                                <tr key={index}>
                                  <td className="px-4 py-2 text-sm">{medicine.name}</td>
                                  <td className="px-4 py-2 text-sm">{medicine.dosage}</td>
                                  <td className="px-4 py-2 text-sm">{medicine.instructions}</td>
                                  <td className="px-4 py-2 text-sm">{medicine.duration}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      {prescription.notes && (
                        <div>
                          <h4 className="text-sm font-medium mb-1 px-2 py-1 bg-muted inline-block rounded">Notes</h4>
                          <p className="text-sm text-muted-foreground p-2 border rounded-md">{prescription.notes}</p>
                        </div>
                      )}

                      <div className="border-t pt-4 mt-4">
                        <div className="text-center mb-4">
                          <p className="text-primary font-medium italic">Get Well Soon!</p>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-sm">
                            <p className="font-medium">Dr. Samantha Carter</p>
                            <p className="text-muted-foreground">Cardiologist</p>
                            <p className="text-muted-foreground">License #: MD12345</p>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1"
                              onClick={() => handleDownloadPrescription(prescription.id)}
                            >
                              <Download size={14} />
                              Download
                            </Button>
                            
                            {prescription.patientPhone && (
                              <Button
                                size="sm"
                                variant="default"
                                className="gap-1"
                                onClick={() => handleWhatsAppSend(prescription.id, prescription.patientPhone || '')}
                              >
                                <Send size={14} />
                                Send
                              </Button>
                            )}
                            
                            {prescription.status === 'draft' && (
                              <Button
                                size="sm"
                                onClick={() => handleSendToPharmacy(prescription.id)}
                                className="gap-1"
                              >
                                <Send size={14} />
                                Send to Pharmacy
                              </Button>
                            )}
                            
                            <Button variant="outline" size="sm" className="gap-1">
                              <Printer size={14} />
                              Print
                            </Button>
                            
                            <Button variant="outline" size="sm" className="gap-1">
                              <Edit3 size={14} />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </SlideIn>
          )}
        </TabsContent>
        
        <TabsContent value="create">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <Card>
                <CardHeader>
                  <CardTitle>New Prescription</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="patient">Patient</Label>
                      <Select 
                        value={newPrescription.patientId} 
                        onValueChange={handlePatientSelect}
                      >
                        <SelectTrigger id="patient">
                          <SelectValue placeholder="Select a patient" />
                        </SelectTrigger>
                        <SelectContent>
                          {patients.map((patient) => (
                            <SelectItem key={patient.id} value={patient.id}>
                              {patient.name} ({patient.age}, {patient.gender})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="patientWeight">Patient Weight</Label>
                      <Input
                        id="patientWeight"
                        placeholder="e.g., 70 kg"
                        value={newPrescription.patientWeight || ''}
                        onChange={(e) => setNewPrescription({...newPrescription, patientWeight: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newPrescription.date}
                        onChange={(e) => setNewPrescription({...newPrescription, date: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Medications</Label>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Plus className="mr-1 h-4 w-4" /> Add Medication
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Medication</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div>
                              <Label htmlFor="medicine">Medicine</Label>
                              <Select value={selectedMedicine.id} onValueChange={handleMedicineSelect}>
                                <SelectTrigger id="medicine">
                                  <SelectValue placeholder="Select a medicine" />
                                </SelectTrigger>
                                <SelectContent>
                                  {medicines.map((medicine) => (
                                    <SelectItem key={medicine.id} value={medicine.id}>
                                      {medicine.name} ({medicine.dosage})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <div className="flex justify-between items-center">
                                <Label htmlFor="instructions">Instructions</Label>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  onClick={() => toggleRecording('instructions')}
                                  className="gap-1 h-8"
                                >
                                  {isRecording && recordingFor === 'instructions' ? <MicOff size={14} /> : <Mic size={14} />}
                                  {isRecording && recordingFor === 'instructions' ? 'Stop' : 'Record'}
                                </Button>
                              </div>
                              <Textarea
                                id="instructions"
                                placeholder="e.g., Take 1 pill twice daily with food"
                                value={selectedMedicine.instructions}
                                onChange={(e) => setSelectedMedicine({...selectedMedicine, instructions: e.target.value})}
                                className="mt-2"
                              />
                              {isRecording && recordingFor === 'instructions' && (
                                <div className="mt-2 text-sm text-muted-foreground">
                                  Recording: {transcript || 'Speak now...'}
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <Label htmlFor="duration">Duration</Label>
                              <Input
                                id="duration"
                                placeholder="e.g., 10 days, 2 weeks, 1 month"
                                value={selectedMedicine.duration}
                                onChange={(e) => setSelectedMedicine({...selectedMedicine, duration: e.target.value})}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="button" onClick={handleAddMedicine}>Add to Prescription</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    {newPrescription.medicines.length === 0 ? (
                      <div className="border rounded-md p-6 text-center text-muted-foreground">
                        No medications added yet
                      </div>
                    ) : (
                      <div className="rounded-md border overflow-hidden">
                        <table className="min-w-full divide-y divide-border">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Medication</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Dosage</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Instructions</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Duration</th>
                              <th className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {newPrescription.medicines.map((medicine, index) => (
                              <tr key={index}>
                                <td className="px-4 py-2 text-sm">{medicine.name}</td>
                                <td className="px-4 py-2 text-sm">{medicine.dosage}</td>
                                <td className="px-4 py-2 text-sm">{medicine.instructions}</td>
                                <td className="px-4 py-2 text-sm">{medicine.duration}</td>
                                <td className="px-4 py-2 text-sm">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                    onClick={() => handleRemoveMedicine(index)}
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => toggleRecording('notes')}
                        className="gap-1 h-8"
                      >
                        {isRecording && recordingFor === 'notes' ? <MicOff size={14} /> : <Mic size={14} />}
                        {isRecording && recordingFor === 'notes' ? 'Stop' : 'Record'}
                      </Button>
                    </div>
                    <Textarea
                      id="notes"
                      placeholder="Additional instructions or notes..."
                      value={newPrescription.notes}
                      onChange={(e) => setNewPrescription({...newPrescription, notes: e.target.value})}
                    />
                    {isRecording && recordingFor === 'notes' && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        Recording: {transcript || 'Speak now...'}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Save as Draft</Button>
                    <Button onClick={handleSavePrescription}>Create Prescription</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-4">
              <Card className="sticky top-20">
                <CardHeader className="bg-primary/10 pb-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>HealthCare Clinic</CardTitle>
                      <p className="text-sm text-muted-foreground">123 Medical Avenue, Suite 100</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  {!newPrescription.patientId ? (
                    <div className="text-center text-muted-foreground">
                      <FileText className="mx-auto h-12 w-12 opacity-20 mb-2" />
                      <p>Select a patient and add medications to see a preview</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <h3 className="font-medium">{newPrescription.patientName}</h3>
                          <div className="text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              {new Date(newPrescription.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm">
                            <div className="flex items-center gap-1">
                              <Activity size={14} /> 
                              <span>Age: {newPrescription.patientAge || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <Weight size={14} />
                              <span>Weight: {newPrescription.patientWeight || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <Phone size={14} />
                              <span>Phone: {newPrescription.patientPhone || 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t pt-3 mt-3">
                        <h4 className="text-sm font-medium mb-2">Medications</h4>
                        {newPrescription.medicines.length === 0 ? (
                          <p className="text-sm text-muted-foreground">No medications added</p>
                        ) : (
                          <ul className="space-y-2">
                            {newPrescription.medicines.map((medicine, index) => (
                              <li key={index} className="text-sm">
                                <div className="font-medium">{medicine.name} ({medicine.dosage})</div>
                                <div className="text-muted-foreground mt-1">{medicine.instructions}</div>
                                <div className="text-xs text-muted-foreground mt-1">Duration: {medicine.duration}</div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      
                      {newPrescription.notes && (
                        <div>
                          <h4 className="text-sm font-medium mb-1">Notes</h4>
                          <p className="text-sm text-muted-foreground">{newPrescription.notes}</p>
                        </div>
                      )}
                      
                      <div className="pt-4 border-t mt-4">
                        <div className="text-center mb-3">
                          <p className="text-primary font-medium italic">Get Well Soon!</p>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Dr. Samantha Carter</p>
                          <p className="text-muted-foreground">Cardiologist</p>
                          <p className="text-muted-foreground">License #: MD12345</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Prescriptions;
