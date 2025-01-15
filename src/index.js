const express = require("express");
const { PORT } = require("./config/serverConfig");

try {
  const startService = async () => {
    const app = express();
    app.listen(PORT, (req, res) => {
      console.log(`server is running in port ${PORT}`);
    });
  };

  startService();
} catch (error) {
  console.log("error while starting the service --->", error.message);
}
