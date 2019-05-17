// init project
const express = require('express');
const bodyParser = require('body-parser');
const swig = require('swig');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;


// init sqlite db
const dbFile = './data.sqlite';
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(dbFile);

// set templating engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', new swig.Swig().renderFile);
app.set('view engine', 'html');

// ad-hoc settings
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/atom/:atomic_number', function(request, response) {
    let atomic_number = request.params.atomic_number;
    sql = `SELECT * FROM Element WHERE atomic_number = ?`;
    db.get(sql, [atomic_number], function(err, row) {
        if (err) {
            console.error(err.message);
            response.json({"status": "error", "message": "Something is blown up!"});
        } else if (!row) {
            response.json({"status": "error", "message": "No data exists"});
        } else {
            response.json({"status": "success", "data": JSON.stringify(row)});
        }
    });
});

app.get('/topics', function(request, response) {
    db.all('SELECT * from Topics', function(err, rows) {
        response.send(JSON.stringify(rows));
    });
});

app.get('/', function(request, response) {
    response.render('index');
});

app.listen(port, () => console.log(`App listening on port ${port}!`));