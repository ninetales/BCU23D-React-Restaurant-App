import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './pages/Layout';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import UpdateBooking from './pages/UpdateBooking';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/contact', element: <Contact /> },
      { path: '/booking', element: <Booking /> },
      { path: '/admin', element: <Admin /> },
      {
        path: '/admin/:id',
        element: <UpdateBooking />,
      },
    ],
  },
]);
