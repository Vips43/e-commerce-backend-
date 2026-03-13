import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./conn.js";
import products from "./models/productModel.js";
import cwRoutes from "./models/othModels.js";
import authRoutes from "./models/authModel.js";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config()
const mongoUri = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB(mongoUri);

app.use("/product", products);

app.use("/auth", authRoutes);

app.use("/user", cwRoutes);

app.listen(port, () => {
  console.log(`Backend running at http://localhost: ${port}`);
});
