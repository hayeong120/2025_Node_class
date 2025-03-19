// express 모듈을 불러옴
const express = require('express');

//Express 애플리케이션을 생성
const app = express();

app.use(express.json());

// 라우팅 설정
app.post('/swag', (req, res) => {
    // 클라이언트에게 응답내용 전송
    res.send(req.body);
});

// 서버가 3000번 포트에서 요청을 기다리도록 설정
app.listen(3000, () => {
    console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});
