import { Bell, Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';
export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  return <header className="sticky top-0 z-30 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {!isMobile}
        
        <div className="flex items-center gap-4 ml-auto">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input type="search" placeholder="Search..." className="w-[200px] lg:w-[300px] h-9 rounded-md border border-input bg-background px-9 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          
          <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>
        </div>
      </div>
    </header>;
};