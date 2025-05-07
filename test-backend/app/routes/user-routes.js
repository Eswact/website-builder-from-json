const user = require("../controllers/user-controller.js");
const endpoints= [  
    { method: "post", path: "register", func: user.register },
    { method: "post", path: "login", func: user.login },
    { method: "post", path: "logout", func: user.logout },
    { method: "post", path: "auth-control", func: user.authControl },
]

module.exports = endpoints;