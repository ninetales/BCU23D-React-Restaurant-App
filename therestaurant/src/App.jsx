import { RouterProvider } from 'react-router-dom';
import React, { createContext, useState } from 'react';
import { router } from './Router';
import './assets/styles/style.css';
import { AdminContext } from './contexts/AdminContext';
import { SidebarContext } from './contexts/SidebarContext';
import './utils/initRestaurant';

export const MyContext = createContext('Nu failar det');

function App() {
  const [sidebarStatus, setSidebarStatus] = useState(false);

  const toggleSidebar = () => {
    setSidebarStatus(!sidebarStatus);
  };

  const [adminContext, setAdminContext] = useState({
    isAdmin: false,
    toggleAdmin: () => {
      setAdminContext((prevState) => ({
        ...prevState,
        isAdmin: !prevState.isAdmin,
      }));
    },
  });

  return (
    <>
      <SidebarContext.Provider value={{ sidebarStatus, toggleSidebar }}>
        <AdminContext.Provider value={adminContext}>
          <RouterProvider router={router} />
        </AdminContext.Provider>
      </SidebarContext.Provider>
    </>
  );
}

export default App;
