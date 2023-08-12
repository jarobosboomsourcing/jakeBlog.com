const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();

//connect to mongDB
const dbURI =
  "mongodb+srv://robosajakealdrin:jake123@cluster0.jmgmxv2.mongodb.net/JakeNodeTutorials";
mongoose
  .connect(dbURI)
  .then(() => app.listen(3000)) // listen for requests in port 3000
  .catch((err) => console.log(`ERROR: ${err}`));

//view engine
app.set("view engine", "ejs");

// middleware & static files like css and images
// inorder to access the static files we can use the express.static('folder_name')
app.use(express.static("public"));

// middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  // res.send("<p>My home page</p>");
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  // res.send("<p>About page</p>");
  // res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "My Blog" });
});

//blog routes
app.use("/blogs", blogRoutes);

//404 page
// the use() will run in every request as long as the request has a match above the use() will not run
// parang sya yung catch na pag di nag match sa iba didirekta na kay use()
// and should always be at the bottom
app.use((req, res) => {
  res.render("404", { title: "My Blog" });
});
