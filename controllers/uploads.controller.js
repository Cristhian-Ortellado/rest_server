const { response, request } = require("express");
const { uploadFileHelper } = require("../helpers/upload-files");
const { User, Product } = require("../models");
const path = require("path");
const fs = require("fs");

const cloudinary = require("cloudinary");

cloudinary.config(process.env.CLOUDINARY_URL);

const uploadFile = async (req, res = response) => {
  try {
    const pathFile = await uploadFileHelper(req.files);
  } catch (error) {
    res.status(400).json({
      msg: error,
    });
  }

  res.json({
    msg: pathFile,
  });
};

const updateImage = async (req, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);

      if (!model) {
        return res.status(400).json({
          msg: `User with id ${id} doesn't exists`,
        });
      }
      break;

    case "products":
      model = await Product.findById(id);

      if (!model) {
        return res.status(400).json({
          msg: `Product with id ${id} doesn't exists`,
        });
      }
      break;

    default:
      return res.status(400).json({ msg: `Something wrong` });
      break;
  }

  //clear files
  if (model.img) {
    // const pathImage = path.join(__dirname,'../uploads',collection,model.img)
    const pathImage = model.img;
    if (fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage);
    }
  }

  // console.log(model);
  const name = await uploadFileHelper(req.files, undefined, collection);
  model.img = name;

  //save image path in the model
  await model.save();

  return res.status(200).json({
    model,
  });
};

const showImage = async (req = request, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);

      if (!model) {
        return res.status(400).json({
          msg: `User with id ${id} doesn't exists`,
        });
      }
      break;

    case "products":
      model = await Product.findById(id);

      if (!model) {
        return res.status(400).json({
          msg: `Product with id ${id} doesn't exists`,
        });
      }
      break;

    default:
      return res.status(400).json({ msg: `Something wrong` });
      break;
  }

  
  if (model.img) {
    // return res.sendFile(model.img);
    return res.json({
      url:model.img
    });
  }

  return res.json({
    msg: `Place holder is missing`,
  });
};

const updateImageCloudinary = async (req, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);

      if (!model) {
        return res.status(400).json({
          msg: `User with id ${id} doesn't exists`,
        });
      }
      break;

    case "products":
      model = await Product.findById(id);

      if (!model) {
        return res.status(400).json({
          msg: `Product with id ${id} doesn't exists`,
        });
      }
      break;

    default:
      return res.status(400).json({ msg: `Something wrong` });
      break;
  }

  //clear files
  if (model.img) {
    const nameArr = model.img.split("/");
    const name = nameArr[nameArr.length - 1];
    const [public_id] = name.split(".");
    console.log(public_id);
    //remove from cloudinary
    cloudinary.uploader.destroy(public_id);
  }

  //upload file to cloudinary
  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  model.img = secure_url;

  //save image path in the model
  await model.save();

  return res.status(200).json({
    model,
  });
};

module.exports = {
  uploadFile,
  updateImage,
  showImage,
  updateImageCloudinary,
};
