import React, { Fragment } from 'react'; // Fragment won't actually show up in the dom (ghost ele)

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import './App.css';

const App = () => (
    <Fragment>
        <Navbar />
        <Landing />
    </Fragment>
);

export default App;
