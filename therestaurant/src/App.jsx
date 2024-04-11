import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import './assets/styles/style.css';
import { AdminContext } from './contexts/AdminContext';
import { SidebarContext } from './contexts/SidebarContext';
import { useState, createContext } from 'react';
import './utils/initRestaurant';
import './lib/sidebarHandler';
import { Sidebar } from './components/Sidebar';
import { MobileNavButton } from './components/MobileNavButton';

export const MyContext = createContext('Nu failar det');

function App() {
  const [adminContext, setAdminContext] = useState({
    isAdmin: false,
    toggleAdmin: () => {
      setAdminContext((prevState) => ({
        ...prevState,
        isAdmin: !prevState.isAdmin,
      }));
    },
  });

  const [sidebarContext, setSidebarContext] = useState({
    isSidebarOpen: false,
    toggleSidebar: () => {
      setSidebarContext((prevState) => ({
        ...prevState,
        isSidebarOpen: !prevState.isSidebarOpen,
      }));
    },
  });

  return (
    <>
      <AdminContext.Provider value={adminContext}>
        <RouterProvider router={router} />
      </AdminContext.Provider>

      <SidebarContext.Provider value={sidebarContext}>
        <MobileNavButton />
      </SidebarContext.Provider>
    </>
  );
}

export default App;
