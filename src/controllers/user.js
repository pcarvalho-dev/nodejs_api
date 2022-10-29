const User = require("../models/user");

exports.createUser = (request, response, next) => {
  const user = new User({
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
    phone_number: request.body.phone_number,
    document: request.body.document,
  });
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
  if (pageSize && currPage) {
    userQuery.skip(pageSize * (currPage - 1)).limit(pageSize);
  }
  userQuery
    .then((doc) => {
      fetchedUser = doc;
      return User.countDocuments();
    })
    .then((count) => {
      response
        .status(200)
        .json({
          message: "All items fetched 200",
          posts: fetchedUser,
          maxPosts: count,
        });
    });
};
