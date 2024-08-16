import "dotenv/config"
import express from "express"

const PORT = process.env.PORT

import "./models/palestrantesModel.js"
import "./models/eventosModel.js"
import "./models/participanteModel.js"
import "./models/feedbackModel.js"



import palestrantesRouter from "./routes/palestrantesRouter.js"
import eventosRouter from "./routes/eventosRouter.js"
import participantesRouter from "./routes/participanteRouter.js"
import feedbackRouter from "./routes/feedbackRouter.js"

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/eventos', palestrantesRouter, eventosRouter, participantesRouter, feedbackRouter)

app.use((request, response)=>{
    response.status(404).json({message: 'Recurso não encontrado'})
})

app.listen(PORT, ()=>{
    console.log("Servidor on PORT "+PORT)
})