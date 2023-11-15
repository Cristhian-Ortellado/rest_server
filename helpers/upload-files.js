const { v4: uuidv4 } = require("uuid");
const path = require("path");

const uploadFileHelper = (
  files,
  validateExtension = ["png", "jpg", "jpeg", "gif"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const cutName = file.name.split(".");
    const extension = cutName[cutName.length - 1];

    // validate extension
    if (!validateExtension.includes(extension)) {
      return reject(`Invalid extension - should be ${validateExtension}`);
    }

    const tempName = uuidv4() + "." + extension;
    uploadPath = path.join(__dirname, "../uploads/", folder, tempName);

    // Use the mv() method to place the file somewhere on your server
    file.mv(uploadPath, function (err) {
      if (err) {
        return reject(err);
      }

      resolve(uploadPath);
    });
  });
};

module.exports = {
    uploadFileHelper,
};
