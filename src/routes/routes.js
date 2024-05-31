// Express dependency
const express = require('express');
const { checkSchema, query } = require('express-validator');

// Middlwares
const log = require('../middlewares/log');

// Routes
const ping = require('../controllers/misc/ping');
const SignupController = require('../controllers/user/signup');
const VerifyAccountController = require('../controllers/user/verify_account');
const LoginController = require('../controllers/user/login');

// JSON Body Validation Schemas
const userCredentialSchema = require('../utils/schemas/UserCredentialSchema');

const app = express();

app.use(log);
app.use(express.json());

// Ping
app.get('/ping', ping);

// User Credentials
app.post('/register', checkSchema(userCredentialSchema), SignupController);
app.get('/verify-account', query('token').notEmpty(), VerifyAccountController);
app.post('/login', checkSchema(userCredentialSchema), LoginController);

module.exports = app;