import React, { useState } from "react";
import BackButton from "../components/BackButton.jsx";
import { Spinner } from "../components/Spinner.jsx";
import { useNavigate } from "react-router-dom";
import { useBookStore } from "../store/book.js";

export const CreateBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishYear: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { createBook } = useBookStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((preVal) => ({
      ...preVal,
      [name]: value,
    }));
  };

  const handleSaveBook = async () => {
    try {
      setLoading(true);
      const { success, message } = await createBook(book);
      navigate("/");
    } catch (error) {
      console.error("Error in saving new book.", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            name="publishYear"
            value={book.publishYear}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};
