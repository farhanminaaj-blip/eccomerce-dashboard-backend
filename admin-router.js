import express from "express";
import { authenticate, requireAdmin } from "./auth-middleware.js";
import { listUsers, getUser, updateUser, deleteUser, stats } from "./controller.js";

const router = express.Router();

router.use(authenticate, requireAdmin);

router.get("/users", listUsers);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.get("/stats", stats);

export default router;