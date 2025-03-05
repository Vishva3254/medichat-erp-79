
import { FadeIn } from '@/components/ui/Transitions';
import { ChatInterface } from '@/components/chat/ChatInterface';

const Chat = () => {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <FadeIn>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">AI Assistant</h1>
          <p className="text-muted-foreground">
            Get help with patient records, schedules, and medical queries
          </p>
        </div>
        
        <ChatInterface />
      </FadeIn>
    </div>
  );
};

export default Chat;
