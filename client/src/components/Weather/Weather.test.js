import React from "react";
import { shallow } from "enzyme";
import ShallowRenderer from "react-test-renderer/shallow";
import styles from "./style.module.scss";

import Weather from "./";
import dailyData from "./";
//const getTodaysDate = require("../utils/date-helper");
//let todaysDate = getTodaysDate();
//import getWeatherData from "./";
let component;
const lat = -36.85;
const lon = 174.76;

beforeEach(() => {
    component = shallow(<Weather />);
});

test("it renders correctly", () => {
    const shallowRenderer = new ShallowRenderer();
    const snapshotComponent = shallowRenderer.render(<Weather />);
    expect(snapshotComponent).toMatchSnapshot();
});
//All of these cases are almost definitely covered by the snapshot test.
test("it contains DayCards and HourCards", () => {
    expect(component.find(".hourlyForecast")).toHaveLength(1);
    expect(component.find(".dailyForecast")).toHaveLength(1);
});

test("it contains an icon for main", () => {
    expect(component.find(".iconContainer")).toHaveLength(1);
});
