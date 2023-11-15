const { Category, Product } = require("../models");
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

const categoryByIdExists = async (id) => {
  //check the category exists
  const categoryExists = await Category.findById(id);

  if (!categoryExists) {
    throw new Error(`Category doesn't exists`);
  }
};

const categoryNameShouldBeUnique = async (name) => {
  //check if name category already exists
  const category = await Category.findOne({ name });

  if (category) {
    throw new Error(`Category already exists`);
  }
};

const productByIdExists = async (id) => {
  //check the product exists
  const productExists = await Product.findById(id);

  if (!productExists) {
    throw new Error(`Product doesn't exists`);
  }
};

const productNameShouldBeUnique = async (name) => {
  //check if name product already exists except the
  const product = await Product.findOne({ name });

  if (product) {
    throw new Error(`Product with name ${name} already exists`);
  }
};

const valideCollection = (collection = "", validCollections = []) => {
  const valid = validCollections.includes(collection);

  if (!valid) {
    throw new Error(`Collection ${collection} is invalid - ${validCollections}`)
  }
  
  return true;
};

module.exports = {
  isValidRole,
  emailExists,
  userByIdExists,
  categoryByIdExists,
  categoryNameShouldBeUnique,
  productByIdExists,
  productNameShouldBeUnique,
  valideCollection
};
