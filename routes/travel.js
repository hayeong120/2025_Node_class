const express = require('express');
const db = require('../db');
const router = express.Router();

// 게시글 추가 페이지
router.get('/add', (req, res) => {
    res.render('addTravel');
});

// 여행지 전체 목록 가져오기
router.get('/', (req, res) => {
    const _query = 'SELECT id, name FROM travelList';
    db.query(_query, (err, results) => {
        if (err) {
            console.error('데이터베이스 쿼리 실패 : ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const travelList = results;
        res.render('travel', { travelList });
    });
});

// 여행지 페이지 이동
router.get('/:id', (req, res) => {
    const travelId = req.params.id;
    const query = 'SELECT * FROM travelList WHERE id = ?';
    db.query(query, [travelId], (err, results) => {
        if (err) {
            console.error('데이터베이스 쿼리 실패 : ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('여행지를 찾을 수 없습니다.');
            return;
        }
        const travel = results[0];
        res.render('travelDetail', { travel });
    });
});

// 여행지 추가 
router.post('/', (req, res) => {
    const { name } = req.body;
    const _query = 'INSERT INTO travelList (name)  VALUE (?)';
    db.query(_query, [name], (err, results) => {
        if(err) {
            console.error('데이터베이스 쿼리 실패 : ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.redirect('/travel');
    });
});

// 여행지 수정
router.put('/:id', (req, res) => {
    const travelId = req.params.id;
    const { name } = req.body;
    const _query = 'UPDATE travelList SET name=? WHERE id=?';
    db.query(_query, [name, travelId], (err, results) => {
        if(err) {
            console.error('데이터베이스 쿼리 실패 : ', err);
            res.status(500).send('DB 서버 에러');
            return;
        }
        res.render('updateSuccess');
    });
});

// 여행지 수정 페이지
router.get('/:id/edit', (req, res) => {
    const travelId = req.params.id;
    const query = 'SELECT * FROM travelList WHERE id = ?';
    db.query(query, [travelId], (err, results) => {
        if (err) {
            console.error('데이터베이스 쿼리 실패 : ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('여행지를 찾을 수 없습니다.');
            return;
        }
        const travel = results[0];
        res.render('editTravel', { travel });
    });
});

// 여행지 삭제
router.delete('/:id', (req, res) => {
    const travelId = req.params.id;
    const _query = 'DELETE FROM travelList WHERE id=?';
    db.query(_query, [travelId], (err, results) => {
        if(err) {
            console.error('데이터베이스 쿼리 실패 : ', err);
            res.status(500).send('DB 서버 에러');
            return;
        }
        res.render('deleteSuccess');
    });
});

module.exports = router;