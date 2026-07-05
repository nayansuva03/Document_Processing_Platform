import express from "express";
import cors from "cors";
import generateRoute from "./routes/generate.js";

const app = express();

const PORT = 5000;

app.use(cors({
   // origin: "https://mcqs-generator-ruby.vercel.app/"
}));

app.use(express.json());
app.use("/api/generate", generateRoute);

app.get("/",(req, res) => {
    res.send("Backend running...")
})

app.listen(PORT, () =>{
    console.log("server is running...")
})