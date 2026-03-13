import { Router } from"express";
const router = Router();

import contactFrom from "./contact-controller.js";
import { getAllTeamMembers, getAllUsers } from "./contact-controller.js";

console.log("📋 Setting up contact routes...");

// Handle POST - Add new team member
router.post("/", (req, res, next) => {
    console.log("🔴 POST / reached!");
    next();
}, contactFrom);

// GET endpoint - Fetch all users (public endpoint for teams page)
router.get("/users", getAllUsers);

// GET endpoint - Fetch all team members from MongoDB (contact collection)
router.get("/", getAllTeamMembers);

console.log("✅ Contact routes configured");

export default router;