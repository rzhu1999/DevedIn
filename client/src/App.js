import React, { Fragment } from 'react'; // Fragment won't actually show up in the dom (ghost ele)

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './App.scss';

const App = () => (
    <Router>
        <Fragment>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <section className='container'>
                <Switch>
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                </Switch>
            </section>
        </Fragment>
    </Router>
);

export default App;
