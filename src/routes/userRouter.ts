import userController from "@/controllers/userController";
import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", userController.get);
router.get("/:id", userController.get_by_id);
router.post("/", userController.post);
router.patch("/:id", userController.patch);
router.delete("/:id", userController.delete);
export default router;