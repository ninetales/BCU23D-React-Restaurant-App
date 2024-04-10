import { NavLink } from 'react-router-dom';
import ToggleAdmin from '../components/ToggleAdmin';
import { AdminContext } from '../contexts/AdminContext';
import { useContext } from 'react';

export const NavBarMobile = ({ closeSidebar }) => {
  const { isAdmin } = useContext(AdminContext);
  return (
    <>
      <nav className="navBar">
        <ul>
          <li>
            <NavLink
              to={'/'}
              onClick={() => {
                closeSidebar();
              }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/booking'}
              onClick={() => {
                closeSidebar();
              }}
            >
              Booking
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/contact'}
              onClick={() => {
                closeSidebar();
              }}
            >
              Contact
            </NavLink>
          </li>
          {isAdmin ? (
            <li>
              <NavLink
                to={'/admin'}
                onClick={() => {
                  closeSidebar();
                }}
              >
                Admin
              </NavLink>
            </li>
          ) : (
            false
          )}
          <li>
            <ToggleAdmin />
          </li>
        </ul>
      </nav>
    </>
  );
};
