import React, { useState, useEffect } from 'react';
import { NavBar } from './NavBar';

export const Sidebar = () => {
  const closeSidebar = () => {
    const sidebar = document.querySelector('#sidebar');
    if (sidebar.classList.contains('toggled')) {
      sidebar.classList.remove('toggled');
    }
  };

  return (
    <aside className="sidebar" id="sidebar">
      <button
        id="mobile-nav-btn-close"
        onClick={() => {
          closeSidebar();
        }}
      >
        <svg
          width="24px"
          height="24px"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#fff"
        >
          <path
            d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      <NavBar closeSidebar={closeSidebar} />
    </aside>
  );
};
