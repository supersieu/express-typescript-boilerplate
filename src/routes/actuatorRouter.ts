import actuatorController from "@/controllers/actuatorController";
import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", actuatorController.get);
router.get("/:id", actuatorController.get_by_id);
router.post("/", actuatorController.post);
router.patch("/:id", actuatorController.patch);
router.delete("/:id", actuatorController.delete);
export default router;