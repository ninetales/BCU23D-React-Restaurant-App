import { NavLink } from 'react-router-dom';
import ToggleAdmin from '../components/ToggleAdmin';
import { AdminContext } from '../contexts/AdminContext';
import { useContext } from 'react';
import { SidebarContext } from '../contexts/SidebarContext';

export const NavBarMobile = ({ closeSidebar }) => {
  const { sidebarStatus, toggleSidebar } = useContext(SidebarContext);
  const { isAdmin } = useContext(AdminContext);
  return (
    <>
      <nav className="navBar">
        <ul>
          <li>
            <NavLink
              to={'/'}
              onClick={() => {
                toggleSidebar();
              }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/booking'}
              onClick={() => {
                toggleSidebar();
              }}
            >
              Booking
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/contact'}
              onClick={() => {
                toggleSidebar();
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
                  toggleSidebar();
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
