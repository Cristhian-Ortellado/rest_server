const { response } = require("express");
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");

const usersGet = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  //get users
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

const usersPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //hash password
  user.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync());

  //save in db`
  await user.save();

  res.json({
    user: user,
  });
};

const usersPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, email, ...fields } = req.body;

  // TODO validate db
  if (password) {
    // hash password
    fields.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync());
  }

  const user = await User.findByIdAndUpdate(id, fields);
  res.json({
    message: "User Updated",
    user,
  });
};

const usersPatch = (req, res = response) => {
  res.json({
    message: "Controlador",
  });
};

const usersDelete = async (req, res = response) => {
  const { id } = req.params;

  //delete user
  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json(user);
};

module.exports = {
  usersGet,
  usersDelete,
  usersPatch,
  usersPost,
  usersPut,
};
