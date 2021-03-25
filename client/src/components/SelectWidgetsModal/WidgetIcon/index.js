import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

import styles from "./style.module.scss";

function WidgetIcon({ image, label, selectedWidgets, setSelectedWidgets }) {
    const [selected, setSelected] = useState(false);

    const handleClick = (selected) => {
        setSelected(selected);
        if (selected) {
            setSelectedWidgets([...selectedWidgets, label]);
        } else {
            setSelectedWidgets(
                selectedWidgets.filter((selectedWidget) => selectedWidget !== label)
            );
        }
    };

    return (
        <Grid item xs={6}>
            <Card
                className={`${styles.card} ${selected && styles.selectedCard}`}
                onClick={() => handleClick(!selected)}
                raised
            >
                <img src={image} className={styles.media} alt={label} />
                <CardContent className={styles.cardContent}>{label}</CardContent>
            </Card>
        </Grid>
    );
}

export default WidgetIcon;
