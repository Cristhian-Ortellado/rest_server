const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("../database/config");
const fileUpload = require('express-fileupload')

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      categories: "/api/categories",
      users: "/api/users",
      products:"/api/products",
      search: "/api/search",
      upload: "/api/uploads"
    };

    //connect database
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Parse and read body
    this.app.use(express.json());

    // public directory
    this.app.use(express.static("public"));

    // file upload
    this.app.use(fileUpload({
      useTempFiles:true,
      tempFileDir:'/tmp/',
      //be careful 
      createParentPath: true
    }));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth.routes"));
    this.app.use(this.paths.categories, require("../routes/categories.routes"));
    this.app.use(this.paths.users, require("../routes/user.routes"));
    this.app.use(this.paths.products, require("../routes/products.routes"));
    this.app.use(this.paths.search, require("../routes/search.routes"));
    this.app.use(this.paths.upload, require("../routes/uploads.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Running app on port: ${this.port}`);
    });
  }
}
module.exports = Server;
