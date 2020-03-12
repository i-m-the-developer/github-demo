const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
//models
const usersRoutes = require("./routes/api/users.routes");
const usersAuthRoutes = require("./routes/api/auth.routes");
const jobsRoutes = require("./routes/api/jobs.routes");
const app = express();

//Bodyparser Middleware
app.use(express.json());

//DB config
const db = process.env.mongoURI;//config.get("mongoURI");//

//Connect to Mongo DB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Mongo DB connected......."))
  .catch(err => console.log(err));

//User routes
app.use("/api/users", usersRoutes);
app.use("/api/jobs",jobsRoutes);
app.use("/api/auth",usersAuthRoutes);


//Serve static assest if in production : build folder index.html. Another words if not hitting the server api('/api/items')
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html")); // using the node path varaible to get path and set the static directory structure for serving index.html
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port `, PORT);
});
