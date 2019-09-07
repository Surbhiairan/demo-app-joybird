import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../Components/Header';
import ProductsList from '../../Components/ProductsList';
import { getAllProducts } from '../../Actions/product.action';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentWillReceiveProps(props) {
        console.log('products---', props.products)
        this.setState({ products: props.products})
    }


    componentDidMount() {
        this.props.getAllProducts();
    }

    render() {
        return (
            <div>
                <Header
                    history={this.props.history}
                />
                <ProductsList
                    products={this.state.products}
                    history={this.props.history}
                />
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products.getAllProducts,
        productsError: state.products.products.productsError,
        productsLoading: state.products.products.productsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllProducts: () => dispatch(getAllProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
