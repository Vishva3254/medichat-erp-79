
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

export const Layout = () => {
  const [nurseRequested, setNurseRequested] = useState(false);

  const handleCallNurse = () => {
    setNurseRequested(true);
    toast({
      title: "Nurse Called",
      description: "A nurse has been notified and will be with you shortly.",
      variant: "default",
    });
    
    // Reset after 30 seconds
    setTimeout(() => {
      setNurseRequested(false);
    }, 30000);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar onCallNurse={handleCallNurse} nurseRequested={nurseRequested} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
