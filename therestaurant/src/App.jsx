import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import './assets/styles/style.css';
import { AdminContext } from './contexts/AdminContext';
import { useState, createContext } from 'react';
import './utils/initRestaurant';

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

  return (
    <AdminContext.Provider value={adminContext}>
      <RouterProvider router={router} />
    </AdminContext.Provider>
  );
}

export default App;
