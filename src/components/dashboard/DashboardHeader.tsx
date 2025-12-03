import { motion } from 'framer-motion';
import { Bell, LogOut, User, Search } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

interface DashboardHeaderProps {
  user: {
    name: string;
    avatar: string;
    role: string;
  } | null;
  onLogout: () => void;
}

const DashboardHeader = ({ user, onLogout }: DashboardHeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-16 bg-card border-b border-border px-4 md:px-6 flex items-center justify-between gap-4"
    >
    
      <div className="flex-1 max-w-md hidden sm:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-9 h-9 bg-muted/50 border-0 focus-visible:ring-1"
          />
        </div>
      </div>
 <span className="font-semibold lg:hidden text-foreground">SagaD</span>
     <div className="flex mr-10 lg:mr-10 items-center gap-2 md:gap-4 ml-auto">
  <a href='https://github.com/YeeshaDev/saga-dashboard.git' target='_blank' rel='noreferrer'>
 <Button variant="outline" size="sm" className="hidden md:flex">
          Source code
        </Button>
  </a>
       
        
       

        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-muted transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                  {user?.avatar || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="block text-left">
                <div className="text-sm hidden lg:block font-medium text-foreground">
                  {user?.name || 'User'}
                </div>
                <div className="text-xs hidden lg:block text-muted-foreground">
                  {user?.role || 'Role'}
                </div>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="text-destructive focus:text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
