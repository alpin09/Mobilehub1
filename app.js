const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000; // Используйте одну переменную для порта
const path = require('path');

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

app.use(express.static(path.join(__dirname, 'src', 'public')));

// Обработка запросов к корневому пути
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Запросы к базе данных
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

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});