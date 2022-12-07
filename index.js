const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");
// const expressLayouts = require("express-ejs-layouts");
const passport = require("./middleware/passport");
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");
const reminderController = require("./controllers/reminder_controller");
const authController = require("./controllers/auth_controller");

// app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.set("view engine", "ejs");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(express.json());
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log(req.session.passport);
  next();
});


//Routes start here

app.get("/reminders", reminderController.list);

app.get("/reminder/new", reminderController.new);

app.get("/reminder/:id", reminderController.listOne);

app.get("/reminder/:id/edit", reminderController.edit);

app.post("/reminder/", reminderController.create);

// Implement this yourself
app.post("/reminder/update/:id", reminderController.update);

// Implement this yourself
app.post("/reminder/delete/:id", reminderController.delete);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.

app.use("/", indexRoute)
app.use("/auth", authRoute)


app.use("/auth", authController.register);
app.use("/auth", authController.login);
app.use("/auth", authController.registerSubmit);
app.use("/auth", authController.loginSubmit); 

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
