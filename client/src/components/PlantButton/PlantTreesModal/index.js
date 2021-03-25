import React, { useState } from "react";
import Plant from "./Plant";
import ControlButton from "./ControlButton";
import UserFeedback from "./UserFeedback";
import stateUtils from "../stateUtils";

import styles from "./style.module.scss";

import createPersistedState from "use-persisted-state";
const usePlantProgressState = createPersistedState("plantProgress");

function PlantTreesModal({ waterCoins, onSpendPoint }) {
    const [plantProgress, setPlantProgress] = usePlantProgressState(0);

    const [config, setConfig] = useState({
        plantSize: 0, //This var shows different trees pictures
        feedback: stateUtils.feedback.start,
    });
    const POINTS = {
        SEEDLING: 2, //small trees
        SMALL: 5, //medium trees
        FULL_GROWN: 10, // big trees
    };

    const handlePlantGrowth = () => {
        if (waterCoins > 0) {
            const newProgress = plantProgress + 1;
            if (newProgress >= POINTS.FULL_GROWN) {
                setConfig({
                    ...config,
                    plantSize: 3,
                    feedback: stateUtils.feedback.win,
                }); //Change to the big trees pictures
            } else if (newProgress >= POINTS.SMALL) {
                setConfig({ ...config, plantSize: 2 }); //Change to the medium trees pictures
            } else if (newProgress >= POINTS.SEEDLING) {
                setConfig({ ...config, plantSize: 1 }); //Change to the small trees pictures
            }
            onSpendPoint();
            setPlantProgress(newProgress);
        } else {
            setConfig({ ...config, buttonState: false, feedback: stateUtils.feedback.noCoin });
        }
    };
    //show the progressbar
    const getProgress = () => {
        const progressPercentage = Math.round((plantProgress / POINTS.FULL_GROWN) * 100);
        return progressPercentage < 100 ? progressPercentage : 100;
    };

    return (
        <div className={styles.app}>
            <div className={styles.appHeader}>Grow your plant</div>

            <div>
                {`Tasks Completed: ${waterCoins}`}
                {/* plant display */}
                <Plant plantImage={stateUtils.plantImageUrls[config.plantSize]}></Plant>
                {/* control buttons */}
                <ControlButton
                    control={stateUtils.controls.water}
                    points={1}
                    handlePlantGrowth={handlePlantGrowth}
                    image={stateUtils.buttonImageUrls.water}
                />
                <UserFeedback feedbackText={config.feedback} progress={getProgress()} />
                <div></div>
            </div>
        </div>
    );
}

export default PlantTreesModal;
