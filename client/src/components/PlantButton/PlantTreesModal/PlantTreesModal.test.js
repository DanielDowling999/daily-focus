import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import PlantTreesModal from ".";

test("it renders correctly", () => {
    const shallowRenderer = new ShallowRenderer();
    const snapshotComponent = shallowRenderer.render(<PlantTreesModal />);
    expect(snapshotComponent).toMatchSnapshot();
});
