const express = require("express")
const router = express.Router()
const { addPerson, getPeople, getSinglePerson, updatePerson, deletePerson } = require("../controllers/people.js")

router.get('/', getPeople)
router.post('/', addPerson)
router.get('/:id', getSinglePerson)
router.put('/:id', updatePerson)
router.delete('/:id', deletePerson)

module.exports = router