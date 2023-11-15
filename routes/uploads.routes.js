const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { uploadFile, updateImage, showImage, updateImageCloudinary } = require("../controllers/uploads.controller");
const { valideCollection } = require("../helpers/db-validators");
const { validateUploadFile } = require("../middlewares");

const router = Router();

router.post('/',[validateUploadFile], uploadFile);

router.put('/:collection/:id',[
  check('id').isMongoId(),
  check('collection').custom( c => valideCollection(c,['users','products'])),
  validateUploadFile,
  validateFields
], updateImageCloudinary)


router.get('/:collection/:id',[
  check('id').isMongoId(),
  check('collection').custom( c => valideCollection(c,['users','products'])),
  validateFields
],showImage)
// ],updateImageCloudinary)
module.exports = router;
