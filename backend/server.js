import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./conn.js";
import products from "./models/productModel.js";
import loginSignupRoute from "./models/loginSignupModel.js";
import cwRoutes from "./models/othModels.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use("/product", products);

app.use("/auth", loginSignupRoute);

app.use("/user", cwRoutes);

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
