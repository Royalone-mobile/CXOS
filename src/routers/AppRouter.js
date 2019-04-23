// IMPORT PACKAGE REFERENCES

import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// IMPORT PROJECT REFERENCES

import { HomePage } from '../screens/HomePage';


import LoginPage from '../screens/Auth/SignIn/LoginPage';
import ForgotPassword from '../screens/Auth/ForgotPassword/ForgotPassword';
import SignUpPage from '../screens/Auth/SignUp/SignUpPage';
import AddOrganizationInfo from '../screens/Auth/AddOrganizationInfo/AddOrganizationInfo';
import SelectPlanAndBilling from '../screens/Auth/SelectPlanAndBilling/SelectPlanAndBilling';

// COMPONENT

export const AppRouter = () => (
    <BrowserRouter>
        <Fragment>
            <Switch>
                <Route path='/' component={HomePage} exact={true}/>
                <Route path='/selectplanbilling' component={SelectPlanAndBilling}  />
                <Route path='/login' component={LoginPage} />
                <Route path='/forgotpassword' component={ForgotPassword} />
                <Route path='/signup' component={SignUpPage} />
                <Route path='/addorganization' component={AddOrganizationInfo} />
                <Redirect to="/" />
            </Switch>
        </Fragment>
    </BrowserRouter>
);