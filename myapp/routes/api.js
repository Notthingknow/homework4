const express = require('express');
const router = express.Router();

const sqlite = require('sqlite3').verbose();
db = new sqlite.Database("./db.sqlite", sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

router.post('/', (req, res) => {
    const {ID, price, name, d}=req.body;
    let sql = "INSERT INTO card (ID, price, name, d) VALUES (?, ?, ?, ?)";
    db.run(sql, [ID, price, name, d], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err.message);
        }
        console.log('inserted');
    });
    //res.redirect('/data.html');
    return res.status(200).json({ message: 'inserted' });
})

router.get('/', function(req, res, next) {
    const finding = req.query.finding.toString();
    const value1 = req.query.value1.toString();
    let sql = `SELECT * FROM card WHERE ${finding} = ?`;
    db.all(sql, [value1], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

router.get('/all', function(req, res, next) {
    let sql = 'SELECT * FROM card';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

module.exports = router;
