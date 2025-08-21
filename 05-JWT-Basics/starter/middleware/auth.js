const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const authenticationMiddleware = async (req, res, next)  => {
    const authHeader = req.headers.authorization //check for autorization header

    if(!authHeader || !authHeader.startsWith('Bearer ')) { //check for the bearer
        throw new UnauthenticatedError('No token provided')
    }

    const token = authHeader.split(' ')[1] //getting a token
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username} = decoded //getting id and username from decoded
        req.user = {id, username}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route')
    }
}

module.exports = authenticationMiddleware