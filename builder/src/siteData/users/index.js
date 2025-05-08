const login = require('./login/index.js');
const logout = require('./logout/index.js');
const register = require('./register/index.js');

const users = {
    "active": true,
    "cookieSession": true,
    "cookieSessionControlUrl": "http://localhost:3000/api/user/auth-control",
    "defaultUsers": [],
    "login": login,
    "logout": logout,
    "register": register,
};

module.exports = users;