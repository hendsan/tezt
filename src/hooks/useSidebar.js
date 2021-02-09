import { useContext } from 'react';
import { Context } from '../contexts/SidebarContext';

const useSidebar = () => {
  return useContext(Context);
};

export default useSidebar;
