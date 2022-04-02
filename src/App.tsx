import React from "react";
import {BrowserHistory, createBrowserHistory} from "history";
import {Routes} from "./router/routes";
import {rootReducer} from "./components/features/combineReducers";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";

export const history: BrowserHistory = createBrowserHistory();

export const rootState = (state: RootState) => state;

export const store = configureStore({reducer: rootReducer, devTools: true});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const App: React.FC = () => {

    return (
        <Provider store={store}>
            <Routes></Routes>
        </Provider>
    );
}
