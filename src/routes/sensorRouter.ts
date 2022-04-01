import sensorController from "@/controllers/sensorController";
import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", sensorController.get);
router.get("/:id", sensorController.get_by_id);
router.post("/", sensorController.post);
router.patch("/:id", sensorController.patch);
router.delete("/:id", sensorController.delete);
export default router;