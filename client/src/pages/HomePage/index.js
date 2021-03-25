import React from "react";
import createPersistedState from "use-persisted-state";

import Header from "../../components/Header";
import Body from "../../components/Body";

const useWidgetState = createPersistedState("selectedWidgets");

function HomePage() {
    const [selectedWidgets, setSelectedWidgets] = useWidgetState([]);

    return (
        <div>
            <Header selectedWidgets={selectedWidgets} setSelectedWidgets={setSelectedWidgets} />
            <Body selectedWidgets={selectedWidgets} setSelectedWidgets={setSelectedWidgets} />
        </div>
    );
}

export default HomePage;
