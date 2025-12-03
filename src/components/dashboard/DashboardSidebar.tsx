import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  LayoutDashboard,
  FileText,
  Settings,
  FolderOpen,
  Image,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Layers,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: Home, label: 'Home', path: '/dashboard', active: true },
  { icon: LayoutDashboard, label: 'Interface', path: '#' },
  { icon: Layers, label: 'Components', path: '#' },
  { icon: FileText, label: 'Pages', path: '#' },
  { icon: FolderOpen, label: 'Forms', path: '#' },
  { icon: Image, label: 'Gallery', path: '#' },
  { icon: BookOpen, label: 'Documentation', path: '#' },
];

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setCollapsed(true)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 64 : 240 }}
        className={cn(
          'bg-card border-r border-border flex flex-col z-50 transition-all duration-300',
          'fixed lg:relative inset-y-0 left-0',
          collapsed ? 'w-16 -translate-x-full lg:translate-x-0' : 'w-60'
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                
                <span className="font-semibold text-foreground">SagaD</span>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                  'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  isActive && item.path !== '#' && 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
                )
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="text-sm font-medium whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>

        {/* Settings at bottom */}
        <div className="p-3 border-t border-border">
          <button
            className={cn(
              'flex items-center gap-3 px-3 py-3 rounded-lg w-full transition-colors',
              'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            )}
          >
            <Settings className="h-5 w-5 shrink-0" />
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-sm font-medium whitespace-nowrap overflow-hidden"
                >
                  Settings
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* Mobile toggle button */}
      <button
        onClick={() => setCollapsed(false)}
        className={cn(
          'absolute top-3 right-4 z-30 lg:hidden',
          'size-10 bg-primary text-primary-foreground rounded-full shadow-lg',
          'flex items-center justify-center transition-transform',
          !collapsed && 'scale-0'
        )}
      >
        <Menu className="h-5 w-5" />
      </button>
    </>
  );
};

export default DashboardSidebar;
