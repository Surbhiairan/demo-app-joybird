import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { createBrowserHistory } from "history";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { ApolloProvider } from 'react-apollo'
import ApolloClient from "apollo-boost";

import './App.css';

import rootReducer from './store';

import Login from './Authentication/views/Login';
import SignUp from './Authentication/views/SignUp';
import AdminHome from './Admin/views/AdminHome';
import Home from './Client/views/Home';
import ProductDetail from './Client/views/ProductDetail';

import CreateProduct from './Admin/views/CreateProduct';
import EditProduct from './Admin/views/EditProduct';
import { client } from './config';

// const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql"
// });

const user = JSON.parse(localStorage.getItem('user'));

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      user && user.role === 'ADMIN'
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )
const hist = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = composeEnhancers(applyMiddleware(thunk, logger))(createStore);
const store = createStoreWithMiddleware(rootReducer);

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router history={hist}>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signUp" component={SignUp}/>
          <Route exact path="/home" component={Home}/>
          {/* <Route exact path="/admin" component={AdminHome}/> */}
          <Route exact path="/product/:id" component={ProductDetail}/>
          <PrivateRoute exact path="/createProduct" component={CreateProduct}/>
          <PrivateRoute exact path="/editProduct/:id" component={EditProduct}/>
        </Router>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
