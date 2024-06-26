const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const refugeeRouter = require('./src/routes/refugee.route');
const familyRouter = require('./src/routes/family.route');
const authRouter = require('./src/routes/auth.route');
const geocodeRouter = require('./src/routes/geocode.route');
const neighborRouter = require('./src/routes/goodNeighbor.route')
const donationRouter = require('./src/routes/donation.route')
const userRouter = require('./src/routes/user.route')
const donatorRouter = require('./src/routes/donator.route')
const requestRouter = require('./src/routes/requests.route')
const notesRouter = require('./src/routes/notes.route')
const statisticsRouter = require('./src/routes/statistics.route')
const prototypeRouter = require('./src/routes/prototypes.route')



const session = require("express-session");
const cors = require("cors");

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Welcome To Oasis API!");
});

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8080"],
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(session({
    secret: "1qGzaT2IpNaCWB1siRvh7nVT2JIUyQUU", //this needs to be moved offline in future versions
    resave: false,
    saveUninitialized: true,
}))

app.use("/auth", authRouter);
app.use("/requests", requestRouter);
app.use('/geocode', geocodeRouter);
app.use('/refugee', refugeeRouter);
app.use('/family', familyRouter);
app.use('/neighbor', neighborRouter);
app.use('/donation', donationRouter);
app.use('/user', userRouter);
app.use('/donator', donatorRouter);
app.use('/notes', notesRouter);
app.use('/statistics', statisticsRouter);



app.get('/cors', (req, res) => {
  res.send({ "msg": "This has CORS enabled 🎈" })
  })

app.listen(8080, () => {
  console.log("Welcome To Oasis API");
});

/* Add this later to make sure we are safe. 
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

*/
