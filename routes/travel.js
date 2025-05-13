const express = require('express');
const db = require('../db');
const router = express.Router();

// 게시글 추가 페이지
router.get('/add', (req, res) => {
    res.render('addTravel');
});

// 여행지 전체 목록 가져오기
router.get('/', async (req, res) => {
    try {
        const _query = 'SELECT id, name FROM travelList';
        const [results] = await db.query(_query);
        res.render('travel', { travelList: results });
    } catch (err) {
        console.error('데이터베이스 쿼리 실패 : ', err);
        res.status(500).send('Internal Server Error');
    }
});

// 게시글 추가 페이지로 이동
router.get('/add', travelController.addTravel);

// 여행지 추가 
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const _query = 'INSERT INTO travelList (name)  VALUE (?)';
        await db.query(_query, [name]);
        res.redirect('/travel');
    } catch (err) {
        console.error('데이터베이스 쿼리 실패 : ', err);
        res.status(500).send('Internal Server Error');
    }
});

// 여행지 수정
router.put('/:id', async (req, res) => {
    const travelId = req.params.id;
    const { name } = req.body;
    try {
        const _query = 'UPDATE travelList SET name=? WHERE id=?';
        await db.query(_query, [name, travelId]);
        res.render('updateSuccess');
    } catch (err) {
        console.error('데이터베이스 쿼리 실패 : ', err);
        res.status(500).send('DB 서버 에러');
    }
});

// 여행지 수정 페이지
router.get('/:id/edit', async (req, res) => {
    const travelId = req.params.id;
    try {
        const _query = 'SELECT * FROM travelList WHERE id = ?';
        const [results] = await db.query(_query, [travelId]);
        if (results.length === 0) {
            res.status(404).send('여행지를 찾을 수 없습니다.');
            return;
        }
        const travel = results[0];
        res.render('editTravel', { travel });
    } catch (err) {
        console.error('데이터베이스 쿼리 실패 : ', err);
        res.status(500).send('Internal Server Error');
    }
});

// 여행지 삭제
router.delete('/:id', async (req, res) => {
    const travelId = req.params.id;
    try {
        const _query = 'DELETE FROM travelList WHERE id=?';
        await db.query(_query, [travelId]);
        res.render('deleteSuccess');
    } catch (err) {
        console.error('데이터베이스 쿼리 실패 : ', err);
        res.status(500).send('DB 서버 에러');
    }
});

module.exports = router;