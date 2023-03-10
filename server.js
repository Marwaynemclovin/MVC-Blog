const express = require("express");
const session = require("express-session");
const routes = require("./routes");
// import sequelize connection
const sequelize = require("./config/connection");
const app = express();
const PORT = process.env.PORT || 3001;
// we are creating a place to store our sessions.
const sequelizeStore = require("connect-session-sequelize")(session.Store);

// create new variable
const options = {
  secret: "marwayne123", // this is a secret key for encrypting the session ID
  cookie: {}, // an empty object that will be populated with session cookie options
  resave: false, // this specifies whether to save the session store if it wasn't modified during the request
  saveUninitialized: true, // this specifies whether to save the session store if it wasn't created during the request
  store: new sequelizeStore({
    db: sequelize, // this sets up the session store to use Sequelize to persist the session data
  }),
};

// this is how we implement the session
app.use(session(options));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(routes);

// sync sequelize models to the database, then turn on the server
// Not resetting database
// this is how we connect the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening at port http://localhost:${PORT}`);
  });
});

// How To Run //
// npm i in server.js file
// input root and pw into .env file
// npm run seed -> for both json files
// mysql -u root -p for schema.sql
// source schema.sql
// npm start || node server in server.js file
// npm i express-session connect-session-sequelize
