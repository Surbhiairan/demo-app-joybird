import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { getProductDetails } from '../../Actions/product.action';
import { connect } from 'react-redux';


const EDIT_PRODUCT = gql`
  mutation EditProduct(
      $product_id: ID!,
      $category: Category!, 
      $product_name: String!, 
      $unit_price: Float!,
      $sizes: Size!, 
      $image_url: String!, 
      $available_quantity: Int!,
      ) {
    editProduct(product_id: $product_id, category: $category, product_name: $product_name, unit_price: $unit_price,  sizes: $sizes, image_url: $image_url, available_quantity: $available_quantity, ) {
        category
        product_name
        available_quantity
        image_url
        sizes
        unit_price
    }
  }
`;


class EditProduct extends Component {
    state = {
        product_name: '',
        unit_price: 0,
        category: '',
        image_url: '',
        sizes: '',
        available_quantity: 0
    }
    componentDidMount() {
        console.log('inside here----', this.props)
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.props.getProductDetails(this.props.match.params.id)
        }
            
    }

    componentWillReceiveProps(props) {
        console.log('products---', props.product)
        this.setState({
            product_name: props.product.product_name,
            unit_price: props.product.unit_price,
            category: props.product.category,
            image_url: props.product.image_url,
            sizes: props.product.sizes,
            available_quantity: props.product.available_quantity,
            product_id: this.props.match.params.id
        })
    }
    render() {
        //console.log('state----', this.state)
        const { product_id, product_name, unit_price, category, image_url, sizes, available_quantity } = this.state;
        return (
                <div class="card">
                    <div class="row">
                    <aside class="col-sm-5 border-right">
                            <article class="gallery-wrap">
                                <div class="img-big-wrap">
                                    <div>
                                        <a href="#">
                                            <img width="500px" height="600px" src={this.state.image_url}>
                                            </img>
                                        </a>
                                    </div>
                                </div>
                            </article>
                        </aside>
                        <aside class="col-sm-7">
                            <article class="card-body p-5">
                                 <dl class="param param-feature">
                                    <dt>Name</dt>
                                    <input value={this.state.product_name} type="text" onChange={(e) => this.setState({product_name: e.target.value})}/>
                                </dl>
                                <dl class="param param-feature">
                                    <dt>Image Url</dt> 
                                    <input value={this.state.image_url} type="text" onChange={(e) => this.setState({image_url: e.target.value})}/>
                                </dl>
                                <div class="col-sm-5">
                                    <dl class="param param-inline">
                                        <dt>Category: </dt>
                                        <dd>
                                            <select 
                                                class="form-control form-control-sm" 
                                                style={{ "width": 70 }} 
                                                value={this.state.category}
                                                onChange={(e) => this.setState({category: e.target.value})}
                                            >
                                                <option value="TOPS"> TOPS </option>
                                                <option value="JEANS"> JEANS </option>
                                                <option value="FOOTWEAR"> FOOTWEAR </option>
                                            </select>
                                        </dd>
                                    </dl>
                                </div>
                                    <dl class="param param-feature">
                                    <dt>Price</dt>
                                    <input value={this.state.unit_price} type="text" onChange={(e) => this.setState({unit_price: e.target.value})}/>
                                </dl>
                                <dl class="param param-feature">
                                    <dt>Delivery</dt>
                                    <dd>India</dd>
                                </dl>

                                <hr></hr>
                                <div class="row">
                                    <div class="col-sm-5">
                                        <dl class="param param-inline">
                                            <dt>Quantity: </dt>
                                            <dd>
                                                <select 
                                                    class="form-control form-control-sm" 
                                                    style={{ "width": 70 }} 
                                                    value={this.state.available_quantity}
                                                    onChange={(e)=> this.setState({available_quantity: e.target.value})}
                                                >
                                                    <option value={1}> 1 </option>
                                                    <option value={2}> 2 </option>
                                                    <option value={3}> 3 </option>
                                                </select>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="col-sm-7">
                                        <dl class="param param-inline">
                                            <dt>Size: </dt>
                                            <dd>
                                                <label class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="S" onChange={(e)=> this.setState({sizes: e.target.value})}/>
                                                    <span class="form-check-label">SM</span>
                                                </label>
                                                <label class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="M" onChange={(e)=> this.setState({sizes: e.target.value})}/>
                                                    <span class="form-check-label">MD</span>
                                                </label>
                                                <label class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="L" onChange={(e)=> this.setState({sizes: e.target.value})}/>
                                                    <span class="form-check-label">L</span>
                                                </label>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                                <hr></hr>
                                <Mutation 
                                    mutation={EDIT_PRODUCT} 
                                    variables={{product_id, product_name, unit_price, category, image_url, sizes, available_quantity}}
                                    onCompleted={() => this.props.history.push('/admin')}
                                >
                                    {(editProduct) => (
                                        <button class="btn btn-lg btn-outline-primary text-uppercase" onClick={editProduct}> <i class="fas fa-shopping-cart"></i> Edit Product </button>
                                    )}
                                </Mutation>
                                
                            </article>
                        </aside>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.products.product.getProductDetails,
        productError: state.products.product.productsError,
        productLoading: state.products.product.productsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProductDetails: (id) => dispatch(getProductDetails(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);

