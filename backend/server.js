const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./database");

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
dotenv.config({path:"backend/config/config.env"});
// connecting to Database
  connectDatabase();

  const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
  });

  //Unhandled promise Rejection
process.on("unhandledRejection", (err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
      process.exit(1);
    });
});
