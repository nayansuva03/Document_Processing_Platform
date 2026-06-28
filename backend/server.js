import express from "express";
import cors from "cors";
import generateRoute from "./routes/generate.js";

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/generate", generateRoute);

app.get("/",(req, res) => {
    res.send("Backend running...")
})

app.get("/api/test", (req, res)=>{
 res.json({
        success: true,
        message: "Hello from the backend!"
    });
})

app.post("/api/echo", (req, res) => {
    console.log(req.body);

    res.json({
        received: req.body
    });
});

app.listen(PORT, () =>{
    console.log("server is running")
})