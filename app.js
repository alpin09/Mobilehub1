// const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port =  3000;
app.use(cors());

const conn = mysql.createConnection ({
    host:"localhost",
    user:"root",
    password:"",
    database:"mobilehub"

});

conn.connect(err =>{
    if(err){
        console.log(err);
    }
    else {
        console.log('database---ok');
    }
});


let query = "SELECT * FROM users";
conn.query(query, (err, result, field) => {
    console.log(err); 
    // console.log(result); 
    console.log(result[1]['username']);
});

app.get('/users', (req, res)=>{
    const sql ="SELECT * FROM users";
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results); // Отправка списка товаров в формате JSON
      });
    });
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
      });