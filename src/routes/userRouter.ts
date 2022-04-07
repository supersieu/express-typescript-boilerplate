import userController from "@/controllers/userController";
import express from "express";
const router = express.Router();
var jwt = require("express-jwt");

/* GET home page. */
router.get("/", userController.get);
router.get("/:id", userController.get_by_id);
router.post("/", userController.post);
router.post("/login", userController.login);
router.patch("/:id",jwt({ secret: process.env.SECRET_KEY, algorithms: ["HS256"] }), userController.patch);
router.delete("/:id",jwt({ secret: process.env.SECRET_KEY, algorithms: ["HS256"] }), userController.delete);

export default router;