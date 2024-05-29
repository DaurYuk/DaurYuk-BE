// Express dependency
const express = require('express');

// Middlwares
const log = require('../middlewares/log');

// Routes
const ping = require('../controllers/misc/ping');
const SignupController = require('../controllers/user/signup');

const app = express();

app.use(log);
app.use(express.json());

// Ping
app.get('/ping', ping);

// User Credentials
app.post('/register', SignupController);

module.exports = app;