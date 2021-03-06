const express = require('express')
const teachers = require('./teachers')

const routes = express.Router()


routes.get('/', (req,res) => {
    return res.redirect('/teachers')
})

routes.get('/teachers', (req, res) => {
    return res.render('teachers/index')
})

routes.get('/students', (req, res) => {
    return res.render('students')
})

routes.get('/teachers/create', (req, res) => {
    return res.render('teachers/create')
})

routes.get('/teachers/:id',teachers.show)

routes.post('/teachers', teachers.post)

module.exports = routes