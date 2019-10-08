const express = require('express')
const app = express()
const {connectionPool} = require('./data/connection.js')
const mysql = require('mysql')

let name = ''
let desc = ''

app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/api/dogs', (req, res, next) => {
    name = req.body.name
    desc = req.body.desc
    connectionPool.query(`INSERT INTO dog (name, description) VALUES (${mysql.escape(name)}, ${mysql.escape(desc)});`, (error, results) => {
    if (error) {
        const error = new Error("Failed to insert Dog")
        next(error)
        //console.log(error.message)
        process.exit()
    } else {
        console.log('Success: Dog inserted')
        connectionPool.end((error) => {})
        //process.exit()
        res.set('content-location', '/api/dogs/' + results.id);
        res.status(201).json({
            url: '/api/dogs/' + results.insertId,
            data: {
                id: results.insertId,
                name: name,
                desc: desc
            }
        })
    }
})
})

app.get('/api/dogs', (req,res, next) => {
    
    connectionPool.query(`SELECT * FROM dog ${req.query.start && req.query.count ? 'LIMIT ' + req.query.start + ', ' + req.query.count : '' };`, (error, results) => {
    if (error) {
        const error = new Error("Failed to fetch Dogs")
        next(error)
        //console.log(error.message)
        process.exit()
    } else {
        // connectionPool.end((error) => {})
        res.json(results)
    }
})
})

app.get('/api/dogs/:id', (req, res, next) => {
    
    connectionPool.query(`SELECT * FROM dog WHERE dog_id = ${req.params.id};`, (error, results) => {
    if (error) {
        const error = new Error("Failed to fetch Dog")
        next(error)
        //console.log(error.message)
        process.exit()
    } else {
        // connectionPool.end((error) => {})
        if (results.length > 0)
            res.json(results)
        else
            res.status(404).send("nothing found");
    }
})
})

const errorHandler = (error, req, res, next) => {
    res.send("There's been an Error: " + error.message)
}

const server = app.listen(8080, () => {
    console.log('listening')
})