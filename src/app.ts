import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes/user.routes";
import deserializeUser from "./middleware/deserializeUser";

const port = config.get<number>("port");

const app = express();
app.use(express.json());

app.use(deserializeUser);
app.listen(port, async () => {
    logger.info(`app running on port ${port}`);
    await connect();
    routes(app);
});
