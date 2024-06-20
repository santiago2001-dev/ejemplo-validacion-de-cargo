const cors = require("cors");
const express = require("express");
class Server  {
    constructor(){

        this.app =  express();
        this.port = process.env.PORT || 3000;
        this.autenticationRoute = "/api/";
        this.middelwares();
        this.routes();


    }

    middelwares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ limit: "50mb" }));
      }



      routes() {
        this.app.use(this.autenticationRoute, require("../routes/consumoAPiRoutes"));
    
      }
    
      listen() {
        this.app.listen(this.port, () => {
          console.log(`Server is running on port ${this.port}`);
        });
      }
}


module.exports = Server;




