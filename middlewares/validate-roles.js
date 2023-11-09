const { response, request } = require("express");

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Trying to validate role before token validation",
    });
  }

  const { role, name } = req.user;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} is no an admin - forbidden`,
    });
  }

  next();
};

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Trying to validate role before token validation",
      });
    }

    const { role, name } = req.user;

    if (!roles.includes(role)) {
      return res.status(401).json({
        msg: `${name} doesn't have the required role`,
      });
    }
    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};
