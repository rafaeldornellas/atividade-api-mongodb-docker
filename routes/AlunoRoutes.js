import { Router } from "express";
import {
  create,
  list,
  findOne,
  update,
  remove,
  getAlunosPorCurso,
  getAlunoPorMatricula,
  getAlunosAtivos,
  getAlunosPorPeriodo
} from "../controllers/AlunoController.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Aluno:
 *       type: object
 *       required:
 *         - nome
 *         - matricula
 *         - email
 *         - curso
 *         - periodo
 *         - dataNascimento
 *       properties:
 *         _id:
 *           type: string
 *           description: ID automático do aluno
 *         nome:
 *           type: string
 *           description: Nome completo do aluno
 *         matricula:
 *           type: string
 *           description: Número de matrícula único
 *         email:
 *           type: string
 *           format: email
 *           description: Email do aluno
 *         curso:
 *           type: string
 *           description: Curso do aluno
 *         periodo:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *           description: Período atual (1-10)
 *         dataNascimento:
 *           type: string
 *           format: date
 *           description: Data de nascimento (YYYY-MM-DD)
 *         ativo:
 *           type: boolean
 *           description: Status do aluno
 *           default: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         nome: "João Silva"
 *         matricula: "20240001"
 *         email: "joao.silva@email.com"
 *         curso: "Engenharia de Software"
 *         periodo: 3
 *         dataNascimento: "2000-05-15"
 *         ativo: true
 */

/**
 * @swagger
 * /api/alunos:
 *   post:
 *     summary: Criar um novo aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       400:
 *         description: Dados inválidos ou matrícula/email já existe
 */
router.post("/alunos", create);

/**
 * @swagger
 * /api/alunos:
 *   get:
 *     summary: Listar todos os alunos
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: Lista de alunos recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Aluno'
 */
router.get("/alunos", list);

// CRUD Básico
router.post("/alunos", create);
router.get("/alunos", list);
router.get("/alunos/:id", findOne);
router.put("/alunos/:id", update);
router.delete("/alunos/:id", remove);

// Rotas extras específicas para Aluno
router.get("/alunos/curso/:curso", getAlunosPorCurso);
router.get("/alunos/matricula/:matricula", getAlunoPorMatricula);
router.get("/alunos/status/ativos", getAlunosAtivos);
router.get("/alunos/periodo/:periodo", getAlunosPorPeriodo);

export default router;