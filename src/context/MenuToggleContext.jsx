import { createContext, useContext, useState } from 'react';

const MenuToggleContext = createContext();

function MenuToggleProvider({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  function openSidebar() {
    setSidebarOpen(true);
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  function toggleSidebar() {
    setSidebarOpen(!isSidebarOpen);
  }

  return (
    <MenuToggleContext.Provider
      value={{ isSidebarOpen, openSidebar, closeSidebar, toggleSidebar }}
    >
      {children}
    </MenuToggleContext.Provider>
  );
}

function useMenuToggle() {
  const context = useContext(MenuToggleContext);
  if (context === undefined)
    throw new Error('MenuToggleContext was used outside of MenuToggleProvider');
  return context;
}

export { MenuToggleProvider, useMenuToggle };
