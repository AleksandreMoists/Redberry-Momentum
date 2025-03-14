import React, { createContext, useContext, useState } from 'react';

interface DropdownContextType {
  openDropdownId: string | null;
  setOpenDropdownId: (id: string | null) => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export const DropdownProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  
  return (
    <DropdownContext.Provider value={{ openDropdownId, setOpenDropdownId }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = (): DropdownContextType => {
  const context = useContext(DropdownContext);
  if (context === undefined) {
    throw new Error('useDropdown must be used within a DropdownProvider');
  }
  return context;
};
