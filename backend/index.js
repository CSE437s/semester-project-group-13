const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const refugeeRouter = require('./src/routes/refugee.route');


app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello from our server!");
});


app.use('/refugee', refugeeRouter);


const session = require("express-session");
const cors = require("cors");

app.use(cors());
app.use(session({
    secret: "1qGzaT2IpNaCWB1siRvh7nVT2JIUyQUU", //this needs to be moved offline in future versions
    resave: false,
    saveUninitialized: true,
}))


app.listen(8080, () => {
  console.log("server listening on port 8080");
});






app.post("/login", (req, res) => {
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
        req.session.user = { username: username };
        res.status(200).json({ username: username, password: password });
      } else {
        console.log("Invalid credentials");
        res.status(401).json({ error: "Invalid credentials" });
      }
    }
  });
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.json({ message: "Logout successful" });
  });
});

//we should do this before calling the database, every time
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

app.post("/createFamily", (req, res) => {
  const head_of_household = req.body.head_of_household;
  const last_name = req.body.last_name;
  const address = req.body.address;
  const city = req.body.city;
  const zip = req.body.zip;
  const family_members = req.body.family_members ? req.body.family_members : "";
  const good_neighbor = req.body.good_neighbor ? req.body.good_neighbor : "" ;

  const query =
    "INSERT INTO families (head_of_household, last_name, address, city, zip, family_members, good_neighbor) VALUES (?, ?, ?, ?, ?, ?)";

  connection.query(
    query,
    [
      head_of_household,
      last_name,
      address,
      city,
      zip,
      family_members,
      good_neighbor,
    ],
    (err, results) => {
      if (err) {
        console.error("Error Creating Family", err);
        res.status(500).json({ error: "Error creating family" });
      } else {
        const family_Id = results.insertId;
        console.log("Family created with ID:", family_Id);
        res.status(200).json({ result: "Success", family_Id });
      }
    }
  );
});

app.post("/createRefugee", (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const phone_number = req.body.phone_number;
  const country_of_origin = req.body.country_of_origin;
  const age = req.body.age;
  const date_of_arrival_to_us = req.body.date_of_arrival_to_us;
  const date_of_joining_oasis = req.body.date_of_joining_oasis;
  const date_of_birth = req.body.date_of_birth;
  const gender = req.body.gender;
  const email = req.body.email;
  const family_id = req.body.family_id;

  const query =
    "INSERT INTO refugees (first_name, last_name, phone_number, country_of_origin, age, date_of_arrival_to_us, date_of_joining_oasis, date_of_birth, gender, email, family_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  connection.query(
    query,
    [
      first_name,
      last_name,
      phone_number,
      country_of_origin,
      age,
      date_of_arrival_to_us,
      date_of_joining_oasis,
      date_of_birth,
      gender,
      email,
      family_id,
    ],
    (err, results) => {
      if (err) {
        console.error("Error Creating Refugee", err);
        res.status(500).json({ error: "Error creating refugee" });
      } else {
        const refugee_ID = results.insertId;
        console.log("Refugee created with ID:", refugee_ID);
        res.status(200).json({ result: "Success", refugee_ID });
      }
    }
  );
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


app.post("/createGoodNeighbor", (req, res) => {
  const refugee_family_id = req.body.refugee_family_id;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const phone_number = req.body.phone_number;
  const church_they_attend = req.body.church_they_attend;
  const donator_id = req.body.donator_id;

  const query =
    "INSERT INTO good_neighbors (first_name, last_name, phone_number, church_they_attend, donator_id, refugee_family_id) VALUES (?, ?, ?, ?, ?, ?)";

  connection.query(
    query,
    [
      first_name,
      last_name,
      phone_number,
      church_they_attend,
      donator_id,
      refugee_family_id,
    ],
    (err, results) => {
      if (err) {
        console.error("Error Creating Good Neighbor", err);
        res.status(500).json({ error: "Error creating good neighbor" });
      } else {
        const neighbor_ID = results.insertId;
        console.log("Good Neighbor created with ID:", neighborId);
        res.status(200).json({ result: "Success", neighborId });
      }
    }
  );
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
  const completed = false;
  const donator_id = req.body.donator_id;

  const query =
    "INSERT INTO donations (item, quantity, completed, donator_id) VALUES (?, ?, ?, 1)";

  connection.query(
    query,
    [item, quantity, completed, donator_id],
    (err, results) => {
      if (err) {
        console.error("Error Creating Donation", err);
        res.status(500).json({ error: "Error creating donation" });
      } else {
        const donation_id = results.donation_id;
        console.log("Donation created with ID:", donation_id);
        res.status(200).json({ result: "Success", donation_id });
      }
    }
  );
});
app.post("/createDonator", (req, res) => {
  const donations_history = "";
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const phone_number = req.body.phone_number;
  const address = req.body.address;
  const city = req.body.city;
  const zip = req.body.zip;

  const query =
    "INSERT INTO donators (donations_history, first_name, last_name, phone_number, address, city, zip) VALUES (?, ?, ?, ?, ?, ?, ?)";

  connection.query(
    query,
    [
      donations_history,
      first_name,
      last_name,
      phone_number,
      address,
      city,
      zip,
    ],
    (err, results) => {
      if (err) {
        console.error("Error Creating Donator", err);
        res.status(500).json({ error: "Error creating donator" });
      } else {
        const donator_id = results.donator_id;
        console.log("Donator created with ID:", donator_id);
        res.status(200).json({ result: "Success", donator_id });
      }
    }
  );
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

