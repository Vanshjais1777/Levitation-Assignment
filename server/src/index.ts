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
  "http://localhost:5173", // Add the new origin here
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/products", productsRoute);

app.listen(port, () => {
  console.log(`app is listening on port: ${port}`);
});
