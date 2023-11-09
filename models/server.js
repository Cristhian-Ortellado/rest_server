const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.usuariosPath = "/api/users";
    this.authPath = "/api/auth";

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
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth.routes"));

    this.app.use(this.usuariosPath, require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Running app on port: ${this.port}`);
    });
  }
}
module.exports = Server;
