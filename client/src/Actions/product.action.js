import gql from "graphql-tag";

import { client } from '../config';
    const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
    const GET_ALL_PRODUCTS_SUCCESS = 'GET_ALL_PRODUCTS_SUCCESS';
    const GET_ALL_PRODUCTS_FAILURE = 'GET_ALL_PRODUCTS_FAILURE';

    const GET_PRODUCT_LOADING = 'GET_PRODUCT_LOADING';
    const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
    const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE';

export const getAllProducts = () => {
    return (dispatch) => {
        dispatch({type: GET_ALL_PRODUCTS})
        client
            .query({
                query: gql`
                    {
                        getAllProducts{
                            product_name,
                            unit_price,
                            category,
                            image_url,
                            product_id,
                            sizes,
                            available_quantity
                        }
                        
                    }
                `
            })
            .then(data => {
                dispatch({
                    type: GET_ALL_PRODUCTS_SUCCESS,
                    payload: data.data
                })
            })
            .catch(err => {
                dispatch({
                    type: GET_ALL_PRODUCTS_FAILURE,
                    payload: err 
                })
            })
    }
}

export const getProductDetails = (id) => {
    return (dispatch) => {
        dispatch({type: GET_PRODUCT_LOADING})
        client
            .query({
                query: gql`
                    {
                    getProductDetails(productId: ${id}) {
                        product_name,
                            unit_price,
                            category,
                            image_url,
                            product_id,
                            sizes,
                            available_quantity
                    }
                }
                `
            })
            .then(data => {
                dispatch({
                    type: GET_PRODUCT_SUCCESS,
                    payload: data.data
                })
            })
            .catch(err => {
                dispatch({
                    type: GET_PRODUCT_FAILURE,
                    payload: err 
                })
            })
        }
}
