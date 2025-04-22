const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const travelRouter = require('./routes/travel');

const app = express();
const PORT = 3000;

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/travel', travelRouter);

app.use((req, res) => {
    res.status(404).send('404 not found');
});

app.listen(PORT, () => {
    console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});
