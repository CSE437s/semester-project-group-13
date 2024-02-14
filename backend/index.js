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