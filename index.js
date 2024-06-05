import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// All Router
import userRoute from "./routes/userRoute.js";
import postRouter from "./routes/posrRoute.js";
app.use("/api/user", userRoute);
app.use("/api/post", postRouter);

app.listen(PORT, () => console.log(`Server is Runing on ${PORT}`));
