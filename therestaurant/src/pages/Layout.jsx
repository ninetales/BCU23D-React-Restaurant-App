import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="wrapper">
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
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};
