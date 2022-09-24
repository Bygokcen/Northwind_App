import React, { Component } from "react";

import { NavLink } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem} from "reactstrap";
import CartSummary from "../Cart/CartSummary";

export default class Navbars extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <NavbarBrand href="/">Northwind App</NavbarBrand>
          <Nav className="" navbar>
            <NavItem>
              <NavLink to="/form1">Form</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/form2">Form2</NavLink>
            </NavItem>

            <CartSummary
              removeFromCart={this.props.removeFromCart}
              cart={this.props.cart}
            />
          </Nav>
        </Navbar>
      </div>
    );
  }
}
