import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import metamaskLogo from "../../../../assets/metamask-fox.svg";

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <span className="d-none d-md-inline-block">Connect Wallet</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link}>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <img
                  className="user-avatar rounded-circle mr-2"
                  src={metamaskLogo}
                  alt="User Avatar"
                />{" "}
              </div>
            </div>
           Metamask
          </DropdownItem>
          <DropdownItem tag={Link} to="edit-user-profile">
            <i className="material-icons">&#xE8B8;</i> Edit Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="file-manager-list">
            <i className="material-icons">&#xE2C7;</i> Files
          </DropdownItem>
          <DropdownItem tag={Link} to="transaction-history">
            <i className="material-icons">&#xE896;</i> Transactions
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={Link} to="/" className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Disconnect
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
