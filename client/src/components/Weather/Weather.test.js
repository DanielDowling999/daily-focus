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
// All of these cases are almost definitely covered by the snapshot test.
test("it contains DayCards and HourCards", () => {
    expect(component.find(".hourlyForecast")).toHaveLength(1);
    expect(component.find(".dailyForecast")).toHaveLength(1);
});

test("it contains an icon for main", () => {
    expect(component.find(".iconContainer")).toHaveLength(1);
});
