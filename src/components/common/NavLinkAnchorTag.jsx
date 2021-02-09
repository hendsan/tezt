const NavLinkAnchorTag = ({ children, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="nav-link">
    {children}
  </a>
);

export default NavLinkAnchorTag;
