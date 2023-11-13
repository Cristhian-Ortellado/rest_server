const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth.controller");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares");

const router = Router();

// get all categories - public
router.get("/", (req, res) => {
  res.json("Todo ok");
});

// get a single catefory - public
router.get("/:id", (req, res) => {
  res.json("get");
});

// store a single category - private
router.post(
  "/",
  [validateJWT, check("name").not().isEmpty(), validateFields],
  (req, res) => {
    res.json("post");
  }
);

// update a single category - private
router.put("/:id", (req, res) => {
  res.json("put");
});

// delete a single category - private
router.delete("/:id", (req, res) => {
  res.json("delete");
});

module.exports = router;
