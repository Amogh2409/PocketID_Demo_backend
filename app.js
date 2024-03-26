const express = require('express');
const UserRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use("/", UserRoutes);  //  http://localhost:3000/register

module.exports = app;