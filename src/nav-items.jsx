import { HomeIcon, TrendingUpIcon, CreditCardIcon, PieChartIcon } from "lucide-react";
import Home from "./pages/Home.jsx";
import Investments from "./pages/Investments.jsx";
import Expenses from "./pages/Expenses.jsx";
import Budget from "./pages/Budget.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Home />,
  },
  {
    title: "Investments",
    to: "/investments",
    icon: <TrendingUpIcon className="h-4 w-4" />,
    page: <Investments />,
  },
  {
    title: "Expenses",
    to: "/expenses",
    icon: <CreditCardIcon className="h-4 w-4" />,
    page: <Expenses />,
  },
  {
    title: "Budget",
    to: "/budget",
    icon: <PieChartIcon className="h-4 w-4" />,
    page: <Budget />,
  },
];