const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
    });
    mongoose.set("returnOriginal", false);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
