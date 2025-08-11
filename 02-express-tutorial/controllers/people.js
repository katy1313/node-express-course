let { people } = require('../data.js')

const getPeople = (req, res) => {
    res.status(200).json({ success: true, data: people })
}

const addPerson = (req, res) => {
    const name = req.body
    if (!name) {
        return res.status(400).json({ success: false, message: "Please provide a name" })
    }
    people.push({ id: people.length + 1, name: name })
    res.status(201).json({ success: true, name: name })
}

const getSinglePerson = (req, res) => {
    const { id } = req.params
    const person = people.find((person) => person.id === Number(id))
    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `no person with id ${id}` })
    }
    res.status(200).json({ success: true, data: person })
}

const updatePerson = (req, res) => {
    const { id } = req.params
    const { name } = req.body

    const person = people.find((person) => person.id === Number(id))
    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `no person with id ${id}` })
    }
    const newPerson = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name
        }
        return person
    })
    res.status(200).json({ success: true, data: newPerson })
}

const deletePerson = (req, res) => {
    const { id } = req.params
    const person = people.find((person) => person.id === Number(id))
    if(!person) {
        return res
            .status(404)
            .json({success: false, msg: `no person with id ${id}` })
    }
    const newPeople = people.filter((person) => {
        person.id !== Number(id)
    })
    res.status(200).json({ success: true, data: newPeople})

}

module.exports = { getPeople, addPerson, getSinglePerson, updatePerson, deletePerson }