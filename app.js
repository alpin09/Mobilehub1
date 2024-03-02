const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

const conn = mysql.createConnection({
    host: "database-1.c546eokicb94.eu-north-1.rds.amazonaws.com",
    user: "admin",
    password: "mobilehubpass",
    database: "mobilehub_db"
});

conn.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('database---ok');
    }
});

app.get('/products', (req, res) => {
    const sql = "SELECT * FROM products";
    conn.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Ошибка при извлечении данных');
        } else {
            res.json(results); // Отправка списка товаров в формате JSON
        }
    });
});

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    conn.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Ошибка при извлечении данных');
        } else {
            res.json(results); // Отправка списка пользователей в формате JSON
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
