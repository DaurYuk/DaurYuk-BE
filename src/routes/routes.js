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

// Get Profile Information
exports.getProfileInformation = async (req, res) => {
    try {
      const { id } = req.token;
      const user = await getUserDataFromFirestore(id);
  
      if (!user) {
        return sendError(res, 404, 'User not found');
      }
  
      // Remove sensitive information from user object before sending it to the client
      const { password, ...userProfile } = user;
  
      return sendSuccess(res, 200, userProfile);
    } catch (error) {
      return sendError(res, 500, 'Internal server error');
    }
  };

module.exports = app;