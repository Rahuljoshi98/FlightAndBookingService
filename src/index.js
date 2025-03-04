const express = require("express");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");

const app = express();

app.use("/api", apiRoutes);

try {
  const startService = async () => {
    // const app = express();
    app.listen(ServerConfig.PORT, (req, res) => {
      console.log(`server is running in port ${ServerConfig.PORT}`);
    });
  };

  startService();
} catch (error) {
  console.log("error while starting the service --->", error.message);
}
