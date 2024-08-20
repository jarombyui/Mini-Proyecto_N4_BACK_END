import { SECRET_KEY } from "../config/config.js"
import jwt from 'jsonwebtoken'
import { User } from "../models/Users.js"


export const verifyToken = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        const decoded = jwt.verify(authorization, SECRET_KEY)
        const user = await User.userId(decoded.userId)
        if (user.length === 0) return res.status(404).json({ message: 'El token no pertence a ningun usuario' })

        req.user = user[0]
        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) { return res.status(400).json({ message: 'Token expirado' }) }
        res.status(500).json({ message: error.message })
    }
}

export const info = async (req, res) => {
    delete req.user.password
    res.json(req.user)
}