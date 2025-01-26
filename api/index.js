import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import notificationsRoute from "./routes/notifications.route.js";
import statusRouter from "./routes/status.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

// Correctly import the ordersRouter
import ordersRouter from "./routes/order.route.js"; // Ensure this path matches your actual file structure
import reservationRouter from "./routes/reservation.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const __dirname = path.resolve();
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on Port ${port}!`);
});

// Registering routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/reservation", reservationRouter);
app.use("/api/notifications", notificationsRoute);
app.use("/api/orders", ordersRouter); // Register orders route

app.use("/api/status", statusRouter);

console.log("Orders route registered");
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
