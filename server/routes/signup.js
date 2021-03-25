var express = require("express");
var router = express.Router();
const firebase = require("firebase");
const database = require("./../firebase").database;

/* Endpoint to handle signing up */
router.post("/", function (req, res, next) {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
    };

    let token, userId;

    firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((idtoken) => {
            token = idtoken;
            //add user's email to real time database
            const user = {
                email: newUser.email,
            };

            return database.ref("/").update({
                [userId]: user,
            });
        })
        .then(() => {
            return res.status(201).json({ token });
        })
        .catch((err) => {
            //send error response with message thrown by firebase
            return res.status(400).json({ message: err.message });
        });
});

module.exports = router;
