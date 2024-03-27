import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const products = await Product.find({});

      res.send(products);
    } catch (error) {
      res.status(404);
      throw new Error("Products not found");
    }
  }),
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        return res.send(product);
      }
    } catch (error) {
      res.status(404);
      throw new Error("Product not found");
    }
  }),
);

export default router;
