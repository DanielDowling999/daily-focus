import React from "react";
import { shallow } from "enzyme";
import ShallowRenderer from "react-test-renderer/shallow";

import Weather from "./";

let component;

beforeEach(() => {
    component = shallow(<Weather />);
});

test("it renders correctly", () => {
    const shallowRenderer = new ShallowRenderer();
    const snapshotComponent = shallowRenderer.render(<Weather />);
    expect(snapshotComponent).toMatchSnapshot();
});
