import mongoose from "mongoose";
import Book from "../model/book.model.js";

export const createBook = async (req, res) => {
    try {
        const book = req.body;
        if (!book.title || !book.author || !book.publishYear) {
            return res.status(400).json({ success: false, message: "Please provide all the fields" });
        };

        const newBook = new Book(book);
        await newBook.save();
        res.status(201).json({ success: true, data: newBook });
    } catch (error) {
        console.error("Error adding book to DB.", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const fetchBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json({ success: true, count: books.length, data: books });
    } catch (error) {
        console.error("Error fetching books from DB.", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const fetchBook = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid book Id." });
    }

    try {
        const book = await Book.findById(id);
        res.status(200).json({ success: true, data: book });
    } catch (error) {
        console.error("Error fetching book from DB.", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateBook = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid book Id." });
    };

    const book = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(id, book, { new: true });
        res.status(200).json({ success: true, data: updatedBook });
    } catch (error) {
        console.error("Error updating books to DB.", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const deleteBook = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid book Id." });
    };

    try {
        await Book.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Book deleted successfilly." });
    } catch (error) {
        console.error("Error deleting book.", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};