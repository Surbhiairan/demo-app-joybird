import { combineReducers } from 'redux';

import Product from './Reducers/productReducer';
//import Cart from './cart.reducer';

const rootReducer = combineReducers({
    products: Product,
    //cart: Cart
});

export default rootReducer;
