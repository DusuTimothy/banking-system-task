require("dotenv").config();
const app = require("./app");
const { onListen } = require("./serverHandlers/onListen");
const { onUnhandledRejection } = require("./serverHandlers/onUnhandledRejection");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => onListen(PORT));

process.on("unhandledRejection", onUnhandledRejection);
