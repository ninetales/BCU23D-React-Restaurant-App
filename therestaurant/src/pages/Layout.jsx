import { Outlet } from 'react-router';
import './../assets/styles/layout.scss';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../contexts/AdminContext';
import { useContext } from 'react';
import ToggleAdmin from '../components/ToggleAdmin';

export const Layout = () => {
  const { isAdmin } = useContext(AdminContext);
  console.log(isAdmin);
  return (
    <div className='wrapper'>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to={'/'}>Home</NavLink>
            </li>
            <li>
              <NavLink to={'/booking'}>Booking</NavLink>
            </li>
            <li>
              <NavLink to={'/contact'}>Contact</NavLink>
            </li>
            {isAdmin ? (
              <li>
                <NavLink to={'/admin'}>Admin</NavLink>
              </li>
            ) : (
              false
            )}
          </ul>
        </nav>
        <ToggleAdmin />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};
