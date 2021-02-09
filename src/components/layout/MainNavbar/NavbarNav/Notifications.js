import { useState } from "react";
import { Fade, NavItem, NavLink, Collapse, DropdownItem } from "shards-react";
import { useWallet } from 'use-wallet';
import metamaskLogo from "../../../../assets/metamask-fox.svg";
import walletConnectLogo from "../../../../assets/wallet-connect.svg";
import { shortenAddress } from "../../../../world/utils";
import useConnectWallet from '../../../../hooks/useConnectWallet';

const Notifications = () => {
  const {connect, account, reset, connector} = useWallet();
  const {visible, toggle} = useConnectWallet();

  return (
    <NavItem className="border-right dropdown notifications">
      <NavLink
        className="nav-link-icon text-center"
        onClick={toggle}
      >
        <div
          className="nav-link-icon__wrapper px-2"
          style={{cursor: 'pointer'}}
        >
          {visible
            ? <span>Close<br/>Dropdown</span>
            : account ? <span>Change<br/>Wallet</span> : <span>Connect<br/>Wallet</span>}
        </div>
      </NavLink>
      <Collapse
        open={visible}
        className="dropdown-menu dropdown-menu-small"
        style={{minWidth: '15rem'}}
      >
        <DropdownItem
          className="connect-wallet-item-wrapper"
          onClick={async () => {
            if (connector === 'injected') {
              return;
            }
            await connect('injected');
            toggle();
          }}
        >
          <div className="notification__icon-wrapper">
            <div className="notification__icon">
              <img
                className="user-avatar rounded-circle"
                src={metamaskLogo}
                alt="Metamask"
                height={31}
                width={31}
              />{" "}
            </div>
          </div>
          <div className="notification__content">
            <span className="notification__category select-wallet">Metamask</span>
            {connector === 'injected' ? (
              <Fade in={true}>
                <p>Connected: {shortenAddress(account)}</p>
              </Fade>
            ) : null}
          </div>
        </DropdownItem>
        <DropdownItem
          className="connect-wallet-item-wrapper"
          onClick={async () => {
            if (connector === 'walletconnect') {
              return;
            }
            await connect('walletconnect');
            toggle();
          }}
        >
          <div className="notification__icon-wrapper">
            <div className="notification__icon">
              <img
                className="user-avatar rounded-circle"
                src={walletConnectLogo}
                alt="WalletConnect"
                height={31}
                width={31}
              />{" "}
            </div>
          </div>
          <div className="notification__content">
            <span className="notification__category select-wallet">WalletConnect</span>
            {connector === 'walletconnect' ? (
              <Fade in={true}>
                <p>Connected: {shortenAddress(account)}</p>
              </Fade>
            ) : null}
          </div>
        </DropdownItem>
        {account ? (
          <Fade in={true}>
            <DropdownItem
              className="notification__all text-danger"
              onClick={async () => {
                await reset();
                toggle();
              }}
            >
              <i className="material-icons text-danger">&#xE879;</i> Disconnect Wallet
            </DropdownItem>
          </Fade>
        ) : null}
      </Collapse>
    </NavItem>
  );
};

export default Notifications;
