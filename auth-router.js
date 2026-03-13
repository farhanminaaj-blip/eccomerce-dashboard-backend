 import express from "express";
 import { register,login } from "./controller.js";
 import { signupSchema } from "./auth-validator.js";
 import { validate } from "./validate-middleware.js";
 export const router=express.Router();
 router.route("/register").post (validate(signupSchema),register);
 router.route("/login").post(login);
