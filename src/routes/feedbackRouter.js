import { Router } from "express";

import { getFeedback, Createfeedback} from "../controllers/feedbackController.js";
import { validarFeedback } from "../helpers/validarFeedback.js";

const router = Router();

router.get("/feedback", getFeedback);
router.post("/feedback", validarFeedback, Createfeedback);

export default router;