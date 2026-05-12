import dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./routes/taskRoute.js";
import connectDB from "./config/db.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import cors from "cors";

const app = express();
connectDB(); // connect database
// middlewares
app.use(
  cors({
    origin: "https://todo-app-seven-phi-46.vercel.app/",
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Backend is working fine");
});

// routes
app.use("/api/tasks", router);

// global error handler middleware
app.use(errorMiddleware);
const port = process.env.PORT || 8080;
// inititalize server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
