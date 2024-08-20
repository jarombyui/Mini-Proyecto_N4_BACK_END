import { compare } from "bcrypt"
import { User } from "../models/Users.js"
import { SECRET_KEY } from "../config/config.js"
import jwt from 'jsonwebtoken'

export const loginEmail = async (req, res) => {

    try {
        const { email, password } = req.body
        const userInfo = await User.log(email)
       
        if (userInfo.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' })

        const validacion = await compare(password, userInfo[0].password)
        if (!validacion) return res.status(400).json({ message: 'Usuario o contraseña incorrecta' })

        const token = jwt.sign({ userId: userInfo[0].id }, SECRET_KEY, { expiresIn: '1h' })

        delete userInfo[0].password
        res.json({
            token,
            user: userInfo[0]
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}