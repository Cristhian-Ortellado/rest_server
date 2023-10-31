const { response } = require("express");
const usersGet = (req, res = response) => {
  res.json({
    message: "Controlador",
  });
};

const usersPost = (req, res = response) => {
  const body = req.body;
  res.json({
    message: "Controlador",
    body: body,
  });
};

const usersPut = (req, res = response) => {
  const id = req.params.id;
  res.json({
    message: "Controlador",
    id: id,
  });
};

const usersPatch = (req, res = response) => {
  res.json({
    message: "Controlador",
  });
};

const usersDelete = (req, res = response) => {
  res.json({
    message: "Controlador",
  });
};

module.exports = {
  usersGet,
  usersDelete,
  usersPatch,
  usersPost,
  usersPut,
};
