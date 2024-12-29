import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "../src/routes/auth.routes";
import productsRoute from "../src/routes/product.routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = [
  "https://levitation-assignment-frontend.vercel.app",
  "http://localhost:5173",
];

// CORS Configuration
app.use(
  cors({
    origin: "*",
  })
);

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/products", productsRoute);

// Start Server
app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
