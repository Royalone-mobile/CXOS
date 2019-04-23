// IMPORT PACKAGE REFERENCES

import React from 'react';
import { NavLink } from 'react-router-dom';


const HomePage = () => (
    <main>
        <div className="jumbotron jumbotron-fluid text-dark bg-light animated fadeIn">
            <h1 className="display-6 text-center">CXOS Home</h1>
            <p className="lead text-center">What will actually display on this page hasn&apos;t been finalized yet, though there is some historical basis for it mapping to the &nbsp;
            <NavLink to='/login'>Login</NavLink> &nbsp;page, assuming that the logic is feasible to allow a page in the app-structure to override to the log-in page if the user isn&apos;t logged in.</p>
            <hr className="my-4" />
        </div>
    </main>
);

export { HomePage };