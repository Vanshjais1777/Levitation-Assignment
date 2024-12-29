import express from "express";
import { getProducts } from "../controllers/getProducts.controller";
import { addProducts } from "../controllers/addProducts.controller";
import { generatePdf } from "../controllers/generatePdf.controller";
import { deleteProduct } from "../controllers/deleteProducts.controller";

const router = express.Router();

router.get("/:userId/get", getProducts);
router.post("/:userId/add", addProducts);
router.post("/generate-pdf", generatePdf);
router.delete("/delete/:productId", deleteProduct);
export default router;
