import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

export default class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
      ,count:100
    };
    
  }
  componentDidMount() {
    this.getCategories();
  }
  
  getCategories=() =>{
      fetch("http://localhost:3000/categories")
      .then(response=>response.json())
      .then(data=>this.setState({categories:data}))
    }
  
  render() {
    
    return (
      <div>
        <h3>{this.props.info}</h3>
        <ListGroup  >
          {this.state.categories.map((category) => (
            <ListGroupItem key={category.id}active={category.categoryName===this.props.currentCategory? true:false}
              
            onClick={() => this.props.changeCategory(category)
                
              }
              
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
        {/* <h4>{this.props.currentCategory}</h4> */}
      </div>
    );
  }
}
