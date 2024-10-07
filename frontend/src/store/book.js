import { create } from "zustand";
import axios from "axios";

export const useBookStore = create((set) => ({
    books: [],
    setBooks: (books) => set({ books }),
    fetchBooks: async () => {
        try {
            const res = await axios.get("/api/book");
            set({ books: res.data.data });
        } catch (error) {
            console.error("Error fetching books from MongoDB.", error.message);
        }
    },
    fetchBook: async (bookId) => {
        try {
            const res = await axios.get(`/api/book/${bookId}`);
            return res.data.data;
        } catch (error) {
            console.error("Error fetching books from MongoDB.", error.message);
        }
    },
    createBook: async (newBook) => {
        if (!newBook.title || !newBook.author || !newBook.publishYear) {
            return { success: false, message: "Please provide all the fields." }
        };

        try {
            const res = await axios.post("/api/book", newBook);
            set((state) => ({ books: [...state.books, res.data] }));
            return { success: true, message: "Booke created successfully" };
        } catch (error) {
            console.error("Error saving new book.", error.message);
        }
    },
    updateBook: async (bookId, updatedBook) => {
        if (!updatedBook.title || !updatedBook.author || !updatedBook.publishYear) {
            return { success: false, message: "Please fill in all fields" }
        };

        try {
            const res = await axios.put(`/api/book/${bookId}`, updatedBook);
            set((state) => ({ books: state.books.map((book) => (book._id === bookId ? res.data.data : book)) }));
        } catch (error) {
            console.error("Error updating book.", error.message);
        }
    },
    deleteBook: async (bookId) => {
        try {
            const res = await axios.delete(`/api/book/${bookId}`);
            set((state) => ({ books: state.books.filter((book) => (book._id !== bookId)) }));
        } catch (error) {
            console.error("Error deleting book.", error.message);
        }
    }
}));