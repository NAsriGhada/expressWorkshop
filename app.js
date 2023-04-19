const express = require("express");
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set the view engine to ejs
app.set("view engine", "ejs");

// use res.render to load up an ejs view file
app.get("/", (req, res) => {
  res.render("login.ejs", { message: req.query.message });
});

// Middleware to authenticate user
const authMiddleware = (req, res, next) => {
  console.log("authMiddleware called");
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  console.log(`Authenticating user ${name} with email ${email}`);
  if (name && email && password) {
    // Pass name to the home view using app.locals
    app.locals.name = name;
    console.log(`Setting app.locals.name to ${name}`);
    next();
  } else {
    res.redirect("/?message=Invalid credentials");
  }
};

// Route to handle login form submission
app.post("/login", authMiddleware, (req, res) => {
  res.redirect("/home");
});

// Route to display home page
app.get("/home", (req, res) => {
  const name = app.locals.name;
  res.render("home.ejs", { name: name });
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
