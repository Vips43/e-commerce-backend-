import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./conn.js";
import products from "./models/productModel.js";
import loginSignupRoute from "./models/loginSignupModel.js";
import cwRoutes from "./models/othModels.js";
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from one level up (project root)
dotenv.config({ path: resolve(__dirname, '../.env') });

export const mongoUri = process.env.MONGO_URL || `mongodb://localhost:27017/usersDB`;


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB(mongoUri);

app.use("/product", products);

app.use("/auth", loginSignupRoute);

app.use("/user", cwRoutes);

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
