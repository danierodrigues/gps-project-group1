const express = require('express');
const app = express();
const port = process.env.PORT || 5000; // The port value can change according to the environment);
const db = require('./database');

/* Initialize middlewares */
const logger = require('./middlewares/logger');
const cors = require('cors');

app.use(express.json()); // Allows to parse json body
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(cors()); // Add an 'Allow Origins' header for every response

/* Connect to the database */
db.connect(() => {

     /* Listening in a port */
     app.listen(port, () => console.log("[index] server started on port " + port));

     /* Routes */
     app.get("/", (req, res) => {
          res.send('Root element');
     });
 });








