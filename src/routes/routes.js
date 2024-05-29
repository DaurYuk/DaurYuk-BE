// Express dependency
const express = require('express');
const { checkSchema, query } = require('express-validator');

// Middlwares
const log = require('../middlewares/log');

// Routes
const ping = require('../controllers/misc/ping');
const SignupController = require('../controllers/user/signup');
const VerifyAccountController = require('../controllers/user/verify_account');

// JSON Body Validation Schemas
const emailRegisterSchema = require('../utils/schemas/email');

const app = express();

app.use(log);
app.use(express.json());

// Ping
app.get('/ping', ping);

// User Credentials
app.post('/register', checkSchema(emailRegisterSchema), SignupController);
app.get('/verify-account', query('token').notEmpty(), VerifyAccountController);

module.exports = app;