import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="#">Joybird</a>
                {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button> */}

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        {/* <li class="nav-item active">
                            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                        </li> */}
                        <li class="nav-item">
                            <Link to={`/createProduct`} class="nav-link" href="#">Create New Product</Link>
                        </li>
                        <li class="nav-item">
                            {user ? (
                                <button color="primary" style={{position: 'absolute', right: '10px'}} onClick={
                                    () => { 
                                        localStorage.removeItem('user');
                                        this.props.history.push('/login');
                                    }
                                    }>Logout</button>
                            )
                            :
                            <Link to={`/login`}>
                                <button color="primary" style={{position: 'absolute', right: '10px'}}>Login</button>
                            </Link>

                        }
                        </li>
                        {/* <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <a class="dropdown-item" href="#">Something else here</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Separated link</a>
                            </div>
                        </li> */}
                        
                    </ul>
                    </div>
                    
                </nav>
                )
            }
        
        }
        
export default Header