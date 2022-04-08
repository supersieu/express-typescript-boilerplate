import userController from "@/controllers/userController";
import express from "express";
import jwt from "express-jwt";
import { load } from "ts-dotenv";
const env = load({
  DATABASE_URL: String,
  SECRET_KEY: String,
});
const router = express.Router();

router.post("/", userController.post);
router.post("/login", userController.login);

router.use(jwt({ secret: env.SECRET_KEY, algorithms: ["HS256"] }));

router.get("/", userController.get);
router.get("/:id", userController.get_by_id);
router.patch("/:id", userController.patch);
router.delete("/:id", userController.delete);

export default router;
