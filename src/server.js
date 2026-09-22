require("dotenv").config();
const app = require("./app");
const { onUnhandledRejection } = require("./serverHandlers/onUnhandledRejection");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Banking system API running on port ${PORT}`);
});

process.on("unhandledRejection", onUnhandledRejection);
