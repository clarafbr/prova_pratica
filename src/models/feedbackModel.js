import conn from "../config/conn.js"

const tablePalestrantes = /*sql*/`  
    CREATE TABLE IF NOT EXISTS feedbacks(
        feedback_id VARCHAR(60) PRIMARY KEY,
        evento_id VARCHAR (60) NOT NULL,
        participante_id VARCHAR (60) NOT NULL,
        nota INT NOT NULL,
        comentario VARCHAR (255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (evento_id) REFERENCES eventos_registrados(evento_id),
        FOREIGN KEY (participante_id) REFERENCES participantes(participante_id)
    )
`
conn.query(tablePalestrantes, (err)=>{
    if(err){
        console.error(err)
        return
    }
    console.log("Tabela de [feedbacks] criada com sucesso")
})