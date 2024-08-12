import { Router } from "express";

import {postPalestrante, getPalestrantes} from "../controllers/palestrantesController.js"

import validarPalestrante from "../helpers/validarPalestrantes.js"

const router = Router();

//localhost:3333/eventos/palestrantes
router.post("/palestrantes",validarPalestrante, postPalestrante);
router.get("/palestrantes", getPalestrantes)

export default router;