import { Outlet } from 'react-router';
import { NavBar } from '../components/NavBar';
import { Sidebar } from '../components/Sidebar';
import { MobileNavButton } from '../components/MobileNavButton';

export const Layout = () => {
  return (
    <>
      <Sidebar />
      <div className="wrapper">
        <header>
          <div className="banner">
            <div className="logo-con">
              <img src="./logo.jpeg" alt="" />
            </div>

            <MobileNavButton />
          </div>
          <NavBar />
        </header>
        <main className="container">
          <Outlet />
        </main>
        <footer></footer>
      </div>
    </>
  );
};
