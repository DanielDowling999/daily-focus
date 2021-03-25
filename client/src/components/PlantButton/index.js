import React from "react";
import ReactModal from "react-modal";
import PlantTreesModal from "./PlantTreesModal";
import { Fab, makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import EcoIcon from "@material-ui/icons/Eco";

import styles from "./style.module.scss";

const useStyles = makeStyles({
    fab: {
        backgroundColor: "#30A0F5",
    },
});

function PlantButton({ taskPoints, onSpendPoint }) {
    const classes = useStyles();

    const [showModal, setShowModal] = React.useState(false);

    return (
        <div className={styles.app}>
            <Fab
                onClick={() => setShowModal(true)}
                color="primary"
                size="medium"
                className={classes.fab}
            >
                <EcoIcon />
            </Fab>
            <ReactModal isOpen={showModal} contentLabel="model" ariaHideApp={false}>
                <PlantTreesModal waterCoins={taskPoints} onSpendPoint={onSpendPoint} />
                <Fab
                    onClick={() => setShowModal(false)}
                    color="primary"
                    size="medium"
                    className={classes.fab}
                >
                    <CloseIcon />
                </Fab>
            </ReactModal>
        </div>
    );
}

export default PlantButton;
