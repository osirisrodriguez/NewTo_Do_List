// Importa el framework Express
const express = require('express');
// Importa el módulo path
const path = require('path');
// libreria de conexiones
const db = require('./lb_conexion');
// Crea la aplicación
const app = express();
// Puerto del servidor
const puerto = 8080;
// abre la Conexión
db.abrirConexion();
// para que express lea .json
app.use(express.json());
// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'publico')));
// ----------------------
// login
// ----------------------
app.post('/login', (req, res) => {
    const Usname = req.body.Usname;
    const pin = req.body.pin;
    const sql = `SELECT * FROM usuarios WHERE Usname='${Usname}' and pin='${pin}'`;
    db.consulta(sql, (error, resultados) => {
        if(error){
            res.json({error: true});
            return;
        }
        if(resultados.length > 0){
            res.json({existe: true});
        }
        else{
            res.json({existe: false});
        }
    });
});

// ----------------------
// registro
// ----------------------
app.post('/registro', (req, res) => {

    const Usname = req.body.Usname;
    const correo = req.body.correo;
    const pin = req.body.pin;

    const sql = `INSERT INTO usuarios (Usname, correo, pin)
                 VALUES ('${Usname}','${correo}','${pin}')`;

    db.consulta(sql, (error, resultados) => {

        if(error){
            res.json({registrado:false});
            return;
        }

        res.json({registrado:true});
    });

});

// ----------------------
// obtener tareas
// ----------------------
app.get('/tareas', (req, res) => {

    const sql = "SELECT * FROM Tareas";

    db.consulta(sql, (error, resultados) => {

        if(error){
            console.log(error);
            res.json({error:true});
            return;
        }

        res.json(resultados);

    });

});


// ----------------------
// agregar tarea
// ----------------------
app.post('/agregarTarea', (req, res) => {

    const Taname = req.body.tarea;

    if(!Taname){
        res.json({agregado:false});
        return;
    }

    const sql = `
        INSERT INTO Tareas (Taname, realizado, Idus)
        VALUES ('${Taname}',0,1)
    `;

    db.consulta(sql, (error, resultados) => {

        if(error){
            console.log(error);
            res.json({agregado:false});
            return;
        }

        res.json({agregado:true});

    });

});

// ----------------------
// eliminar tarea
// ----------------------
app.post('/eliminarTarea', (req, res) => {

    const Taname = req.body.tarea;

    const sql = `DELETE FROM Tareas WHERE Taname='${Taname}'`;

    db.consulta(sql, (error, resultados) => {

        if(error){
            console.log(error);
            res.json({eliminado:false});
            return;
        }

        res.json({eliminado:true});

    });

});

// Iniciar servidor
app.listen(puerto, () => {
  console.log(`Servidor funcionando en http://localhost:${puerto}`);
});