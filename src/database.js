const mysql = require ('mysql');
const {promisify} = require('util');
const { database }=require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err,connection)=>{
    if(err) {
        if(err.code === "PROTOCOL_CONETION_LOST"){  console.log("DATABASE CONECTION WAS CLOSED");}
        if(err.code === "ER_CON_COUNT_ERROR"){      console.log("DATABASE HAS TO MANY CONNECTIONS");}
        if(err.code === "ECONREFUSED"){             console.log("DATABASE CONNECTION WAS REFUSED");}   
    }
    if(connection) connection.release();
    console.log("DB is connected")
    return;
})

pool.query =  promisify(pool.query);
module.exports = pool;
