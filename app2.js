const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.set('view engine', 'ejs');
// __dirname : 현재 디렉토리의 절대경로
// path.join : 경로 지정자를 운영체제에 맞추어 줌 
app.set('views', path.join(__dirname, 'views'));

const travelList = ['뉴욕', '파리', '서울', '도쿄'];

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('MySQL 연결 실패 : ', err);
        return;
    }
    console.log('MySQL에 연결되었습니다.');
})

app.get('/', (req, res) => {

});

app.get('/travel', (req, res) => {
    res.render('travel', { travelList });
});

app.use((req, res) => {

});

app.listen(3000, () => {
    console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});