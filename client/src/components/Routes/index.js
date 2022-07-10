import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import Home from '../../pages/Home';
import Profile from '../../pages/Profile';
import User from '../../pages/User';
import Chat from '../../pages/Chat';
import Cart from '../../pages/Cart';
import Navbar from '../Navbar';
import Contact from '../../pages/Contact';

const index = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/Profile" exact component={Profile} />
                <Route path="/Chat" exact component={Chat} />
                <Route path="/contact" exact component={Contact}/>
                <Route path="/Cart" exact component={Cart} />
                <Route path="/User/:userId" exact component={User} />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
};

export default index;