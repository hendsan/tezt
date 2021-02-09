import React from 'react';
import { Nav } from 'shards-react';

import SidebarNavItem from './SidebarNavItem';
import { CHAIN_ID, CONTRACT_ADDRESSES, WORLD_ETH_PAIR } from '../../../world/constants';
import useSidebar from '../../../hooks/useSidebar';

const SidebarNavItems = () => {
  return (
    <div className="nav-wrapper">
      <div>
        <h6 className="main-sidebar__nav-title">Dashboard</h6>
        <Nav className="nav--no-borders flex-column">
          <SidebarNavItem
            item={{
              title: 'Overview',
              to: '/overview',
              htmlBefore: '<i class="material-icons">public</i>',
              htmlAfter: ''
            }}
          />
          <SidebarNavItem
            item={{
              title: 'Farm',
              to: '/farm',
              htmlBefore: '<i class="material-icons">agriculture</i>',
              htmlAfter: ''
            }}
          />
          <SidebarNavItem
            item={{
              title: 'Marketplace',
              to: '/marketplace',
              htmlBefore: '<i class="material-icons">store</i>',
              htmlAfter: ''
            }}
          />
        </Nav>
      </div>
      <div>
        <h6 className="main-sidebar__nav-title">Trade</h6>
        <Nav className="nav--no-borders flex-column">
          <SidebarNavItem
            item={{
              title: 'Uniswap',
              href: `https://info.uniswap.org/token/${CONTRACT_ADDRESSES.worldToken[CHAIN_ID]}`,
              htmlBefore: '<i class="material-icons">swap_horiz</i>',
              htmlAfter: ''
            }}
          />
          <SidebarNavItem
            item={{
              title: 'Dextools',
              href: `https://www.dextools.io/app/uniswap/pair-explorer/${WORLD_ETH_PAIR.address}`,
              htmlBefore: '<i class="material-icons">trending_up</i>',
              htmlAfter: ''
            }}
          />
        </Nav>
      </div>
      <div>
        <h6 className="main-sidebar__nav-title">Information</h6>
        <Nav className="nav--no-borders flex-column">
          <SidebarNavItem
            item={{
              title: 'Litepaper',
              href: 'https://worldtoken.network/Litepaper.pdf',
              htmlBefore: '<i class="material-icons">library_books</i>',
              htmlAfter: ''
            }}
          />
          <SidebarNavItem
            item={{
              title: 'One-pager',
              href: 'https://worldtoken.network/One%20Pager.pdf',
              htmlBefore: '<i class="material-icons">sticky_note_2</i>',
              htmlAfter: ''
            }}
          />
          <SidebarNavItem
            item={{
              title: 'Audit',
              href: 'https://solidity.finance/audits/World/',
              htmlBefore: '<i class="material-icons">verified_user</i>',
              htmlAfter: ''
            }}
          />
          <SidebarNavItem
            item={{
              title: 'Etherscan',
              href: `http://etherscan.io/token/${CONTRACT_ADDRESSES.worldToken[CHAIN_ID]}`,
              htmlBefore: '<i class="material-icons">search</i>',
              htmlAfter: ''
            }}
          />
        </Nav>
      </div>
      <div>
        <h6 className="main-sidebar__nav-title">Community</h6>
        <Nav className="nav--no-borders flex-column">
          <SidebarNavItem
            item={{
              title: 'Telegram',
              href: 'https://t.me/worldtokenofficial',
              htmlBefore: '<i class="material-icons fab fa-telegram"></i>',
              htmlAfter: ''
            }}
          />
          <SidebarNavItem
            item={{
              title: 'Twitter',
              href: 'https://twitter.com/worldtoken_',
              htmlBefore: '<i class="material-icons fab fa-twitter"></i>',
              htmlAfter: ''
            }}
          />
        </Nav>
      </div>
      <div>
        <h6 className="main-sidebar__nav-title">Tutorials</h6>
        <Nav className="nav--no-borders flex-column">
          <SidebarNavItem
            item={{
              title: 'How to buy',
              href: `https://worldtoken.network/How%20to%20Buy%20-%20Desktop.pdf`,
              htmlBefore: '<i class="material-icons">info</i>',
              htmlAfter: ''
            }}
          />
          <SidebarNavItem
            item={{
              title: 'How to farm',
              href: `https://worldtoken.network/LP.pdf`,
              htmlBefore: '<i class="material-icons">info</i>',
              htmlAfter: ''
            }}
          />
          <SidebarNavItem
            item={{
              title: 'How to install Metamask',
              href: `https://worldtoken.network/Metamask.pdf`,
              htmlBefore: '<i class="material-icons">info</i>',
              htmlAfter: ''
            }}
          />
        </Nav>
      </div>
    </div>
  );
};

export default SidebarNavItems;
