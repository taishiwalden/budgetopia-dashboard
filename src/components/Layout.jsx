import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { navItems } from "@/nav-items";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Budgetopia</h1>
        </div>
        <ul className="space-y-2 p-4">
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
      </nav>
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;