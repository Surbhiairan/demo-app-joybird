const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const GET_ALL_PRODUCTS_SUCCESS = 'GET_ALL_PRODUCTS_SUCCESS';
const GET_ALL_PRODUCTS_FAILURE = 'GET_ALL_PRODUCTS_FAILURE';

const GET_PRODUCT_LOADING = 'GET_PRODUCT_LOADING';
const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE';


const initialState = {
    products: [],
    productsLoading: false,
    productsError: null,

    product: [],
    productLoading: false,
    productError: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_PRODUCTS:
            return { ...state, productsLoading: true}
        case GET_ALL_PRODUCTS_SUCCESS:
            return { ...state, products: action.payload, productsLoading: false}
        case GET_ALL_PRODUCTS_FAILURE:
            return { ...state, products: [], productsError: action.payload, productsLoading: false}

        case GET_PRODUCT_LOADING:
            return { ...state, productLoading: true}
        case GET_PRODUCT_SUCCESS:
            return { ...state, product: action.payload, productLoading: false}
        case GET_PRODUCT_FAILURE:
            return { ...state, product: [], productError: action.payload, productLoading: false}

        default:
            return state;
    }
}

export default reducer;