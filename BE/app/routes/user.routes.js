module.exports = app => {

    const users = require("../controllers/user.controller.js");
  
    app.post("/user/login", users.login);

    app.post("/user/signup", users.signup);

    app.post("/user/auth", users.auth);
    
    app.get("/user/loads", users.loads);

};