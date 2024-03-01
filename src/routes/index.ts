import { Router } from "express";

export const router = Router();

import { usersRoutes } from "./users.routes";

router.use(usersRoutes);
