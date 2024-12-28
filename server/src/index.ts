import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "../src/routes/auth.routes";
import productsRoute from "../src/routes/product.routes";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
app.use(
  cors({
    origin: "https://levitation-frontend-self.vercel.app",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api/auth", authRoute);
app.use("/api/products", productsRoute);

app.listen(port, () => {
  console.log(`app is listening on port: http://localhost:${port}`);
});
