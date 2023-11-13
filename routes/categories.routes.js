const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT, isAdminRole } = require("../middlewares");
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require("../controllers/categories.controller");
const { categoryByIdExists,  categoryNameShouldBeUnique } = require("../helpers/db-validators");

const router = Router();

// get all categories - public
router.get("/", [
  validateFields
], getCategories);

// get a single category - public
router.get("/:id", [
  check('id').isMongoId(),
  check('id').custom(categoryByIdExists),
  validateFields
],getCategory);

// store a single category - private
router.post("/",
  [
    validateJWT,
    check("name").not().isEmpty(),
    validateFields
  ],createCategory
  );

// update a single category - private
router.put("/:id",[
  validateJWT,
  check('id').isMongoId(),
  check('id').custom(categoryByIdExists),
  check('name').not().isEmpty(),
  check('name').custom(categoryNameShouldBeUnique),
  validateFields
],updateCategory
);

// delete a single category - private
router.delete("/:id", [
  validateJWT,
  isAdminRole,
  check('id').isMongoId(),
  check('id').custom(categoryByIdExists),
  validateFields
],deleteCategory);

module.exports = router;
