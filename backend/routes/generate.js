import express from "express";
import { generate } from "../controllers/generateController.js";

const router = express.Router();
console.log('generate.js is working...');

router.post("/", generate);

export default router;