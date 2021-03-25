import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
<<<<<<< HEAD:client/src/App.js

import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import "./App.css";
import Weather from "./components/Weather";
function App() {
    return <Weather />;
=======
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import "./style.css";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/signup" />
                </Route>

                <Route exact path="/signup">
                    <LandingPage />
                </Route>

                <Route exact path="/login">
                    <LoginPage />
                </Route>

                <Route exact path="/home">
                    <HomePage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
>>>>>>> upstream/main:client/src/App/index.js
}

export default App;
