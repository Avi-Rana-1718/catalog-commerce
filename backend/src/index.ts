import express from "express";
import dotenv from "dotenv"
import cors from "cors"

import { auth } from "./middlewares/auth.middleware";

import authRoutes from "./routes/authRoutes"
import productRoutes from "./routes/productRoutes"
import adminRoutes from "./routes/adminRoutes"
import userRoutes from "./routes/userRoutes"
import orderRoutes from "./routes/orderRoutes"

dotenv.config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: "*"
}))
app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/user", auth, userRoutes);
app.use("/admin", auth, adminRoutes);
app.use("/order", auth, orderRoutes);

app.listen(process.env.PORT, ()=>{
    console.log("Server started at", process.env.PORT);
    
})
