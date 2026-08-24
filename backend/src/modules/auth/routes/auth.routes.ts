import { Router } from "express";
import { register } from "../controllers/register.controller.js";
import { login } from "../controllers/login.controller.js";
import { authenticate } from "../../../middlewares/auth.middleware.js";
import { getMe } from "../controllers/me.controller.js";
import { logout } from "../controllers/logout.controller.js";
import { googleCallback, googleLogin } from "../controllers/google.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getMe);
router.post("/logout", logout);

router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);

export default router;
