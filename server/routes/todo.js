const { database } = require("../firebase");
const authorise = require("../auth");
var express = require("express");
var router = express.Router();

// Helper method: Used to sort entryArray by GET API.
function sortByDateTime(a, b) {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    if (dateA - dateB === 0) {
        let timeA = a.time.split(":");
        let timeB = b.time.split(":");
        dateA.setHours(timeA[0]);
        dateA.setMinutes(timeA[1]);
        dateB.setHours(timeB[0]);
        dateB.setMinutes(timeB[1]);
    }
    return dateB - dateA;
}

/* GET all to do list entries */
router.get("/", async function (req, res, next) {
    let entryArray = [];
    const NZGmt = 13;
    let todaysDate = new Date();
    let userId = await authorise(req);

    if (userId === "") {
        return res.status(401).send("Unauthorised user.");
    }

    await database
        .ref()
        .child(userId)
        .child("todolist")
        .get()
        .then((snapshot) => {
            // when to-do list data is found
            if (snapshot.exists()) {
                entryArray = snapshot.val();
            }
        })
        .catch((error) => {
            res.send(error);
        });

    entryArray.sort((a, b) => {
        return sortByDateTime(a, b);
    });

    todaysDate.setHours(todaysDate.getHours() + NZGmt);
    todaysDate = todaysDate.toISOString().slice(0, 10);

    if (req.query.timeline === "today") {
        let todaysItems = entryArray.filter((item) => {
            return item.date === todaysDate;
        });

        res.send(todaysItems);
    } else if (req.query.timeline === "upcoming") {
        let toDoItemsStructured = {};
        let upcomingItems = entryArray.filter((item) => {
            return item.date > todaysDate;
        });

        // Stores upcoming to-do items by date.
        upcomingItems.forEach((toDoItem) => {
            if (toDoItem.date in toDoItemsStructured) {
                toDoItemsStructured[toDoItem.date].push(toDoItem);
            } else {
                toDoItemsStructured[toDoItem.date] = [];
                toDoItemsStructured[toDoItem.date].push(toDoItem);
            }
        });

        res.send(toDoItemsStructured);
    } else {
        res.send(entryArray);
    }
});

/* POST new todo entry */
router.post("/", function (req, res, next) {
    // TODO implementation for adding new entry to database

    res.send("post new entry to database"); // TODO change response after
});

/* PUT entry update */
router.put("/", function (req, res, next) {
    // TODO implementation for updating entry in database

    res.send("put entry update into database"); // TODO change response after
});

/* DELETE todo list entry*/
router.delete("/", function (req, res, next) {
    // TODO implementation deleting entry from our database

    res.send("delete todo list entry"); // TODO change response after
});

module.exports = router;
