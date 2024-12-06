const bcrypt = require('bcryptjs');

const users = [
  {
    username: "Anthony Yang",
    password: bcrypt.hashSync("12345", 10)
  }
];

module.exports = users;
