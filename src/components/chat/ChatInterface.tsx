
import { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Mic, Bot, Paperclip, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FadeIn, SlideIn } from '../ui/Transitions';

type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
};

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello, Dr. Carter! How can I assist you today?',
      timestamp: new Date(Date.now() - 60000),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user' as const,
      text: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate response delay
    setTimeout(() => {
      let response = '';
      
      // Simple pattern matching for demo purposes
      if (inputValue.toLowerCase().includes('appointment')) {
        response = "I can help with appointments. You have 5 appointments scheduled for today. Would you like to see the details?";
      } else if (inputValue.toLowerCase().includes('patient') || inputValue.toLowerCase().includes('record')) {
        response = "I can help you find patient records. Would you like to search by name, ID, or date of visit?";
      } else if (inputValue.toLowerCase().includes('lab') || inputValue.toLowerCase().includes('test')) {
        response = "You have 8 new lab results waiting for review. Would you like me to summarize them for you?";
      } else {
        response = "I'm here to help with your medical practice needs. You can ask about patient records, appointments, lab results, or medication information.";
      }

      const botMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot' as const,
        text: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="glass-card h-[70vh] md:h-[80vh] flex flex-col overflow-hidden">
      <div className="p-4 border-b border-border flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Bot className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-medium">MediChat Assistant</h3>
          <p className="text-xs text-muted-foreground">AI-powered medical assistant</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] md:max-w-[70%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground rounded-tr-none'
                  : 'bg-secondary text-secondary-foreground rounded-tl-none'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs opacity-70 mt-1 text-right">
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <SlideIn direction="up" className="flex justify-start">
            <div className="max-w-[80%] md:max-w-[70%] rounded-lg p-3 bg-secondary text-secondary-foreground rounded-tl-none">
              <p className="text-sm loading-dots">Typing</p>
            </div>
          </SlideIn>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-border">
        <div className="relative">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="pr-24 resize-none h-[80px]"
          />
          <div className="absolute right-3 bottom-3 flex items-center space-x-2">
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
              <Mic className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
            >
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex justify-center mt-3">
          <div className="flex flex-wrap justify-center gap-2 max-w-md">
            {['Show my appointments today', 'Find patient records', 'Lab results summary', 'Medications lookup'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInputValue(suggestion)}
                className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-xs hover:bg-secondary/80 transition-colors flex items-center"
              >
                {suggestion}
                <XCircle className="h-3 w-3 ml-1 opacity-60" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
