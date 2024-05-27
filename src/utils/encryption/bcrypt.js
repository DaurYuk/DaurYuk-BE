const bcrypt = require('bcryptjs');

function encryptPassword(password) {
  return bcrypt.genSalt(10)
    .then((salt) => bcrypt.hash(password, salt))
    .then(hash => hash)
    .catch(err => err)
};

function verifyPassword(password, hashPwd) {
  return bcrypt.compare(password, hashPwd)
    .then(correct => correct);
}

module.exports = {
  encryptPassword,
  verifyPassword
}