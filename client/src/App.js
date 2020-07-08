import React, {useState} from 'react';
import {BrowserRouter, NavLink, Redirect, Route, Router, Switch} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import './styles/App.scss'


const App = () => {


    return (
        <BrowserRouter>
        <div className="wrapper">
            <header className="wrapper__header">
                Welcome to page generator
                <NavLink to="/registration" className="wrapper__nav__link"> Registration</NavLink>
                <NavLink to="/" className="wrapper__nav__link">Main page</NavLink>
            </header>


                <Switch>
                    <div className="wrapper__login">
                        <Route exact path="/" component={LoginForm}  />
                        <Route exact path="/registration" component={RegistrationForm} />
                    </div>
                </Switch>






        </div>
        </BrowserRouter>

    );
};

export default App;
