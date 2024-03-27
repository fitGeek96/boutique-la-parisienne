import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find({});

  res.send(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.send(product);
  }

  res.status(404).json({ message: "Product not found" });
});

export default router;
