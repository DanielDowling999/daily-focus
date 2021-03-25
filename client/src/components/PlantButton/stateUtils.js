import tree0 from "../../images/tree0.png";
import tree1 from "../../images/tree1.png";
import tree2 from "../../images/tree2.png";
import tree3 from "../../images/tree3.png";
import wateringCan from "../../images/wateringCan.png";

const stateUtils = {
    controls: {
        water: "water",
    },
    plantImageUrls: [tree0, tree1, tree2, tree3],
    buttonImageUrls: {
        water: wateringCan,
    },
    feedback: {
        start:
            "When you finish a task, you will get water so you can water your tree! Try to click the watering can.",
        win: "Congratulations! You are now a certified plant Mom.",
        noCoin: "Sorry, you need to complete more tasks to water the tree.",
    },
};

export default stateUtils;
