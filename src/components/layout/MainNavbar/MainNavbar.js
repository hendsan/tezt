import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Badge, Container, Navbar } from 'shards-react';

import NavbarSearch from './NavbarSearch';
import NavbarNav from './NavbarNav/NavbarNav';
import NavbarToggle from './NavbarToggle';
import Value from '../../common/Value';
import useTokenPrice from '../../../hooks/useTokenPrice';

const MainNavbar = ({ stickyTop }) => {
  const [ethPrice, setEthPrice] = useState(false);
  const tokenPrice = useTokenPrice();
  const classes = classNames(
    'main-navbar',
    'bg-dark',
    stickyTop && 'sticky-top'
  );

  return (
    <div className={classes}>
      <Container fluid className="p-0">
        <Navbar type="dark" className="align-items-stretch flex-md-nowrap p-0">
          <div className="d-flex align-items-center ml-4">
            <Badge
              href="javascript:void(0)"
              theme="secondary"
              className="mr-2 gradient-bg"
              onClick={() => {
                setEthPrice(!ethPrice);
              }}>
              1 WORLD = <Value value={ethPrice ? tokenPrice.eth : tokenPrice.usd}
                               decimals={6}/> {ethPrice ? 'ETH' : 'USD'}
            </Badge>
          </div>
          <div>
            <NavbarSearch/>
            <NavbarNav/>
            <NavbarToggle/>
          </div>
        </Navbar>
      </Container>
    </div>
  );
};

MainNavbar.propTypes = {
  /**
   * The layout type where the MainNavbar is used.
   */
  layout: PropTypes.string,
  /**
   * Whether the main navbar is sticky to the top, or not.
   */
  stickyTop: PropTypes.bool
};

MainNavbar.defaultProps = {
  stickyTop: true
};

export default MainNavbar;
