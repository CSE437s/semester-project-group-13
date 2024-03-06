const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const app = express();
const refugeeRouter = require("./src/routes/refugee.route");
const familyRouter = require("./src/routes/family.route");
const authRouter = require("./src/routes/auth.route");
const neighborRouter = require("./src/routes/goodNeighbor.route");
const donationRouter = require("./src/routes/donation.route");

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8080"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options('*', cors());

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello from our server!");
});

app.use("/auth", authRouter);
app.use("/refugee", refugeeRouter);
app.use("/family", familyRouter);
app.use("/neighbor", neighborRouter);
app.use("/donation", donationRouter);

app.use(
  session({
    secret: "1qGzaT2IpNaCWB1siRvh7nVT2JIUyQUU", //this needs to be moved offline in future versions
    resave: false,
    saveUninitialized: true,
  })
);

app.listen(8080, () => {
  console.log("server listening on port 8080");
});

/* Add this later to make sure we are safe. 
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

*/
