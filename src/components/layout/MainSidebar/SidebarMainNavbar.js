import React from 'react';
import { Navbar, NavbarBrand } from 'shards-react';
import useSidebar from '../../../hooks/useSidebar';
import worldLogo from '../../../assets/logo.png';

const SidebarMainNavbar = () => {
  const {
    toggle
  } = useSidebar();

  return (
    <div className="main-navbar">
      <Navbar
        className="align-items-stretch bg-dark flex-md-nowrap border-bottom p-0"
        type="dark"
      >
        <NavbarBrand
          className="w-100 mr-0 d-flex justify-content-center align-items-center"
          href="http://worldtoken.network/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ lineHeight: '25px' }}
        >
          <img
            id="main-logo"
            className="d-inline-block align-top mr-1"
            style={{ maxWidth: '40px' }}
            src={worldLogo}
            alt="World Token"
          />
          <span className="sidebar-title gradient-text">WORLD</span>
        </NavbarBrand>
        {/* eslint-disable-next-line */}
        <a
          className="toggle-sidebar d-sm-inline d-md-none d-lg-none nav-link nav-link-icon "
          onClick={() => {
            toggle();
          }}
        >
          <i className="material-icons" style={{ lineHeight: 'normal' }}>&#xE5C4;</i>
        </a>
      </Navbar>
    </div>
  );
};

export default SidebarMainNavbar;
