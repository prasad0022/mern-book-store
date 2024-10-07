import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import bookRouter from "./routes/book.route.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

const __dirname = path.resolve();

const PORT = process.env.PORT;

app.use("/api/book", bookRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
};

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
})











