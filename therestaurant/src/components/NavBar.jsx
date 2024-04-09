import React from 'react';
import { NavLink } from 'react-router-dom';
import ToggleAdmin from '../components/ToggleAdmin';
import { AdminContext } from '../contexts/AdminContext';
import { useContext } from 'react';

export const NavBar = () => {
  const { isAdmin } = useContext(AdminContext);
  console.log(isAdmin);
  return (
    <>
      <nav className="navBar">
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
          <li>
            <ToggleAdmin />
          </li>
        </ul>
      </nav>
    </>
  );
};
