const express = require('express');
const app = express();
const port = process.env.PORT || 5000; // The port value can change according to the environment);
const db = require('./config/database');
const routes = require('./routes/routes');
const mongoose = require('mongoose');

const dbName = 'gps-project-database';
const uri = `mongodb+srv://admin:admin@cluster0.ebqtm.mongodb.net/${dbName}?retryWrites=true&w=majority`;

/* Initialize middlewares */
const logger = require('./middlewares/logger');
const cors = require('cors');

app.use(express.json()); // Allows to parse json body
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(cors()); // Add an 'Allow Origins' header for every response

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

/* Connect to the database */
db.connect(() => {

     /* Listening in a port */
     app.listen(port, () => console.log("[index] server started on port " + port));

     app.use(routes);
     /* Routes */
     app.get("/", (req, res) => {
          res.send('Root element. New Verion.');
     });
 }); 










