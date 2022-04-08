import actuatorController from "@/controllers/actuatorController";
import express from "express";
import jwt from "express-jwt";
import { load } from "ts-dotenv";
const env = load({
  DATABASE_URL: String,
  SECRET_KEY: String,
});
const router = express.Router();

router.use(jwt({ secret: env.SECRET_KEY, algorithms: ["HS256"] }));
router.get("/", actuatorController.get);
router.get("/:id", actuatorController.get_by_id);
router.post("/", actuatorController.post);
router.patch("/:id", actuatorController.patch);
router.delete("/:id", actuatorController.delete);
export default router;