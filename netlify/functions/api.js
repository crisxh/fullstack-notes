import serverless from 'serverless-http';
const express = require('express');
import { Router } from 'express';
const mySql2 = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


dotenv.config();


const db = mySql2.createConnection({
    user: 'uafgikza',
    host: 'lucky.db.elephantsql.com',
    password: process.env.DB_PASSWORD,
    database: 'uafgikza'

})


db.connect(function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log('You are now connected...')
    }

})



app.listen(3001, () => {
    console.log('success!')
});

app.get('/posts', (err, res) => {
    let getQuery = 'SELECT * FROM ??;';
    let query = mySql2.format(getQuery, ["notes"]);
    db.query(query, (err, response) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log(response);
            res.send(response);

        }
    })



})

app.post('/create', (req, res) => {
    addRow({
        Author: req.body.Author,
        Note: req.body.Note

    });

});

function getNotes() {
    let getQuery = 'SELECT * FROM ??;';
    let query = mySql2.format(getQuery, ["notes"]);
    db.query(query, (err, response) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log(response);
            res.send(response);

        }
    })

}

function addRow(data) {
    let insertQuery = 'INSERT INTO ?? (??,??) VALUES (?,?)';
    let query = mySql2.format(insertQuery, ["notes", "Author", "Note", data.Author, data.Note]);
    db.query(query, (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        // rows added
        console.log(response.insertId);
    });
}

app.delete('/delete/:ID', (req, res) => {
    const ID = req.params.ID;
    let deleteQuery = "DELETE from ?? where ?? = ?";
    let query = mySql2.format(deleteQuery, ["notes", "ID", ID]);

    db.query(query, (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        // rows deleted
        console.log(response.affectedRows);
    });

})

function deleteNote(ID) {

}

export const handler = serverless(app)