import express from "express";
import { ENV } from "./src/constants/config";
import cors from "cors";
import routes from "./src/routes";
import path from "path";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/uploads", express.static(path.resolve("./app/v1/src/uploads")))
app.use("/api/uploads/seed", express.static(path.resolve("./app/v1/src/uploads/seed")))

app.use("/api", routes);

app.listen(ENV.PORT, () => console.log(`Server is running on http://localhost:${ENV.PORT}/`));