const { response } = require("express");
const User = require("../models/user");

exports.createUser = (request, response, next) => {
  const user = new User({
    name: request.body.name,
    email: request.body.email,
    phone_number: request.body.phone_number,
    document: request.body.document,
  });
  User.findOne({ email: request.body.email }, (error, user) => {
    if (user != null) {
      return response.status(400).send({
        message: "Email already registered in the system.",
      });
    }
  });
  user.setPassword(request.body.password);
  user
    .save()
    .then((result) => {
      response.status(201).json({
        message: "Item added succesfully",
        data: {
          id: result._id,
          name: result._doc.name,
          email: result._doc.email,
          phone_number: result._doc.phone_number,
          document: result._doc.document,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        message: "Fail to create item",
      });
    });
};

exports.getUsers = (request, response, next) => {
  const pageSize = +request.query.pagesize;
  const currPage = +request.query.page;
  const userQuery = User.find();
  let fetchedUser;
  let formatedUsers = [];
  if (pageSize && currPage) {
    userQuery.skip(pageSize * (currPage - 1)).limit(pageSize);
  }
  userQuery
    .then((result) => {
      fetchedUser = result;
      for (let user in fetchedUser) {
        console.log(user);
      }
      return User.countDocuments();
    })
    .then((count) => {
      response.status(200).json({
        message: "All items fetched 200",
        data: formatedUsers,
        maxPosts: count,
      });
    });
};

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

exports.getById = (request, response, next) => {
  User.findById(request.query.id, (err, result) => {
    if (result === null) {
      return response.status(404).send({
        message: "User not found!",
      });
    } else {
      response.status(200).send({
        message: "User fetched succesfully.",
        data: {
          id: result._id,
          name: result._doc.name,
          email: result._doc.email,
          phone_number: result._doc.phone_number,
          document: result._doc.document,
        }
      });
    }
  });
};
