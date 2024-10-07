import express from "express";
import { createBook, deleteBook, fetchBook, fetchBooks, updateBook } from "../controllers/book.controller.js";

const router = express.Router();

router.get("/", fetchBooks);  //Fetches all books from MongoDB.
router.get("/:id", fetchBook); // Fetch a Book based on id.
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;