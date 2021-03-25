import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import styles from "./style.module.scss";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//evaluates truthy if the two date objects have the same day
const compareDate = (day1, day2) => {
    return (
        day1.getFullYear() === day2.getFullYear() &&
        day1.getMonth() === day2.getMonth() &&
        day1.getDate() === day2.getDate() &&
        day1.getDay() === day2.getDay()
    );
};

//formats the time of day of the date object
const formatTime = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes + " " + ampm;
};

const gridStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: "350px",
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        fontFamily: "'Ropa Sans'",
    },

    listItem: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "8px",
        padding: 0,
    },

    buttonStyle: {
        background: "#30A0F5",
        border: 0,
        borderRadius: 32,
        color: "white",
        height: 44,
        padding: "5px 10px",
    },
}));

function EventView({ selected, events, onRemoveEvent }) {
    const gridStyles = gridStyle();

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                {days[selected.getDay()]} {selected.getDate()} {months[selected.getMonth()]},{" "}
                {selected.getFullYear()}
            </div>
            <List>
                {events.map((event, index) =>
                    compareDate(selected, event.date) ? (
                        <ListItem className={gridStyles.listItem} key={index}>
                            <Typography variant="h6" className={gridStyles.title}>
                                {formatTime(event.date)} {event.title}
                            </Typography>
                            <Typography variant="h7" className={gridStyles.title}>
                                {event.description}
                            </Typography>
                            <IconButton
                                className={gridStyles.buttonStyle}
                                edge="end"
                                aria-label="delete"
                                onClick={() => onRemoveEvent(events.indexOf(event))}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ) : null
                )}
            </List>
        </div>
    );
}

EventView.propTypes = {
    selected: PropTypes.instanceOf(Date),
    events: PropTypes.array,
    onRemoveEvent: PropTypes.func,
};

export default EventView;
