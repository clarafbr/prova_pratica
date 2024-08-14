import { Router } from "express";

import {postEvento, getEventos} from "../controllers/eventosControllers.js"

import verifyToken from "../helpers/verifyToken.js";


const router =  Router()

router.post("/criar", verifyToken, postEvento)
router.get("/agenda", getEventos)

export default router