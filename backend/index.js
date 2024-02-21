const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require('cors');

  
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello from our server!')
})



const connection = mysql.createConnection({
    host: "oasispractice-chrisspam1126-ece5.a.aivencloud.com",
    port: "16031",
    user: "avnadmin",
    password: "AVNS_wABtR6d4vmnUszOm4hC",
    database: "mydatabase"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected successfully to MySql server")
});


app.post("/getUser", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const selectQuery = "SELECT * FROM users WHERE username = ? AND password = ?";

    connection.query(selectQuery, [username, password], (err, results) => {
        if (err) {
            console.error("Error checking credentials:", err);
            res.status(500).json({ error: "Error checking credentials" });
        } else {
            if (results.length > 0) {
                console.log("Credentials are valid");
                res.status(200).json({  username: username, password: password });
            } else {
                console.log("Invalid credentials");
                res.status(401).json({ error: "Invalid credentials" });
            }
        }
    });
});

app.post("/createFamily", (req, res) => {
    const headOfHouseHold = req.body.headOfHouseHold;
    const familyName = req.body.familyName;
    const address = req.body.address;
    const city = req.body.city;
    const zipCode = req.body.zipCode;
    const familyMembers = req.body.familyMembers;
    const phoneNumber = req.body.phoneNumber;
    
    const query = "INSERT INTO families (headOfHouseHold, familyName, address, city, zipcode, familyMembers, phoneNumber) VALUES (?, ?, ?, ?, ?, ?, ?)";

    connection.query(query, [headOfHouseHold, familyName, address, city, zipCode, familyMembers, phoneNumber], (err, results) => {
        if (err) {
            console.error("Error Creating Family", err);
            res.status(500).json({ error: "Error creating family" });
        } else {
            const familyId = results.insertId;
            console.log("Family created with ID:", familyId);
            res.status(200).json({ result: "Success", familyId });
        }
    });
});
app.post("/createRefugee", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;
    const countryOfOrigin = req.body.countryOfOrigin;
    const age = req.body.age;
    const dateOfArrivalToUS = req.body.dateOfArrivalToUS;
    const dateOfJoiningOasis = req.body.dateOfJoiningOasis;
    const dateOfBirth = req.body.dateOfBirth;
    const gender = req.body.gender;
    const email = req.body.email;
    const familyID = req.body.familyID;

    const query = "INSERT INTO refugees (firstName, lastName, phoneNumber, countryOfOrigin, age, dateOfArrivalToUS, dateOfJoiningOasis, dateOfBirth, gender, email, familyID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    connection.query(query, [firstName, lastName, phoneNumber, countryOfOrigin, age, dateOfArrivalToUS, dateOfJoiningOasis, dateOfBirth, gender, email, familyID], (err, results) => {
        if (err) {
            console.error("Error Creating Refugee", err);
            res.status(500).json({ error: "Error creating refugee" });
        } else {
            const refugeeId = results.insertId;
            console.log("Refugee created with ID:", refugeeId);
            res.status(200).json({ result: "Success", refugeeId });
        }
    });
});


