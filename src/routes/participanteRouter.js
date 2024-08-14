import { Router } from "express";

import {postInscricao, postParticipante} from "../controllers/participantesController.js"

import validarParticipante from "../helpers/validarParticipante.js"
import validarInscricao from "../helpers/validarInscricao.js";

const router = Router();

//localhost:3333/eventos/participantes/registrar
router.post("/participantes/registrar",validarParticipante, postParticipante);

router.post("/inscrever", validarInscricao, postInscricao)

export default router;