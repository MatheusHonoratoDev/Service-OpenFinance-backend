import express from "express";
import { getUsers, insertDados } from "../controllers/user.js";

const router = express.Router();

router.get("/get", getUsers);
router.post("/insert", insertDados);


export default router;
