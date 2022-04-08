import sensorController from "@/controllers/sensorController";
import express from "express";
import jwt from "express-jwt";
import { load } from "ts-dotenv";
const env = load({
  DATABASE_URL: String,
  SECRET_KEY: String,
});
const router = express.Router();

router.use(jwt({ secret: env.SECRET_KEY, algorithms: ["HS256"] }));
router.get("/", sensorController.get);
router.get("/:id", sensorController.get_by_id);
router.post("/", sensorController.post);
router.patch("/:id", sensorController.patch);
router.delete("/:id", sensorController.delete);
export default router;
