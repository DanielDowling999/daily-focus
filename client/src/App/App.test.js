import React from "react";
import { shallow } from "enzyme";
import ShallowRenderer from "react-test-renderer/shallow";

import App from ".";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";

let component;

beforeEach(() => {
    component = shallow(<App />);
});

test("it renders correctly", () => {
    const shallowRenderer = new ShallowRenderer();
    const snapshotComponent = shallowRenderer.render(<App />);
    expect(snapshotComponent).toMatchSnapshot();
});

test("it contains a landing page", () => {
    expect(component.find(LandingPage)).toHaveLength(1);
});

test("it contains a login page", () => {
    expect(component.find(LoginPage)).toHaveLength(1);
});

test("it contains a home page", () => {
    expect(component.find(HomePage)).toHaveLength(1);
});
