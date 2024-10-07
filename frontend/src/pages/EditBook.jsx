import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton.jsx";
import { Spinner } from "../components/Spinner.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useBookStore } from "../store/book.js";

export const EditBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchBook, updateBook } = useBookStore();

  useEffect(() => {
    const getBook = async (id) => {
      try {
        setLoading(true);
        const bookData = await fetchBook(id);
        setBook(bookData);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    };
    getBook(id);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((preVal) => ({
      ...preVal,
      [name]: value,
    }));
  };

  const handleEditBook = async () => {
    try {
      setLoading(true);
      await updateBook(id, book);
      navigate("/");
    } catch (error) {
      console.error("Error updating book.", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={book.title}
            name="title"
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={book.author}
            name="author"
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={book.publishYear}
            name="publishYear"
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};
