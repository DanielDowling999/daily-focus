import React, { useState } from "react";
import Calendar from "react-calendar";
import EventView from "./EventView";
import NewEvent from "./NewEvent";
import initialEvents from "./initial-events.js";
import { makeStyles } from "@material-ui/core/styles";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import styles from "./style.module.scss";
import "./Calendar.scss";

const compareDate = (day1, day2) => {
    return (
        day1.getFullYear() === day2.getFullYear() &&
        day1.getMonth() === day2.getMonth() &&
        day1.getDate() === day2.getDate()
    );
};

const gridStyle = makeStyles((theme) => ({
    circle: {
        width: "8px",
    },
}));

function CalendarWidget() {
    const [selected, setSelected] = useState(new Date());
    const [events, setEvents] = useState(initialEvents);

    //Declare grid styling
    const gridStyles = gridStyle();

    //Add content to the calendar tiles
    const tileContent = ({ date }) => (
        <div>
            {events.map((event) =>
                compareDate(event.date, date) ? (
                    <FiberManualRecordIcon className={gridStyles.circle} />
                ) : null
            )}
        </div>
    );

    const onAddNewEvent = (title, description) => {
        setEvents([
            ...events,
            {
                date: new Date(
                    selected.getMonth() +
                        1 +
                        " " +
                        selected.getDate() +
                        ", " +
                        (selected.getYear() + 1900) +
                        " " +
                        "00:00:00"
                ),
                title: title,
                description: description,
            },
        ]);
    };

    const onRemoveEvent = (index) => {
        events.splice(index, 1);
        setEvents([...events]);
    };

    return (
        <div className={styles.container}>
            <Calendar onClickDay={(value) => setSelected(value)} tileContent={tileContent} />
            <EventView selected={selected} events={events} onRemoveEvent={onRemoveEvent} />
            <NewEvent onAddNewEvent={onAddNewEvent} />
        </div>
    );
}

export default CalendarWidget;
