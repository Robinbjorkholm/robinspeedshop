import { createLogger, transports } from "winston";
import { MongoDB } from "winston-mongodb";

export default createLogger({
  transports: [
    new MongoDB({
      db: process.env.MONGODB,
      collection: "errorlogs",
      level: "error",
    }),
  ],
});
