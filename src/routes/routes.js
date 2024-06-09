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
const GetUserProfileController = require('../controllers/user/profile');
const { GetArticlesListController, GetArticleController } = require('../controllers/article/get_article');


// JSON Body Validation Schemas
const UserCredentialSchema = require('../utils/schemas/UserCredentialSchema');
const RegisterSchema = require('../utils/schemas/RegisterSchema');
const UpdateRewardsBalanceController = require('../controllers/rewards/update');

const app = express();

app.use(log);
app.use(express.json());

// Ping
app.get('/ping', ping);

// User Credentials
app.post('/register', checkSchema(RegisterSchema), SignupController);
app.get('/verify-account', query('token').notEmpty(), VerifyAccountController);
app.post('/login', checkSchema(UserCredentialSchema), LoginController);

// User Profile
app.get('/profile', AuthorizationMiddleware, GetUserProfileController)

// Image Detection
app.post('/detect', AuthorizationMiddleware, upload.single('image'), ImageDetectionController);
app.get('/detect-history', AuthorizationMiddleware, GetDetectionHistoryController);
app.get('/rewards-balance', AuthorizationMiddleware, query('point').isNumeric().withMessage('Please input with valid number'), UpdateRewardsBalanceController);

// Articles
app.get('/articles', GetArticlesListController);
app.get('/article/:id', GetArticleController)


module.exports = app;