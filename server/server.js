import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import Stripe from "stripe";

// app config
const app = express();
const port = process.env.PORT || 4000;


//middlewares
app.use(express.json());

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow Postman / server-to-server

    // Debugging: Check what is coming in and what is allowed
    console.log("Request Origin:", origin);
    console.log("Allowed Origins:", allowedOrigins);

    if (allowedOrigins.map(o => o?.replace(/\/$/, "")).includes(origin?.replace(/\/$/, ""))) {
      return callback(null, true);
    } else {
      console.error(`CORS Error: Origin ${origin} not allowed`);
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// DB connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send('API is working fine ✅');
});


app.listen(port, () => {
  console.log(`Server Started on port: http://localhost:${port}`);
});
