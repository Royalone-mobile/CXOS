// IMPORT PACKAGES

import React from 'react';
import { Provider } from 'react-redux';

// IMPORT STORE

import { createAppStore } from './store/AppStore';
// IMPORT COMPONENTS

import { AppRouter } from './routers/AppRouter';


// COMPONENT

export const App = () => (
    <Provider store={createAppStore()}>
        <AppRouter />
    </Provider>
);