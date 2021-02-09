import React, { createContext, useState } from 'react';

export const Context = createContext({
  visible: false,
});

const ConnectWalletContext = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const open = () => setVisible(true);
  const toggle = () => setVisible(!visible);
  return <Context.Provider value={{
    visible,
    open,
    toggle
  }}>{children}</Context.Provider>;
};

export default ConnectWalletContext;
