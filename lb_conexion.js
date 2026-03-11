// Importa la librería mysql2 que permite conectar Node.js con MySQL
const mysql = require('mysql2'); 
// -----------------------------
// CONFIGURACIÓN DE LA CONEXIÓN
// -----------------------------
// Este objeto contiene los datos necesarios para conectarse a la base de datos
const config = {
    host: 'localhost',     // Dirección del servidor de la base de datos
    user: 'root',          // Usuario de MySQL
    password: 'root',      // Contraseña del usuario
    database: 'NTDL_DB'    // Nombre de la base de datos que se usará
};
// Variable global donde se guardará la conexión
let conexion;
// -----------------------------
// FUNCIÓN PARA ABRIR LA CONEXIÓN
// -----------------------------
function abrirConexion() {
    // Se crea la conexión utilizando la configuración definida arriba
    conexion = mysql.createConnection(config);
    // Se intenta conectar al servidor de MySQL
    conexion.connect((error) => {
        // Si ocurre un error al conectar
        if (error) {
            console.log("Error al conectar:", error);
        } 
        // Si la conexión fue exitosa
        else {
            console.log("Conectado a MySQL");
        }
    });
}
// -----------------------------
// FUNCIÓN PARA CERRAR LA CONEXIÓN
// -----------------------------
function cerrarConexion() {
    // Primero se verifica que exista una conexión activa
    if (conexion) {
        // Se cierra la conexión con MySQL
        conexion.end((error) => {
            // Si ocurre un error al cerrar
            if (error) {
                console.log("Error al cerrar conexión:", error);
            } 
            // Si se cerró correctamente
            else {
                console.log("Conexión cerrada");
            }
        });
    }
}
// -----------------------------
// FUNCIÓN PARA CONSULTAS SELECT
// -----------------------------
function consulta(sql, callback) {
    // Ejecuta la consulta SQL enviada como parámetro
    conexion.query(sql, (error, resultados) => {
        // Si ocurre un error en la consulta
        if (error) {
            console.log("Error en consulta:", error);
            // Se devuelve el error al programa que llamó la función
            callback(error, null);
        } 
        // Si la consulta se ejecuta correctamente
        else {
            // Se devuelven los resultados obtenidos
            callback(null, resultados);
        }
    });
}
// -----------------------------
// FUNCIÓN PARA INSTRUCCIONES
// INSERT, UPDATE Y DELETE
// -----------------------------
function instruccion(sql, callback) {
    // Ejecuta la instrucción SQL enviada
    conexion.query(sql, (error, resultado) => {
        // Si ocurre un error
        if (error) {
            console.log("Error en instrucción:", error);
            // Se devuelve el error
            callback(error, null);
        } 
        // Si la operación fue correcta
        else {
            // Se devuelve el resultado de la operación
            // (por ejemplo filas afectadas)
            callback(null, resultado);
        }
    });
}
// -----------------------------
// EXPORTACIÓN DE LA LIBRERIA
// -----------------------------
// Permite que este archivo pueda ser utilizado en otros archivos de Node.js
// mediante require()
module.exports = {
    abrirConexion,     // función para abrir la conexión
    cerrarConexion,    // función para cerrar la conexión
    consulta,          // función para SELECT
    instruccion        // función para INSERT, UPDATE y DELETE
};