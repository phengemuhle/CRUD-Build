const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

var data = require('./data.json')

app.use(bodyParser.json())

app.get('/', (req,res,next) => {
    res.send({ data })
})
app.get('/:id', (req,res,next) => {
    var { id } = req.params
    var [ filtered ] = data.filter(item => {
        return item.id == id
    })
    res.send({ joke: filtered.joke, punchline : filtered.punchline })
})

app.post('/', (req,res,next) => {
    var { body } = req
    var obj = {
        id : data.length + 1,
        joke : body.joke, 
        rating : [],
        punchline : body.punchline
    }
    data.push(obj)
    res.send({ data : obj})
})
app.put('/:id', (req,res,next) => {
    var { body } = req
    var { id } = req.params
    var mapped = data.map( item => {
        if(id == item.id){
            return  item = {
                id : item.id,
                ...body
                }
        } return item
    })
    data = mapped
    res.send({ data })
})
app.delete('/:id', (req, res, next) => {
    var { id } = req.params
    var mapped = data.filter(item => {
        return item.id != id
    })
    data = mapped
    res.send({ data })
})

app.listen(port)