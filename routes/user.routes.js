const { Router } = require("express");
const {
  usersGet,
  usersPost,
  usersPatch,
  usersDelete,
  usersPut,
} = require("../controllers/users.controller");
const { check } = require("express-validator");
const Role = require("../models/role.model");

const {
  isValidRole,
  emailExists,
  userByIdExists,
} = require("../helpers/db-validators");

const {
  validateFields,
  validateJWT,
  isAdminRole,
  hasRole,
} = require("../middlewares");

const router = Router();

router.get("/", usersGet);

router.post(
  "/",
  [
    check("email", "Invalid Email").isEmail(),
    check("email").custom(emailExists),
    check("password", "Password should have a min of 6 characters").isLength({
      min: 6,
    }),
    check("name", "Name field is required").not().isEmpty(),
    check("role").custom(isValidRole),
    validateFields,
  ],
  usersPost
);

router.put(
  "/:id",
  [
    check("id", "It is not a valid ID").isMongoId(),
    check("id").custom(userByIdExists),
    check("role").custom(isValidRole),
    validateFields,
  ],
  usersPut
);

router.patch("/", usersPatch);

router.delete(
  "/:id",
  [
    validateJWT,
    // isAdminRole,
    hasRole("ADMIN_ROLE", "SALES_ROLE"),
    check("id", "It is not a valid ID").isMongoId(),
    check("id").custom(userByIdExists),
    validateFields,
  ],
  usersDelete
);

module.exports = router;
