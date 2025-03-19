// express 모듈을 불러오기
const express = require('express');

//Express 애플리케이션을 생성
const app = express();

app.use(express.json());

// 라우팅 파일 불러오기
const swagRoutes = require('./routes/swag');

// 라우팅 설정
app.use('/swag', swagRoutes);

// 서버가 3000번 포트에서 요청을 기다리도록 설정
app.listen(3000, () => {
    console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});
