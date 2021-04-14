import { render } from "@testing-library/react";
import React from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import data from "./data.json"
import Cart from "./components/Cart";


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
      cartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[],
    }
  }
  createOrder = (order)=>{
    alert('need to save order')
  }
  addToCart = (product) =>{
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item)=>{
      if (item._id === product._id){
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart){
      cartItems.push({...product, count:1});
    }
    this.setState({cartItems});
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  sortProducts=(e)=>{
    const sort = e.target.value;
    this.setState((state)=> ({
      sort: sort,
      products: this.state.products.slice().sort((a,b)=>(
        sort == "lowest" ? ((a.price > b.price) ? 1:-1):
        sort == "highest" ? ((a.price < b.price) ? 1:-1):
        ((a._id < b._id) ? 1:-1)
      ))
    }));
  }
  filterProducts =(e)=> {
    if(e.target.value===""){
      this.setState({size:e.target.value, product: data.products})
    }else{
      this.setState({
        size:e.target.value,
        products: data.products.filter((product)=> product.availableSizes.indexOf(e.target.value) >=0)
      })
    }
  }
  removeFromCart=(product)=>{
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x)=> x._id !== product._id)
    })
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((x)=> x._id !== product._id)));
  };
  render(){
    return (
      <div className="grid-container">
        <header className="App-header">
          <a href='/'>Shopping cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count ={this.state.products.length}
                      size = {this.state.size}
                      sort = {this.state.sort}
                      filterProducts = {this.filterProducts}
                      sortProducts = {this.sortProducts}
              />
              <Products products={this.state.products} addToCart={this.addToCart}/>
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems} 
                    createOrder={this.createOrder}
                    removeFromCart={this.removeFromCart}/>
            </div>
          </div>
        </main>
        <footer>All rights reserved</footer>
      </div>
    );
  }
}

export default App;
