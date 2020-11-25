const User = require("../models/user.model.js");

 
exports.login = (req, res) => {
  console.log("===========login===========");

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "400 Bad Request"
    });
  }
  console.log(req.body);

  // get parameter
  const user = new User({username: req.body.username, password: req.body.password});

  User.login(user, (status, message, data) => {
    res.status(status).send({
      data: data,
      message: message
    });
  });
  
  console.log("===========login===========");
};


exports.signup = (req, res) => {
  console.log("===========signup===========");

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "400 Bad Request"
    });
  }
  console.log(req.body);

  // get parameter
  const user = new User({username: req.body.username, password: req.body.password, mail: req.body.mail});

  User.signup(user, (status, message, data) => {
    res.status(status).send({
      data: data,
      message: message
    });
  });
  
  console.log("===========signup===========");
};


exports.auth = (req, res) => {
  console.log("===========auth===========");

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "400 Bad Request"
    });
  }
  console.log(req.body);

  // get parameter
  const user = new User({mail: req.body.mail, hash: req.body.hash});
  User.auth(user, (status, message, data) => {
    res.status(status).send({
      data: data,
      message: message
    });
  });
  
  console.log("===========auth===========");
};

exports.loads = (req, res) => {
  console.log("===========loads===========");

  User.loads((status1, message, data) => {
    res.status(status1).send({
      data: data,
      message: message
    });
  });
  
  console.log("===========loads===========");
};
