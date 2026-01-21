import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";

import CategoryRoutes from "./Routes/CategoryRoutes";
import ProductRoutes from "./Routes/ProductRoutes";
import CartRoutes from "./Routes/CartRoutes";
import AuthRoutes from "./Routes/AuthRoutes";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import adminRoutes from "./Routes/adminRoutes";

dotenv.config();

const app = express();
const port=4000;

connectDB();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", AuthRoutes);
app.use("/api/categories", CategoryRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/carts", CartRoutes);
app.use("/api/admin", adminRoutes);
export default app;

app.listen(port, () => {
  console.log("API is running");
  console.log(`Server is running on port ${port}`);
});


