import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { navItems } from "@/nav-items";
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Layout = ({ children }) => {
  const location = useLocation();

  const NavContent = () => (
    <ul className="space-y-2">
      {navItems.map((item) => (
        <li key={item.to}>
          <Link
            to={item.to}
            className={cn(
              "flex items-center space-x-2 p-2 rounded-lg text-gray-700 hover:bg-gray-200",
              location.pathname === item.to && "bg-gray-200 font-semibold"
            )}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Budgetopia</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <nav className="mt-6">
              <NavContent />
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <nav className="hidden md:block w-64 bg-white shadow-md p-4">
          <NavContent />
        </nav>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;