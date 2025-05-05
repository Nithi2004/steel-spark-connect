import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const DashboardMenu = () => {
  const { user, isAdmin, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <Button
        variant="ghost"
        className="text-white flex items-center gap-2 p-1 hover:bg-white hover:text-steelblue-800 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <User className="h-5 w-5" />
        <span>{user?.name}</span>
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg z-50">
          <div className="py-1">
            <Link
              to={isAdmin ? "/admin/dashboard" : "/customer/dashboard"}
              className="block px-4 py-2 text-sm text-steelgray-700 hover:bg-steelgray-100"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-steelgray-700 hover:bg-steelgray-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardMenu;
