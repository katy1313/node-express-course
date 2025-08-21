const jwt = require('jsonwebtoken')


const logon = async(req, res) => {
    const {name, password} = req.body
    if(!name || !password) {
        throw new Error ('Name and password are required fields')
    }

    const id = Math.floor(Math.random*100)
    const token = jwt.sign({id, name}, process.env.JWT_SECRET, {expiresIn: '35d'})

    res.status(200).json({msg:'user created', token})
}

const hello = async(req, res) => {
    res.status(200).json({
        msg: `Hello, ${req.user.name}`
    })
}

module.exports = {logon, hello}
