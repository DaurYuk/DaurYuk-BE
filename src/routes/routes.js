// npm Packages dependency
const express = require('express');
const { checkSchema, query } = require('express-validator');
const multer = require('multer');
const upload = multer();

// Middlwares
const log = require('../middlewares/log');
const AuthorizationMiddleware = require('../middlewares/user/authorization');

// Routes
const jwt = require('jsonwebtoken');
const ping = require('../controllers/misc/ping');
const SignupController = require('../controllers/user/signup');
const VerifyAccountController = require('../controllers/user/verify_account');
const LoginController = require('../controllers/user/login');
const ImageDetectionController = require('../controllers/detection/detect');
const GetDetectionHistoryController = require('../controllers/detection/history');
const SetProfileController = require('../controllers/user/profile');
const { GetArticlesListController, GetArticleController } = require('../controllers/article/get_article');


// JSON Body Validation Schemas
const UserCredentialSchema = require('../utils/schemas/UserCredentialSchema');
const RegisterSchema = require('../utils/schemas/RegisterSchema');
const getUserProfile = require('../controllers/user/getprofile');

const app = express();

app.use(log);
app.use(express.json());

// Ping
app.get('/ping', ping);

// User Credentials
app.post('/register', checkSchema(RegisterSchema), SignupController);
app.get('/verify-account', query('token').notEmpty(), VerifyAccountController);
app.post('/login', checkSchema(UserCredentialSchema), LoginController);

// Image Detection
app.post('/detect', AuthorizationMiddleware, upload.single('image'), ImageDetectionController);
app.get('/detect-history', AuthorizationMiddleware, GetDetectionHistoryController);

// Articles
app.get('/articles', GetArticlesListController);
app.get('/article/:id', GetArticleController)

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