const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const refugeeRouter = require('./src/routes/refugee.route');
const familyRouter = require('./src/routes/family.route');
const authRouter = require('./src/routes/auth.route');
const neighborRouter = require('./src/routes/goodNeighbor.route')


app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello from our server!");
});

app.use("/auth", authRouter);
app.use('/refugee', refugeeRouter);
app.use('/family', familyRouter);
app.use('/neighbor', neighborRouter);



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




const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};



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

