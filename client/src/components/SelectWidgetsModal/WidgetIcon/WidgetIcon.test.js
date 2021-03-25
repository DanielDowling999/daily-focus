import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import WidgetIcon from "./";

test("it renders correctly", () => {
    const shallowRenderer = new ShallowRenderer();
    const snapshotComponent = shallowRenderer.render(<WidgetIcon />);
    expect(snapshotComponent).toMatchSnapshot();
});
