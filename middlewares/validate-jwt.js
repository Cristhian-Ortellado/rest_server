const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      msg: "token is missing",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.secret_key);

    //add uid and authenticated user to the request
    req.uid = uid;
    req.user = await User.findById(uid);

    if (!req.user) {
      return res.status(401).json({
        msg: "Invalid token - user doens't exists",
      });
    }

    //verify if user state is false
    if (!req.user.state) {
      return res.status(401).json({
        msg: "Invalid token - user was deleted",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Invalid token",
    });
  }
};

module.exports = {
  validateJWT,
};
