const mysql = require('mysql2');
const express = require('express');
const fs = require('fs');
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



conn.connect();



// global.userData = [];
// const sql = "SELECT username FROM users";
// conn.query(sql, (err, results) => {
//     if (err) {
//         console.log(err);
//     } else {
//         // Сохраняем результаты запроса в переменной userData
//         global.userData = results;
//         console.log(results);
//     }
    
// });

app.use(express.static(path.join(__dirname, 'src', 'public')));

// Обработка запросов к корневому пути
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// Запуск сервера


app.get('/', (req, res) => {
    const sql = "SELECT username FROM users";
    connection.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Ошибка получения данных из базы данных');
        return;
      }
      res.sendFile(path.join(__dirname, 'public', 'index.html')); // Отправляем статический HTML файл
    });
  });
// const server = app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
app.get('/users', (req, res) => {
    const sql = "SELECT username FROM users";
    conn.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка получения данных из базы данных' });
        return;
      }
      res.json(results); // Отправляем данные в формате JSON
    });
  });
  app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
  });
// // Цикл, чтобы процесс не завершался
// setInterval(() => {}, 1000);

// // Обработка события завершения работы сервера
// process.on('SIGINT', () => {
//     console.log('Сервер завершает работу');
//     server.close(() => {
//         console.log('Сервер остановлен');
//         process.exit(0);
//     });
// });




// module.exports = { conn };


// function saveDataToFile(data) {
//     fs.writeFile('userdata.json', JSON.stringify(data), (err) => {
//         if (err) {
//             console.error('Error saving data to file:', err);
//         } else {
//             console.log('Data saved to file.');
//         }
//     });
// }

// // Выполняем запрос к базе данных и сохраняем результаты в файл
// const sql = "SELECT username FROM users";
// conn.query(sql, (err, results) => {
//     if (err) {
//         console.log(err);
//     } else {
//         saveDataToFile(results);
//     }
// });

// // Объявляем переменную для хранения результатов запроса
// let userData = [];

// // Раздача статических файлов
// app.use(express.static(path.join(__dirname, 'src', 'public')));

// // Обработка запросов к корневому пути
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// module.exports = { conn, userData };
