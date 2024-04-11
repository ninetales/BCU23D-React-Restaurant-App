import { createContext, useState } from 'react';

const initialState = {
    sidebarStatus: false,
    toggleSidebar: () => { },
};

export const SidebarContext = createContext(initialState);
