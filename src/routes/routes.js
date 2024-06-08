// Express dependency
const express = require('express');
const { checkSchema, query } = require('express-validator');


// Middlwares
const log = require('../middlewares/log');

// Routes
const jwt = require('jsonwebtoken');
const ping = require('../controllers/misc/ping');
const SignupController = require('../controllers/user/signup');
const VerifyAccountController = require('../controllers/user/verify_account');
const LoginController = require('../controllers/user/login');


// JSON Body Validation Schemas
const userCredentialSchema = require('../utils/schemas/UserCredentialSchema');
const getUserProfile = require('../controllers/user/getprofile');

const app = express();

app.use(log);
app.use(express.json());

// Ping
app.get('/ping', ping);

// User Credentials
app.post('/register', checkSchema(userCredentialSchema), SignupController);
app.get('/verify-account', query('token').notEmpty(), VerifyAccountController);
app.post('/login', checkSchema(userCredentialSchema), LoginController);

//profile information
// Middleware to verify JWT and extract userId
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, 'TuKqpdm!6*%AUX!KQ&F$3rATiSTQy', (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }

          req.userId = user.id; // Assuming the payload contains user ID as `id`
          next();
      });
  } else {
      res.sendStatus(401);
  }
};

app.use(authenticateJWT);


app.get('/getprofileinformation', getUserProfile)

module.exports = app;