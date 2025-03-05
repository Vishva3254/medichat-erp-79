
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Patient, PatientCard } from "./PatientCard";
import { Plus, Search } from "lucide-react";
import { StaggerChildren } from "../ui/Transitions";

// Sample data
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
  {
    id: "p4",
    name: "Sarah Brown",
    age: 27,
    gender: "Female",
    phone: "(555) 456-7890",
    email: "sarah.brown@example.com",
    address: "321 Pine Rd, Springfield, IL",
    status: "active",
    lastVisit: "June 10, 2023",
  },
];

export const PatientList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState<"all" | "active" | "inactive">("all");

  const filteredPatients = patients.filter((patient) => {
    // Filter by search query
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery);

    // Filter by status
    const matchesStatus =
      activeStatus === "all" || patient.status === activeStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="w-full sm:w-auto relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            className="pl-9 w-full sm:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="flex rounded-md overflow-hidden border border-input">
            <button
              className={`px-3 py-2 text-sm font-medium ${
                activeStatus === "all" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-transparent hover:bg-muted"
              }`}
              onClick={() => setActiveStatus("all")}
            >
              All
            </button>
            <button
              className={`px-3 py-2 text-sm font-medium ${
                activeStatus === "active" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-transparent hover:bg-muted"
              }`}
              onClick={() => setActiveStatus("active")}
            >
              Active
            </button>
            <button
              className={`px-3 py-2 text-sm font-medium ${
                activeStatus === "inactive" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-transparent hover:bg-muted"
              }`}
              onClick={() => setActiveStatus("inactive")}
            >
              Inactive
            </button>
          </div>
          
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        </div>
      </div>

      {filteredPatients.length === 0 ? (
        <div className="glass-card p-6 text-center">
          <p className="text-muted-foreground">No patients found</p>
        </div>
      ) : (
        <StaggerChildren staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </StaggerChildren>
      )}
    </div>
  );
};
