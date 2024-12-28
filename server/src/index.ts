import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "../src/routes/auth.routes";
import productsRoute from "../src/routes/product.routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = [
  "https://levitation-frontend-self.vercel.app",
  "http://localhost:5173",
];

// CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Handle Preflight Requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Logging Middleware (Optional for Debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/products", productsRoute);

// Start Server
app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
