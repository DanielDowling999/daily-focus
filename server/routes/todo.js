const { database } = require("../firebase");
const authorise = require("../utils/auth");
var express = require("express");
var router = express.Router();
const uuid = require("uuid");

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
    const userId = await authorise(req);

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
            return;
        });

    entryArray.sort((a, b) => {
        return sortByDateTime(a, b);
    });

    todaysDate.setHours(todaysDate.getHours() + NZGmt);
    todaysDate = todaysDate.toISOString().slice(0, 10);
    console.log(todaysDate);

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
router.post("/", async function (req, res, next) {
    let entryArray = [];
    let newEntry = req.body;

    // Authorisation for user
    const userId = await authorise(req);

    if (userId === "") {
        res.status(401).send("Unauthorised user.");
    }

    // Retrieve array of entries for user from firebase DB
    await database
        .ref()
        .child(userId)
        .child("todolist")
        .get()
        .then((snapshot) => {
            // Only accept if array exists
            if (snapshot.exists()) {
                entryArray = snapshot.val();
            }
        })
        .catch((error) => {
            res.send(error);
            return;
        });

    // Set ticked : false for new entry
    newEntry.ticked = false;

    // Set uuid for new entry
    newEntry.entry_id = uuid.v4();

    // Add new todolist entry to array
    entryArray.push(newEntry);

    // Write this updated list back to the database
    await database.ref().child(userId).child("todolist").set(entryArray);

    res.status(200).send("Successful addition of entry");
});

/* PUT entry update */
router.put("/", async function (req, res, next) {
    let userId = await authorise(req);
    let entryArray = [];

    if (userId === "") {
        return res.status(401).send("Unauthorised user.");
    }

    // Retrieve array of entries for user from firebase DB
    await database
        .ref()
        .child(userId)
        .child("todolist")
        .get()
        .then((snapshot) => {
            // Only accept if array exists and contains entries
            if (snapshot.exists() && snapshot.val().length != 0) {
                entryArray = snapshot.val();
            } else {
                res.status(400).send("No entries for user");
                return;
            }
        })
        .catch((error) => {
            res.send(error);
            return;
        });

    // Go through current array to find and update the entry that was changed
    entryArray.forEach((element) => {
        if (element.entry_id == req.body.entry_id) {
            for (var propt in req.body) {
                element[propt] = req.body[propt];
            }
        }
    });

    // Write this updated list back to the database.
    await database.ref().child(userId).child("todolist").set(entryArray);

    res.status(200).send("Successful Update");
});

/* DELETE todo list entry*/
router.delete("/", async function (req, res, next) {
    let userId = await authorise(req);

    if (userId === "") {
        return res.status(401).send("Unauthorised user.");
    }

    var originData,
        updatedArray = [];

    // Retrieve array of entries for user from firebase DB
    await database
        .ref()
        .child(userId)
        .child("todolist")
        .get()
        .then((snapshot) => {
            // Only accept if array exists
            if (snapshot.exists()) {
                // Get the current data from the database
                originData = snapshot.val();
                // Filter the data from the origin data based on the entry id
                updatedArray = originData.filter((entry) => entry.entry_id != req.body.entry_id);
            } else {
                // No data available
                res.status(200).send("No data available");
                return;
            }
        })
        .catch((error) => {
            res.send(error);
            return;
        });

    // Update the firebase with the updated array
    await database.ref().child(userId).child("todolist").set(updatedArray);

    res.status(200).send("Successful deletion");
});

module.exports = router;
