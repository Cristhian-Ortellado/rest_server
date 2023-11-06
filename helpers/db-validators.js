const Role = require("../models/role.model");
const User = require("../models/user.model");

const isValidRole = async (role = "") => {
  const roleExists = await Role.findOne({ role });

  if (!roleExists) {
    throw new Error(`Role ${role} doesn\'t exists`);
  }
};

const emailExists = async (email) => {
  //check if email exists
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    throw new Error(`Email already exists`);
  }
};

const userByIdExists = async (id) => {
  //check the user exists
  const userExists = await User.findById(id);

  if (!userExists) {
    throw new Error(`User doesn't exists`);
  }
};

module.exports = {
  isValidRole,
  emailExists,
  userByIdExists,
};
