import React, { Component } from "react";
import Navbars from "./Components/Navbar/Navbars";
import CategoryList from "./Components/Category/CategoryList";
import ProductList from "./Components/Product/ProductList";
import { Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import alertify from "alertifyjs";
import { Route, Routes } from "react-router-dom";
import Notfound from "./Pages/Notfound";
import CartList from "./Pages/CartList";
import FromDemo1 from "./Pages/FormDemo1";
import FromDemo2 from "./Pages/FormDemo2";

export default class App extends Component {
  state = { currentCategory: "", products: [], cart: [] };
  componentDidMount() {
    this.getProducts();
  }
  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };
  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };
  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => c.product.id === product.id);

    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }

    this.setState({ card: newCart });
    alertify.set("notifier", "position", "bottom-left");
    alertify.success(product.productName + "added to cart !", 3);
  };
  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
    alertify.set("notifier", "position", "bottom-left");
    alertify.error(product.productName + " Removed!");
  };
  render() {
    const titles = [{ title: "Product List" }, { title: "Category List" }];

    return (
      <div>
        <Container>
          <Navbars
            removeFromCart={this.removeFromCart}
            cart={this.state.cart}
          />

          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={titles[1].title}
              />
            </Col>
            <Col xs="9">
              <Routes>
                <Route
                  
                  path="/"
                  element={
                    <ProductList
                      products={this.state.products}
                      addToCart={this.addToCart}
                      currentCategory={this.state.currentCategory}
                      info={titles[0].title}
                    />
                  }
                />

                <Route
                  
                  path="/cart"
                  element={
                    <CartList
                      cart={this.state.cart}
                      removeFromCart={this.removeFromCart}
                      
                    />
                  }
                />
                < Route path="/form1" element={<FromDemo1/>}/>
                < Route path="/form2" element={<FromDemo2/>}/>
                <Route path="*" element={<Notfound />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
