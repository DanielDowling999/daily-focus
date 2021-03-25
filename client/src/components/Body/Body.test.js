import React from "react";
import { shallow } from "enzyme";
import Body from ".";
import renderer from "react-test-renderer";

test("Renders body without crashing", () => {
    shallow(<Body />);
});

test("Renders no widgets found message", () => {
    const tree = renderer.create(<Body />).toJSON();

    expect(tree).toMatchSnapshot();
});
