const User = require("../models/user");

exports.loginUser = (request, response, next) => {
  User.findOne({ email: request.body.email }, (err, user) => {
    if (user === null) {
      return response.status(404).send({
        message: "User not found.",
      });
    } else {
      if (user.validPassword(request.body.password)) {
        return response.status(201).send({
          message: "User Logged In",
        });
      } else {
        return response.status(400).send({
          message: "Wrong Password",
        });
      }
    }
  });
};
