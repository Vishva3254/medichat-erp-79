
import { Bell, Search, Sun, Moon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/ThemeProvider';

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();
  
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex-1"></div>
        
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="search" 
              placeholder="Search..." 
              className="w-[200px] lg:w-[300px] h-10 rounded-lg border border-input bg-background/50 px-10 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="rounded-full transition-colors hover:bg-muted"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          
          <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full ring-2 ring-background" />
          </button>
          
          <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="text-sm font-semibold">SC</span>
          </div>
        </div>
      </div>
    </header>
  );
};
