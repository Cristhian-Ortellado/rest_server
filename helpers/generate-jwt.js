const jwt = require("jsonwebtoken");
const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.secret_key,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);

          reject("Wasn't able to generate token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
module.exports = {
  generateJWT,
};
