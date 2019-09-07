import React, { Component } from 'react';
import { getProductDetails } from '../../Actions/product.action';
import { connect } from 'react-redux';

class ProductDetail extends Component {
    state = {
        product: {}
    }

    componentDidMount() {
        console.log('inside here----', this.props)
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.props.getProductDetails(this.props.match.params.id)
        }
            
    }

    componentWillReceiveProps(props) {
        console.log('products---', props.product)
        this.setState({ product: props.product})
    }


    render() {
        if(this.state.product === {}) {
            return null;
        }

        return (
            this.state.product && (
                <div class="card">
                    <div class="row">
                        <aside class="col-sm-5 border-right">
                            <article class="gallery-wrap">
                                <div class="img-big-wrap">
                                    <div>
                                        <a href="#">
                                            <img width="500px" height="600px" src={this.state.product.image_url}>
                                            </img>
                                        </a>
                                    </div>
                                </div>
                            </article>
                        </aside>
                        <aside class="col-sm-7">
                            <article class="card-body p-5">
                                <h3 class="title mb-3">{this.state.product.product_name}</h3>
                                <p class="price-detail-wrap">
                                    <span class="price h3 text-warning">
                                        <span class="currency">US $</span><span class="num">{this.state.product.unit_price}</span>
                                    </span>
                                </p>
                                <dl class="param param-feature">
                                    <dt>Category</dt>
                                    <dd>{this.state.product.category}</dd>
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
                                               {this.state.product.available_quantity}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="col-sm-7">
                                        <dl class="param param-inline">
                                            <dt>Size: </dt>
                                            <dt>{this.state.product.sizes}</dt>
                                        </dl>
                                    </div>
                                </div>
                                <hr></hr>
                                <a href="#" class="btn btn-lg btn-primary text-uppercase"> Buy now </a>
                                <a href="#" class="btn btn-lg btn-outline-primary text-uppercase"> <i class="fas fa-shopping-cart"></i> Add to cart </a>
                            </article>
                        </aside>
                    </div>
                </div>
            )

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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);

