const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT, isAdminRole } = require("../middlewares");
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require("../controllers/products.controller");
const { categoryByIdExists, shouldBeUnique, productByIdExists, productNameShouldBeUnique } = require("../helpers/db-validators");

const router = Router();

// get all products - public
router.get("/", [
  validateFields
], getProducts);

// get a single product - public
router.get("/:id", [
  check('id').isMongoId(),
  check('id').custom(productByIdExists),
  validateFields
],getProduct);

// store a single product - private
router.post("/",
  [
    validateJWT,
    check("name").not().isEmpty(),
    check("price").isNumeric(),
    check("available").isBoolean(),
    check("categoryID").not().isEmpty(),
    check("categoryID").isMongoId(),
    check("categoryID").custom(categoryByIdExists),
    validateFields
  ],createProduct
  );

// update a single product - private
router.put("/:id",[
  validateJWT,
  check('id').isMongoId(),
  check('id').custom(productByIdExists),
  check("name").not().isEmpty(),
  check("price").isNumeric(),
  check("available").isBoolean(),
  check("categoryID").not().isEmpty(),
  check("categoryID").isMongoId(),
  check("categoryID").custom(categoryByIdExists),
  check("id").custom(productNameShouldBeUnique),
  validateFields
],updateProduct
);

// // delete a single product - private
router.delete("/:id", [
  validateJWT,
  isAdminRole,
  check('id').isMongoId(),
  check('id').custom(productByIdExists),
  validateFields
],deleteProduct);

module.exports = router;
