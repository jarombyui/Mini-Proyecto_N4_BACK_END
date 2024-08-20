import swaggerJSDoc from 'swagger-jsdoc'
import { serve, setup } from 'swagger-ui-express'
import { PORT } from './src/config/config.js'

// Información básica de la API
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Api Users Loggin MP DEV 4',
      version: '3.0.0',
      description: 'Documentación de la API para el sistema de loggin users',
      contact: {
        name: 'Adrian Esteban Saltos Salazar',
        url: 'https://github.com/Aesaltos2/Final_Proyect',
        email: 'adri.esteb.96@gmail.com'
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
          description: 'Servidor de desarrollo'
        }
      ]
    }
  },
  apis: ['./src/routes/*.js']
}

// Documentación en formato JSON
const swaggerSpec = swaggerJSDoc(options)

// Función para mostrar la documentación
export const swaggerDocs = (app) => {
  app.use('/api-docs', serve, setup(swaggerSpec))
  console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`)
}

export default swaggerDocs
