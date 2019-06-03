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

const periodic_table = require('./routes/periodic-table');

// set templating engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', new swig.Swig().renderFile);
app.set('view engine', 'html');

// ad-hoc settings
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/atoms', function(request, response) {
    db.all('SELECT * from Element', function(err, rows) {
        var data = JSON.stringify(rows);
        var status = "success";
        var message = "ok";
        if (err) {
            console.log(err.message);
            status = "error";
            message = err.message;
        }
        response.send({"status": status, "message": message, "data": data});
    });
});

app.get('/atoms/:atomic_number', function(request, response) {
    var atomic_number = request.params.atomic_number;
    sql = `SELECT * FROM Element WHERE atomic_number = ?`;
    db.get(sql, [atomic_number], function(err, row) {
        var data = JSON.stringify(row);
        var status = "success";
        var message = "ok";
        if (!row) {
            status = "error";
            message = "No data exists!";
        }
        if (err) {
            console.error(err.message);
            status = "error";
            message = err.message ;
        }
        response.send({"status": status, "message": message, "data": data});
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

app.get('/organic-reactions', function(request, response) {
    response.render('organic_reactions');
});

app.get('/hybridization/:type', function(request, response) {
    let type = request.params.type;
    response.render('hybridization', {type: type});
});

app.use('/periodic-table', periodic_table);

app.listen(port, () => console.log(`App listening on port ${port}!`));