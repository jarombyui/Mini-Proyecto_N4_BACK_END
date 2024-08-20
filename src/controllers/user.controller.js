import { User } from "../models/Users.js"
import path from 'path'
import fs from 'fs/promises'

export const userInfo = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.userId(id)
        if (user.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' })

        res.json(user[0])

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createNewUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ message: 'Falta ingresar datos' })

        // Verificar si el correo ya existe en la base de datos
        const existingUser = await User.findByEmail(email)
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'Este correo ya pertenece a un usuario' })
        }

        const newUser = await User.createUser(email, password)

        if (newUser.affectedRows === 1) {
            return res.status(201).json({ message: 'Usuario creado con éxito' })
        }

        return res.status(500).json({ message: 'Hubo un error interno al crear el usuario' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const editNewUser = async (req, res) => {
    try {
        const { id } = req.params
        const { name, biography, phone, email, password } = req.body
        const photo = req.file ? req.file.filename : ''

        if (!email) return res.status(400).json({ message: 'El email o password no pueden estar vacíos' })

        const newUser = await User.editUser(id, name, biography, phone, email, password, photo)

        if (newUser.affectedRows === 1) return res.status(200).json({ message: 'Usuario editado con éxito' })

        return res.status(500).json({ message: 'Hubo un error interno al editar el usuario' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const imageProfile = async (req, res) => {
    try {
        const { filename } = req.params
        const ruta = path.resolve(`./public/${filename}`)

        await fs.access(ruta)

        res.sendFile(ruta)
    } catch (error) {
        if (error.errno === -4058) {
            return res.status(404).json({ message: 'La foto no se pudo encontrar' })
        }
        res.status(500).json({ message: error.message })
    }
}




// import { User } from "../models/Users.js"
// import path from 'path'
// import fs from 'fs/promises'

// export const userInfo = async (req, res) => {
//     try {
//         const { id } = req.params
//         const user = await User.userId(id)
//         if (user.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' })

//         res.json(user[0])

//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// }

// export const createNewUser = async (req, res) => {
//     try {

//         const { email, password } = req.body
//         if (!email || !password) return res.status(500).json({ message: 'Falta ingresar datos' })

//         const newUser = await User.createUser(email, password)

//         if (newUser.affectedRows === 1) return res.status(200).json({ message: 'Usuario creado con exito' })

//         return res.status(500).json({ message: 'Hubo un error interno al crear el usuario' })




//     } catch (error) {

//         if (error.errno === 1062) { return res.status(500).json({ message: 'Este correo ya pertenece a un usuario' }) }
//         res.status(500).json({ message: error.message })
//     }
// }
// export const editNewUser = async (req, res) => {
//     try {
//         const { id } = req.params
//         const { name, biography, phone, email, password } = req.body
//         console.log(req.file);

//         const photo = req.file? req.file.filename : ''

//         if (!email) return res.status(500).json({ message: 'El email o password no pueden estar vacios' })

//         const newUser = await User.editUser(id, name, biography, phone, email, password, photo)

//         if (newUser.affectedRows === 1) return res.status(200).json({ message: 'Usuario editado con exito' })

//         return res.status(500).json({ message: 'Hubo un error interno al editar el usuario' })

//     } catch (error) {
     
//         res.status(500).json({ message: error.message })
//     }
// }
// export const imageProfile = async (req, res) => {
//     try {
//         const { filename } = req.params
//         const ruta = path.resolve(`./public/${filename}`)

//         await fs.access(ruta)

//         res.sendFile(ruta)
//     } catch (error) {
//         if(error.errno === -4058) {return res.status(404).json({message: 'La foto no se pudo encontrar'})}
//         res.status(500).json({ message: error.message })
//     }
// }
