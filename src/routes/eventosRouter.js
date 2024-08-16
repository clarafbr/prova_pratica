import { Router } from "express";

import {postEvento, getEventos, updateEventos, deleteEventos } from "../controllers/eventosControllers.js"

import verifyToken from "../helpers/verifyToken.js";


const router =  Router()

router.post("/criar", verifyToken, postEvento)
router.get("/agenda", getEventos)
router.put("/editar/:id", updateEventos)
router.delete("/cancelar/:id", deleteEventos)


export default router