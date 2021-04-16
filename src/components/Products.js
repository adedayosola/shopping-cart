import React, { Component } from 'react';
// import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Reveal from "react-reveal/Reveal";
import {connect} from "react-redux";
import {fetchProducts} from "../actions/productAction"

class Products extends Component {
    constructor(props){
        super(props);
        this.state = {
            product:null,
        };
    }
    componentDidMount(){
        this.props.fetchProducts();
    }
    openModal=(product)=>{
        this.setState({product});
    }
    closeModal=(product)=>{
        this.setState({product:null});
    }
    render() {
        const {product}=this.state;
        return (
            <div>
                <Fade bottom cascade={true}>
                        {
                            !this.props.products ? (<div>Loading...</div>) :(
                            <ul className="products">
                        {this.props.products.map((product)=>(
                        <li key={product._id}>
                            <div className="product">
                                <a href={"#" + product._id} onClick={()=>this.openModal(product)}>
                                    <img src={product.image} alt={product.title}></img>
                                    <p>{product.description}</p>
                                </a>
                                <div className="product-price">
                                <div>{product.price}</div>
                                    
                                    {/* <div>{formatCurrency(product.price)|| null}</div>  */}
                                    <button onClick = {()=> this.props.addToCart(product)} className="button primary">Add to Cart</button>
                                </div>
                            </div>
                        </li>
                            ))}
                    </ul>)
                        }
                    
                </Fade>
                {
                    product && (
                        <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <Reveal>
                                <button className="close-modal" onClick={this.closeModal}>X</button>
                                <div className="product-details">
                                    <img src={product.image} alt={product.title}></img>
                                    <div className="product-details-description">
                                        <p><strong>{product.title}</strong></p>
                                        <p>{product.description}</p>
                                        <p>
                                            Available Sizes:{' '}
                                            {product.availableSizes.map((x)=>(
                                                <span>
                                                    {' '}
                                                    <button className="button secondary">{x}</button>
                                                </span>
                                            ))}
                                        </p>
                                        <div className="product-price">
                                                <div>
                                                {/* {formatCurrency(product.price || 0)} */}
                                                {product.price}
                                                </div>
                                            <button className="button primary" onClick={()=>{
                                                this.props.addToCart(product);
                                                this.closeModal();
                                                }}>Add to Cart
                                            </button>
                                        </div>
                                        
                                    </div>
                                </div>
                            </Reveal>
                        </Modal>
                    )
                }
            </div>
        )
    }
}

export default connect((state)=>({products: state.products.filteredItems}), {fetchProducts})(Products);