const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const methodOverride = require('method-override');

dotenv.config();
const app = express();

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');
// __dirname : 현재 디렉토리의 절대경로
// path.join : 경로 지정자를 운영체제에 맞추어 줌
app.set('views', path.join(__dirname, 'views'));

// 라우팅 파일 불러오기
const travelRouter = require('./routes/travel');

app.use('/travel', travelRouter, (req, res) => {
    res.status(404).send('404 not found');
});

app.listen(3000, () => {
    console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});
