import { Router } from "express";
import { createNewUser, editNewUser, userInfo,imageProfile } from "../controllers/user.controller.js";
import { uploadImage } from "../config/multer.js";

const router = Router()

/**
 * @swagger
 * /:
 *   post:
 *     summary: "Crea un nuevo usuario"
 *     description: "Permite registrar un nuevo usuario en el sistema."
 *     parameters:
 *       - in: header
 *         name: origin
 *         description: "Origen de la solicitud."
 *         required: false
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: "Datos del nuevo usuario."
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: "user@example.com"
 *             password:
 *               type: string
 *               example: "password123"
 *           required:
 *             - email
 *             - password
 *     responses:
 *       '201':
 *         description: "Usuario creado exitosamente."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Usuario creado correctamente."
 *       '400':
 *         description: "Solicitud incorrecta. Puede haber un error en los datos proporcionados."
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Datos inválidos."
 *       '500':
 *         description: "Error interno del servidor."
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Error del servidor."
 */
router.post('/',createNewUser)

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: "Obtiene información de un usuario por ID"
 *     description: "Devuelve la información de un usuario específico identificado por su ID."
 *     parameters:
 *       - in: path
 *         name: id
 *         description: "ID del usuario."
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: origin
 *         description: "Origen de la solicitud."
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: "Información del usuario obtenida exitosamente."
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: "12345"
 *             email:
 *               type: string
 *               example: "user@example.com"
 *             name:
 *               type: string
 *               example: "John Doe"
 *             biography:
 *               type: string
 *               example: "Developer at XYZ"
 *             phone:
 *               type: string
 *               example: "+1234567890"
 *       '404':
 *         description: "Usuario no encontrado."
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Usuario no encontrado."
 *       '500':
 *         description: "Error interno del servidor."
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Error del servidor."
 */
router.get('/:id',userInfo)

/**
 * @swagger
 * /{id}:
 *   patch:
 *     summary: "Actualiza información de un usuario por ID"
 *     description: "Permite actualizar la información de un usuario específico identificado por su ID."
 *     parameters:
 *       - in: path
 *         name: id
 *         description: "ID del usuario."
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: origin
 *         description: "Origen de la solicitud."
 *         required: false
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: "Datos a actualizar del usuario."
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "John Doe"
 *             biography:
 *               type: string
 *               example: "Senior Developer"
 *             phone:
 *               type: string
 *               example: "+1234567890"
 *             email:
 *               type: string
 *               example: "john.doe@example.com"
 *             password:
 *               type: string
 *               example: "newpassword123"
 *     responses:
 *       '200':
 *         description: "Información del usuario actualizada exitosamente."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Usuario actualizado correctamente."
 *       '400':
 *         description: "Solicitud incorrecta. Puede haber un error en los datos proporcionados."
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Datos inválidos."
 *       '404':
 *         description: "Usuario no encontrado."
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Usuario no encontrado."
 *       '500':
 *         description: "Error interno del servidor."
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Error del servidor."
 */
router.patch('/:id',uploadImage.single('photo'),editNewUser)

/**
 * @swagger
 * /image/{filename}:
 *   get:
 *     summary: "Obtiene una imagen de usuario por nombre de archivo"
 *     description: "Permite obtener una imagen específica asociada a un usuario mediante el nombre de archivo."
 *     parameters:
 *       - in: path
 *         name: filename
 *         description: "Nombre del archivo de la imagen."
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: origin
 *         description: "Origen de la solicitud."
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: "Imagen obtenida exitosamente."
 *         schema:
 *           type: string
 *           format: binary
 *       '404':
 *         description: "Imagen no encontrada."
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Imagen no encontrada."
 *       '500':
 *         description: "Error interno del servidor."
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Error del servidor."
 */
router.get('/image/:filename',imageProfile)

export default router