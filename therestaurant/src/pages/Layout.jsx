import { Outlet } from 'react-router';
import { NavBar } from '../components/NavBar';

export const Layout = () => {
  return (
    <div className="wrapper">
      <header>
        <div className="banner">
          <div className="logo-con">
            <img src="./logo.jpeg" alt="" />
          </div>
        </div>
        <NavBar />
      </header>
      <main className="container">
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};