app.get("/getAllRefugees", (req, res) => {
    const query = "SELECT * FROM refugees";

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error retrieving refugees", err);
            res.status(500).json({ error: "Error retrieving refugees" });
        } else {
            res.status(200).json({ refugees: results });
        }
    });
});
    
    app.get("/getAllFamilies", (req, res) => {
        const query = "SELECT * FROM families";
    
        connection.query(query, (err, results) => {
            if (err) {
                console.error("Error retrieving families", err);
                res.status(500).json({ error: "Error retrieving families" });
            } else {
                res.status(200).json({ families: results });
            }
        });
    });
    
    app.get("/getRefugeesInFamily/:familyId", (req, res) => {
        const familyId = req.params.familyId;
        const query = "SELECT * FROM refugees WHERE familyId = ?";
    
        connection.query(query, [familyId], (err, results) => {
            if (err) {
                console.error("Error retrieving refugees in family", err);
                res.status(500).json({ error: "Error retrieving refugees in family" });
            } else {
                res.status(200).json({ refugees: results });
            }
        });
    });


    app.post("/createGoodNeighbor", (req, res) => {
        const refugeeFamilyID = req.body.refugeeFamilyID;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const phoneNumber = req.body.phoneNumber;
        const churchTheyAttend = req.body.churchTheyAttend;
        const donatorID = req.body.donatorID;
    
        const query = "INSERT INTO good_neighbors (firstName, lastName, phoneNumber, churchTheyAttend, donatorID, refugeeFamilyID) VALUES (?, ?, ?, ?, ?, ?)";
    
        connection.query(query, [firstName, lastName, phoneNumber, churchTheyAttend, donatorID, refugeeFamilyID], (err, results) => {
            if (err) {
                console.error("Error Creating Good Neighbor", err);
                res.status(500).json({ error: "Error creating good neighbor" });
            } else {
                const neighborId = results.insertId;
                console.log("Good Neighbor created with ID:", neighborId);
                res.status(200).json({ result: "Success", neighborId });
            }
        });
    });

    app.get("/getAllGoodNeighbors", (req, res) => {
        const query = "SELECT * FROM good_neighbors";
    
        connection.query(query, (err, results) => {
            if (err) {
                console.error("Error retrieving Good Neighbors", err);
                res.status(500).json({ error: "Error retrieving Good Neighbors" });
            } else {
                res.status(200).json({ goodNeighbors: results });
            }
        });
    });
    
    app.post("/createDonation", (req, res) => {
        const item = req.body.item;
        const quantity = req.body.quantity;
        const completed = req.body.completed;
        const donatorID = req.body.donatorID;
    
        const query = "INSERT INTO donations (item, quantity, completed, donatorID) VALUES (?, ?, ?, ?)";
    
        connection.query(query, [item, quantity, completed, donatorID], (err, results) => {
            if (err) {
                console.error("Error Creating Donation", err);
                res.status(500).json({ error: "Error creating donation" });
            } else {
                const donationId = results.insertId;
                console.log("Donation created with ID:", donationId);
                res.status(200).json({ result: "Success", donationId });
            }
        });
    });
    app.post("/createDonator", (req, res) => {
        const donationsHistory = req.body.donationsHistory;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const phoneNumber = req.body.phoneNumber;
        const address = req.body.address;
        const city = req.body.city;
        const zipCode = req.body.zipCode;
    
        const query = "INSERT INTO donators (donationsHistory, firstName, lastName, phoneNumber, address, city, zipCode) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
        connection.query(query, [donationsHistory, firstName, lastName, phoneNumber, address, city, zipCode], (err, results) => {
            if (err) {
                console.error("Error Creating Donator", err);
                res.status(500).json({ error: "Error creating donator" });
            } else {
                const donatorId = results.insertId;
                console.log("Donator created with ID:", donatorId);
                res.status(200).json({ result: "Success", donatorId });
            }
        });
    });
    
    app.get("/getAllDonators", (req, res) => {
        const query = "SELECT * FROM donators";
    
        connection.query(query, (err, results) => {
            if (err) {
                console.error("Error retrieving Donators", err);
                res.status(500).json({ error: "Error retrieving Donators" });
            } else {
                res.status(200).json({ donators: results });
            }
        });
    });

    
    app.get("/getAllDonations", (req, res) => {
        const query = "SELECT * FROM donations";
    
        connection.query(query, (err, results) => {
            if (err) {
                console.error("Error retrieving Donations", err);
                res.status(500).json({ error: "Error retrieving Donations" });
            } else {
                res.status(200).json({ donations: results });
            }
        });
    });
    
    app.get("/getIncompleteDonations", (req, res) => {
        const query = "SELECT * FROM donations WHERE completed = false";
    
        connection.query(query, (err, results) => {
            if (err) {
                console.error("Error retrieving Incomplete Donations", err);
                res.status(500).json({ error: "Error retrieving Incomplete Donations" });
            } else {
                res.status(200).json({ incompleteDonations: results });
            }
        });
    });

app.listen(8080, () => {
    console.log('server listening on port 8080')
})

