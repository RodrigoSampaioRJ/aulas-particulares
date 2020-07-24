const fs = require('fs')
const data = require('./data.json')
const { age } = require('./utils')
const intl = require('intl')
//CREATE
exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ''){
            return res.send('Plase, fill all entries')
        }
    }


    //DESESTRUTURAÇAO DE OBJETO
    let { avatar_url, name, birthday, matters, class_type, grade} = req.body


    const created_at = Date.now()
    const id = data.teachers.length + 1
    birthday = Date.parse(req.body.birthday)

    data.teachers.push({
        id,
        avatar_url,
        name,
        birthday,
        grade,
        class_type,
        matters,
        created_at
    })
    


    fs.writeFile('data.json',JSON.stringify(data, null, 4), (err) =>{
        if(err) return res.send('Write file error')

        return res.redirect('/teachers')
    })

    //return res.send(req.body)
}
//MOSTRAR
exports.show = (req,res) => {
    const { id } = req.params

    const foundedTeacher = data.teachers.find(function(teacher){
        return teacher.id == id

    })

    if(!foundedTeacher) return res.send('Teacher not found!')

    //DESESTRUTURAÇAO COM SPREAD OPERATOR
    const teacher = {
        ...foundedTeacher,
        age: age(foundedTeacher.birthday),
        since: new intl.DateTimeFormat('pt-BR').format(foundedTeacher.created_at),
        matters: foundedTeacher.matters.split(",")

    }

    return res.render('teachers/show', { teacher })
}
