import React, { useState, useRef, useEffect } from 'react';
import { NavigationFn, Page } from '../types';
import { MenuIcon, LogoIcon } from './icons';

interface HeaderProps {
  navigate: NavigationFn;
  currentPage: Page;
}

const Header: React.FC<HeaderProps> = ({ navigate, currentPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleNavigate = (page: Page.Main | Page.About) => {
    navigate({ page });
    setMenuOpen(false);
  }
  
  const isTeamsPage = [Page.Main, Page.CreateTeam, Page.TeamDetail].includes(currentPage);

  const getMenuItemClass = (page: Page) => {
    const baseClass = "block px-4 py-2 text-sm text-near-black hover:bg-slate-100 rounded-md mx-1";
    const isActive = (page === Page.Main && isTeamsPage) || (page === Page.About && currentPage === Page.About);
    return isActive ? `${baseClass} bg-blue-100 font-semibold` : baseClass;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigate(Page.Main)}
          >
            <LogoIcon className="h-12 w-auto" />
            <span className="text-xl font-bold text-primary">Team Hub</span>
          </div>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-slate-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg p-1 ring-1 ring-black ring-opacity-5 transition ease-out duration-100 transform opacity-100 scale-100">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); handleNavigate(Page.Main); }}
                  className={getMenuItemClass(Page.Main)}
                >
                  Teams
                </a>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); handleNavigate(Page.About); }}
                  className={getMenuItemClass(Page.About)}
                >
                  About
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;