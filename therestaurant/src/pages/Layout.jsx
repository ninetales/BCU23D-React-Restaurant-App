import { Outlet } from 'react-router';
import { NavBar } from '../components/NavBar';
import { Sidebar } from '../components/Sidebar';

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

            <button id="mobile-nav-btn">
              <svg
                width="24px"
                height="24px"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#000000"
              >
                <path
                  d="M3 5H21"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M3 12H21"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M3 19H21"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
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
