


import express from "express";
import {
  getProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/itemController.js"; // correct spelling


const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getSingleProduct);
router.post('/', newProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
