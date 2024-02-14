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
    host: "localhost",
    user: "root",
    password: "",
    database: "universitydatabase"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected successfully to MySql server")
});