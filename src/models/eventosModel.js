import conn from "../config/conn.js"

const tableEventos_registrados = /*sql*/`  
    CREATE TABLE IF NOT EXISTS eventos_registrados(
        evento_id VARCHAR(60) PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        data_evento VARCHAR (255) NOT NULL,
        palestrante_id VARCHAR(60),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (palestrante_id) REFERENCES palestrantes(palestrante_id)
    )
`
conn.query(tableEventos_registrados, (err)=>{
    if(err){
        console.error(err)
        return
    }
    console.log("Tabela de [eventos_registrados] criada com sucesso")
})