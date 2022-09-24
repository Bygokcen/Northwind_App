import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  NavItem,
  NavLink
} from "reactstrap";
import {Link} from "react-router-dom";
export default class CartSummary extends Component {
  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          &#x1F9FA; - <Badge color="success">{this.props.cart.length}</Badge>
        </DropdownToggle>
        <DropdownMenu end>
          {this.props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
              {cartItem.product.productName}-
              <Badge color="info">{cartItem.quantity}</Badge>
              {'  '}
              <Badge color="danger" pill onClick={()=>this.props.removeFromCart(cartItem.product)}>&#x232B;</Badge>
            </DropdownItem>
          ))}

          <DropdownItem divider />
          <DropdownItem><Link to="cart">go to CART</Link></DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
  renderEmpty(){
    return(
    <NavItem>
      <NavLink>&#x1F9FA;</NavLink>
    </NavItem>
    )
  }
  render() {
    return <div>
      {this.props.cart.length>0?this.renderSummary():this.renderEmpty()}
    </div>;
  }
}
