const BadgeAnchorTag = ({ children, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="badge badge-dark wrap-text">
    {children}
  </a>
);

export default BadgeAnchorTag;
