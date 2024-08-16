import { Router } from "express";

import {postInscricao, postParticipante, postFeedback, getmeusEventos} from "../controllers/participantesController.js"

import validarParticipante from "../helpers/validarParticipante.js"
import validarInscricao from "../helpers/validarInscricao.js";

const router = Router();

//localhost:3333/eventos/participantes/registrar
router.post("/participantes/registrar",validarParticipante, postParticipante);
router.post("/inscrever", validarInscricao, postInscricao)
router.post("/feedback", postFeedback)
router.get("/meus-eventos/:id", getmeusEventos)

export default router;