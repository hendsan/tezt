import React from 'react';
import useSidebar from '../../../hooks/useSidebar';

const NavbarToggle = () => {
  const { toggle } = useSidebar();
  return (
    <nav className="nav">
      <a href="#" onClick={toggle}
         className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-none d-lg-none text-center">
        <i className="material-icons">&#xE5D2;</i>
      </a>
    </nav>
  );
};

export default NavbarToggle;
