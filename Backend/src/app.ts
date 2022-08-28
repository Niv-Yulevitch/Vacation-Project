import express from "express";
import cors from "cors"
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import expressFileUpload from "express-fileupload";
import authController from "./6-controllers/auth-controller";
import vacationsController from "./6-controllers/vacations-controller";
import config from "./2-utils/config";


const server = express();

server.use(cors());

server.use(express.json());

server.use(expressFileUpload());

server.use("/", authController);
server.use("/", vacationsController);

server.use("*", routeNotFound);

server.use(catchAll);

server.listen(config.port, () => console.log("Listening on http://localhost:" + config.port));