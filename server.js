import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import alunoRoutes from './routes/alunoRoutes.js'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Alunos - MongoDB',
      version: '1.0.0',
      description: 'API completa para gerenciamento de alunos com operações CRUD',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Servidor Local'
      }
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Conexão com MongoDB
const uri = process.env.MONGODB_URI || 'mongodb://mongodb:27017/alunosdb'

mongoose
    .connect(uri)
    .then(() => console.log('✅ MongoDB Conectado com sucesso'))
    .catch((err) => {
        console.error('❌ Erro ao conectar no MongoDB:', err.message)
        process.exit(1)
    })

// Rotas
app.get('/', (req, res) => res.json({
    success: true,
    message: '🚀 API de Alunos - MongoDB',
    documentation: `/api-docs`,
    endpoints: {
        alunos: '/api/alunos',
        'alunos por curso': '/api/alunos/curso/:curso',
        'aluno por matrícula': '/api/alunos/matricula/:matricula',
        'alunos ativos': '/api/alunos/status/ativos',
        'alunos por período': '/api/alunos/periodo/:periodo'
    }
}))

app.use('/api', alunoRoutes)

// Middleware de erro - DEVE VIR ANTES da rota curinga
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
    })
})

// Rota não encontrada - DEVE SER A ÚLTIMA
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Rota não encontrada'
    })
})

app.listen(port, () => {
    console.log(`🎯 Servidor rodando na porta ${port}`)
    console.log(`📍 URL: http://localhost:${port}`)
    console.log(`📚 Swagger: http://localhost:${port}/api-docs`)
})