import { createContext, useState } from "react";

export type DashboardContextType = {
  sidebarOpen: boolean;
  handleSidebarOpen: (value: boolean) => void;
};

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarOpen = (value: boolean) => {
    setSidebarOpen(value);
  };

  return <DashboardContext.Provider value={{ sidebarOpen, handleSidebarOpen }}>{children}</DashboardContext.Provider>;
};
