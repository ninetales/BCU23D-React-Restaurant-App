import React, { useContext } from 'react';
import { SidebarContext } from '../contexts/SidebarContext';

export const MobileNavButton = () => {
  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);
  return (
    <button
      id="mobile-nav-btn"
      onClick={() => {
        console.log('mobile btn click');
        toggleSidebar();
      }}
    >
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
  );
};
