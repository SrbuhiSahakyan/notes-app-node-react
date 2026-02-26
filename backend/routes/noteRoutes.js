import express from "express";
import {
    createNote,
    getNotes,
    getHighNotes,
    updateNote,
    deleteNote
} from "../controllers/noteController.js";
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/",authMiddleware,getNotes);
router.get("/high",authMiddleware,getHighNotes);
router.post("/",authMiddleware,createNote);
router.put("/:id",authMiddleware,updateNote);
router.delete("/:id",authMiddleware,deleteNote);

export default router;