const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const serverRoute = require("./routes/server.route")
const cookieParser = require("cookie-parser")

const app = express();

// middleware and packages
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Routing
app.use("/api/v1", serverRoute);

// port
const port = process.env.PORT || 5000;

// Database Connection
const connectToMongoDB = () => {
  console.log("connecting to MongoDB...");
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGO_DB_ATLAS, {
      dbName: "Post-it-app",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully Connected to MongoDB!");
    })
    .catch((err) => {
      console.log(err);
      console.log("An error occurred while connecting to MongoDB");
    });
};
connectToMongoDB();

// endpoints promise
mongoose.Promise = global.Promise;
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).json({ message: "An error occurred" });
});

// listen for connections
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});