
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { SlideIn } from "@/components/ui/Transitions";

export const Layout = () => {
  const [nurseRequested, setNurseRequested] = useState(false);
  const [requestTime, setRequestTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  
  const NURSE_RESPONSE_TIME = 30; // seconds

  const handleCallNurse = () => {
    if (nurseRequested) return;
    
    setNurseRequested(true);
    setRequestTime(Date.now());
    
    toast({
      title: "Nurse Called",
      description: "A nurse has been notified and will be with you shortly.",
      variant: "default",
    });
    
    // Reset after 30 seconds
    setTimeout(() => {
      setNurseRequested(false);
      setRequestTime(null);
      setTimeLeft(null);
      
      toast({
        title: "Nurse Notification",
        description: "The nurse has been notified of your request.",
      });
    }, NURSE_RESPONSE_TIME * 1000);
  };

  // Update countdown timer
  useEffect(() => {
    if (!nurseRequested || !requestTime) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - requestTime) / 1000);
      const remaining = Math.max(0, NURSE_RESPONSE_TIME - elapsed);
      setTimeLeft(remaining);
      
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nurseRequested, requestTime]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        onCallNurse={handleCallNurse} 
        nurseRequested={nurseRequested} 
        timeLeft={timeLeft}
      />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 relative overflow-x-hidden">
          <Outlet />
          
          {nurseRequested && (
            <SlideIn direction="up" className="fixed bottom-4 right-4 left-4 md:left-auto md:w-80 z-50">
              <div className="bg-success/10 text-success-foreground border border-success/30 rounded-lg p-4 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-success animate-pulse"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Nurse assistance requested</p>
                    {timeLeft !== null && (
                      <p className="text-xs mt-0.5">Estimated arrival in {timeLeft} seconds</p>
                    )}
                  </div>
                </div>
              </div>
            </SlideIn>
          )}
        </main>
      </div>
    </div>
  );
};
