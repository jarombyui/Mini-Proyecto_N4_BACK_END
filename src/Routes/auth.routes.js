import { Router } from "express";
import { loginEmail } from "../controllers/auth.controller.js";
import { info, verifyToken } from "../middleware/verifyToken.js";

const router = Router()

/**
 * @swagger
 * /login:
 *   post:
 *     summary: "Inicia sesión de usuario"
 *     description: "Permite a un usuario autenticarse usando sus credenciales. Devuelve un token JWT si las credenciales son válidas."
 *     parameters:
 *       - in: header
 *         name: origin
 *         description: "Origen de la solicitud."
 *         required: false
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: "Credenciales del usuario."
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
 *       '200':
 *         description: "Inicio de sesión exitoso. Devuelve un token JWT."
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *       '400':
 *         description: "Solicitud incorrecta. Las credenciales pueden ser incorrectas o faltar."
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Credenciales inválidas."
 *       '403':
 *         description: "Acceso denegado. Las credenciales no son válidas."
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Acceso denegado."
 *       '500':
 *         description: "Error interno del servidor."
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Error del servidor."
 */
router.post('/login',loginEmail)

/**
 * @swagger
 * /info:
 *   get:
 *     summary: "Obtiene la información del usuario actual"
 *     description: "Devuelve la información del usuario basado en el token JWT proporcionado en el encabezado de autorización."
 *     parameters:
 *       - in: header
 *         name: origin
 *         description: "Origen de la solicitud."
 *         required: false
 *         schema:
 *           type: string
 *       - in: header
 *         name: authorization
 *         description: "Token JWT de autenticación."
 *         required: true
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
 *       '401':
 *         description: "Token no proporcionado o inválido."
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Token no válido o expirado."
 *       '500':
 *         description: "Error interno del servidor."
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Error del servidor."
 */
router.get('/info',verifyToken,info)

export default router