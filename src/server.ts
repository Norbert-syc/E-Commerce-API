import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import connectDB from "./config/database";
import swaggerSpec from './config/swagger';

import CategoryRoutes from "./Routes/CategoryRoutes";
import ProductRoutes from "./Routes/ProductRoutes";
import CartRoutes from "./Routes/CartRoutes";
import AuthRoutes from "./Routes/AuthRoutes";
import adminRoutes from "./Routes/adminRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectDB();

app.get("/api", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", AuthRoutes);
app.use("/api/categories", CategoryRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/carts", CartRoutes);
app.use("/api/admin", adminRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;