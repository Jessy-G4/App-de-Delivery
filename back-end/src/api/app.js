const cors = require('cors');
const express = require('express');
<<<<<<< HEAD
const productsRoutes = require('../routes/productsRoutes');
=======
const cors = require('cors');
>>>>>>> main-group-18
const userRoute = require('../routes/user.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors());

app.use('/user', userRoute);
app.use('/products', productsRoutes);
app.use(express.static('images'));

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
