import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const DELETE_PRODUCT = gql`
  mutation deleteProduct($product_id: ID!) {
    deleteProduct(product_id: $product_id) {
        product_id
    }
  }
`;
class ProductsList extends Component {
    constructor(props) {
        super(props);
    }

    addToCart = (product, user) => {
        if(!user) {
            alert('Please login to continue');
        } else {
            
        }
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        return (
            <div class="row" style={{display: 'flex'}}>
                {this.props.products && this.props.products.length > 0 && this.props.products.map(product => (
                    <div class="card col-sm-3" style={{"width": "18rem"}}>
                        <Link to={`/product/${product.product_id}`}>
                            <img class="card-img-top" src={product.image_url} style={{height: 200}} alt="Card image cap"></img>
                        </Link>
                        <div class="card-body">
                            <h5 class="card-title">{product.product_name}</h5>
                            <p class="card-text">Product Category: {product.category}</p>
                            <p class="card-text">Product Size: {product.sizes}</p>
                            <p class="card-text">Price: {product.unit_price}</p>
                            <p class="card-text">Availability: {product.available_quantity}</p>
                            {user && user.role === 'ADMIN' ? (
                                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                                    <Mutation 
                                        mutation={DELETE_PRODUCT} 
                                        variables={{$product_id: product.product_id}}
                                        onCompleted={() => {
                                            alert("Item deleted successfully.")
                                            this.props.history.push('/admin')
                                            }
                                        }
                                    >
                                        {(deleteProduct) => (
                                            <button class="btn btn-primary" onClick={deleteProduct}>DELETE</button>
                                        )}
                                    </Mutation> 
                                    <Link to={`/editProduct/${product.product_id}`}>
                                        <button class="btn btn-primary">EDIT</button>
                                    </Link>
                                </div>
                                
                            ) :
                            (
                                <Link>
                                        <button class="btn btn-primary" onClick={() => this.addToCart(product, user)}>ADD TO CART</button>
                                    </Link>
                            )
                        }
                            
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
        
export default ProductsList