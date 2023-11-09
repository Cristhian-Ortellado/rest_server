const { response } = require("express");
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //verify if email exosts
    const user = await User.findOne({ email }).where({ state: true });
    if (!user) {
      return res.status(400).json({
        msg: "Invalid Credentials 1",
      });
    }

    //valid password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Invalid Credentials 2",
      });
    }

    //generate token
    const token = await generateJWT(user.id);
    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Something bad happens",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, img, email } = await googleVerify(id_token);

    //verify if the email exists
    let user = await User.findOne({ email });

    if (!user) {
      //create user
      const fields = {
        name,
        email,
        password: "__", //doesn't matter because we are using sign-in
        img,
        role: "USER_ROLE",
        google: true,
      };
      user = new User(fields);

      //store user
      await user.save();
    }

    //if user was deleted reject request
    if (!user.state) {
      return res.status(401).json({
        msg: "Please Contact administrator, this user is blocked",
      });
    }

    //generate token
    const token = await generateJWT(user.id);

    res.json({
      msg: "OK",
      token,
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: "Server was not able to verify the token",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
