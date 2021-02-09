import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Nav, NavItem, NavLink } from 'shards-react';
import { Link } from 'react-router-dom';
import { CHAIN_ID, CONTRACT_ADDRESSES } from '../../world/constants';
import NavLinkAnchorTag from '../common/NavLinkAnchorTag';

const MainFooter = ({
  contained,
  copyright
}) => (
  <footer className="main-footer d-flex p-2 px-3 bg-dark border-top">
    <Container fluid={contained}>
      <Row>
        <Nav>
          <NavItem>
            <NavLink
              tag={NavLinkAnchorTag}
              href={`https://etherscan.io/token/${CONTRACT_ADDRESSES.worldToken[CHAIN_ID]}`}
            >
              World Token: 0xBF494F02EE3FdE1F20BEE6242bCe2d1ED0c15e47
            </NavLink>
          </NavItem>
        </Nav>
        <span className="copyright ml-auto my-auto mr-2">{copyright}</span>
      </Row>
    </Container>
  </footer>
);

export default MainFooter;
