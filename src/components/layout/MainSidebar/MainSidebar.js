import classNames from 'classnames';
import { Col } from 'shards-react';

import SidebarMainNavbar from './SidebarMainNavbar';
import SidebarNavItems from './SidebarNavItems';
import useSidebar from '../../../hooks/useSidebar';

const MainSidebar = () => {
  const { visible } = useSidebar();
  const classes = classNames(
    'main-sidebar',
    'px-0',
    'col-12',
    visible && 'open'
  );

  return (
    <Col
      tag="aside"
      className={classes}
      lg={{ size: 2 }}
      md={{ size: 3 }}
    >
      <SidebarMainNavbar/>
      <SidebarNavItems/>
    </Col>
  );
};

export default MainSidebar;
