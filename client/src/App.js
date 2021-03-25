import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import "./App.css";
import Weather from "./components/Weather";
function App() {
    return <Weather />;
}

export default App;
