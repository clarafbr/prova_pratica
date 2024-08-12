import "dotenv/config"
import express from "express"

const PORT = process.env.PORT

import "./models/palestrantesModel.js"

import palestrantesRouter from "./routes/palestrantesRouter.js"

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/eventos', palestrantesRouter)

app.use((request, response)=>{
    response.status(404).json({message: 'Recurso não encontrado'})
})

app.listen(PORT, ()=>{
    console.log("Servidor on PORT "+PORT)
})