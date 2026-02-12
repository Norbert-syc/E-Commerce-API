import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import connectDB from "./config/database";
import swaggerSpec from './config/swagger';
import mongoose from "mongoose";

import CategoryRoutes from "./Routes/CategoryRoutes";
import ProductRoutes from "./Routes/ProductRoutes";
import CartRoutes from "./Routes/CartRoutes";
import AuthRoutes from "./Routes/AuthRoutes";
import adminRoutes from "./Routes/adminRoutes";
import orderRoutes from "./Routes/orderRoutes";


dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: true, // allow all origins dynamically
    credentials: true,
  }),
);





app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectDB().then(async () => {
  try {
    await mongoose.connection.db.collection('categories').dropIndex('id_1');
    console.log('Dropped id_1 index from categories');
  } catch (error: any) {
    if (error.code !== 27) {
      console.log('Index id_1 does not exist or already dropped');
    }
  }
});

app.get("/api", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", AuthRoutes);
app.use("/api/categories", CategoryRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/carts", CartRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;