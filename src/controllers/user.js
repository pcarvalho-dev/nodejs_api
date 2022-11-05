const { response } = require("express");
const User = require("../models/user");

exports.createUser = (request, response, next) => {
  const user = new User({
    name: request.body.name,
    email: request.body.email,
    phone_number: request.body.phone_number,
    document: request.body.document,
  });
  User.findOne({ email: request.body.email }, (err, result) => {
    if (result != null) {
      return response.status(400).send({
        message: "Email already registered in the system.",
      });
    } else {
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
    }
  });
};

exports.getUsers = (request, response, next) => {
  const pageSize = +request.query.pagesize;
  const currPage = +request.query.page;
  const userQuery = User.find();
  if (pageSize && currPage) {
    userQuery.skip(pageSize * (currPage - 1)).limit(pageSize);
  }
  userQuery.then((users) => {
    response.status(200).json({
      message: "All items fetched 200",
      data: users,
      maxPosts: users.length,
    });
  });
};

exports.getById = (request, response, next) => {
  User.findById(request.params.id, (err, result) => {
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
        },
      });
    }
  });
};

exports.deleteUser = (request, response, next) => {
  User.deleteOne({ id: request.params.id }).then((response) => {
    response.status(200).send({
      message: `User deleted!`,
    });
  });
};
