
import { FadeIn } from '@/components/ui/Transitions';
import { PatientList } from '@/components/patients/PatientList';
import { useTheme } from '@/providers/ThemeProvider';

const Patients = () => {
  const { theme } = useTheme();
  
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <FadeIn>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Patients</h1>
          <p className="text-muted-foreground">
            Manage and view your patient records
          </p>
        </div>
        
        <PatientList />
      </FadeIn>
    </div>
  );
};

export default Patients;
