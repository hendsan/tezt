import React, { createContext, useState } from 'react';

export const Context = createContext({
  visible: false,
});

const SidebarContext = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const toggle = () => setVisible(!visible);
  return <Context.Provider value={{ visible, toggle }}>{children}</Context.Provider>;
};

export default SidebarContext;
