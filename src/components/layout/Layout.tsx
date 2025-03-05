
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Bell } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

export const Layout = () => {
  const [nurseRequested, setNurseRequested] = useState(false);

  const handleCallNurse = () => {
    setNurseRequested(true);
    toast({
      title: "Nurse Called",
      description: "A nurse has been notified and will be with you shortly.",
      variant: "success",
    });
    
    // Reset after 30 seconds
    setTimeout(() => {
      setNurseRequested(false);
    }, 30000);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      
      {/* Floating Call Nurse Button (visible on mobile only) */}
      <button
        onClick={handleCallNurse}
        disabled={nurseRequested}
        className="fixed right-4 bottom-4 z-50 lg:hidden flex items-center justify-center gap-2 h-12 px-4 rounded-full bg-success text-white shadow-lg hover:bg-success/90 transition-colors disabled:opacity-50"
      >
        <Bell size={18} />
        <span className="font-medium">{nurseRequested ? "Nurse Called" : "Call Nurse"}</span>
      </button>
    </div>
  );
};
