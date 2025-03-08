
import { FadeIn } from '@/components/ui/Transitions';

const RecordsHeader = () => {
  return (
    <FadeIn>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Medical Records</h1>
        <p className="text-muted-foreground">
          Access and manage patient medical records
        </p>
      </div>
    </FadeIn>
  );
};

export default RecordsHeader;
