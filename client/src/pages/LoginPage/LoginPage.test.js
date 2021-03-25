import React from "react";
import { shallow, mount } from "enzyme";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import ShallowRenderer from "react-test-renderer/shallow";

import LoginPage from ".";

let component;

beforeEach(() => {
    component = shallow(<LoginPage />);
});

test("it renders correctly", () => {
    const shallowRenderer = new ShallowRenderer();
    const snapshotComponent = shallowRenderer.render(<LoginPage />);
    expect(snapshotComponent).toMatchSnapshot();
});

test("Route changes to '/' when sign up clicked", () => {
    const history = createMemoryHistory();
    const wrapper = mount(
        <Router history={history}>
            <LoginPage />
        </Router>
    );
    wrapper.find("a").simulate("click", { button: 0 });
    expect(history.location.pathname).toBe("/");
});
