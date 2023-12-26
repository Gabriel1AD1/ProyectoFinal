const express = require("express")
const { body, validationResult } = require("express-validator");
const app = express();

const mysql = require("mysql2");

const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'empleados_crud',
});


app.listen(3001,()=>{
    console.log("corriendo en el puerto 3001")
})


//metodo para crear
app.post('/create', (req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const años = req.body.años;

    db.query('INSERT INTO empleados (nombre, edad, pais, cargo, años) VALUES (?, ?, ?, ?, ?)',
        [nombre, edad, pais, cargo, años],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al registrar el empleado");
            } else {
                res.send(result);
            }
        }
    );
});

//Manejo de get data para obtener los datos mediante una consulta querry
app.get("/listar", (req, res) => {
    db.query('SELECT * FROM empleados',
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error en la consulta a la base de datos");
            } else {
                res.json(result); // Envía los resultados como respuesta al cliente
            }
        }
    );
});

//Actualizar la base de datos
app.put('/update', (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const años = req.body.años;

    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,años=? WHERE id=?',[nombre, edad, pais, cargo, años,id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al registrar el empleado");
            } else {
                res.send("Empleado Actializado Con Éxito");
            }
        }
    );
});

app.delete('/delete/:id', (req, res) => {
    //Se recive el parametro por la url el id
    const id = req.params.id;
    db.query('DELETE FROM empleados WHERE id=?',[id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al registrar el empleado");
            } else {
                res.send(result);
            }
        }
    );
});

