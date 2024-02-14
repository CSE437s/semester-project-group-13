const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

app.listen(3000, () => {
    console.log("Server started ...");
});

app.get("/", (req, res) => {
    res.send("Hello From The Server");
})


const connection = mysql.createConnection({
    host: "oasispractice-chrisspam1126-ece5.a.aivencloud.com",
    port: "16031",
    user: "avnadmin",
    password: "AVNS_wABtR6d4vmnUszOm4hC",
    database: "defaultdb"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected successfully to MySql server")
});



app.post("/user", (req, res) => {

const username = req.body.username;
const password = req.body.password;

const selectQuery = "SELECT * FROM users WHERE username = ? AND password = ?";

connection.query(selectQuery, [username, password], (err, results) => {
    if (err) {
        console.error("Error checking credentials:", err);
        res.status(500).send("Error checking credentials");
    } else {
        if (results.length > 0) {
            console.log("Credentials are valid");
            res.status(200).send("Credentials are valid");
        } else {
            console.log("Invalid credentials");
            res.status(401).send("Invalid credentials");
        }
    }
});
});