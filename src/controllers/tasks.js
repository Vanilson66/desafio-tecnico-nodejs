const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const Task = require('../models/task');
const { verifyJWT } = require("../middleware/auth")
const SECRET = 'secret'


/**
 * @swagger
 * /api/getToken:
 *   get:
 *     summary: Obtém um token de autenticação.
 *     description: Com o token o cliente consegue acessar rotas protegidas.
 *     responses:
 *       201:
 *         description: Token de autenticação gerado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   description: Indica se a autenticação foi bem-sucedida.
 *                 token:
 *                   type: string
 *                   description: Token de autenticação JWT.
 */
router.get('/getToken', async (req, res) => {
  try {
    const token = jwt.sign({id: Math.random() * 10}, SECRET, {expiresIn: 500})
    res.status(201).json({auth: true, token});
  } catch (error) {
    res.status(400).send(error.message);
  }
});



/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Listar todas as tarefas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tarefas
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Task'
 */
router.get('/task', verifyJWT, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(400).send(error.message);
  }
});



/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Adicionar uma nova tarefa
 *     tags: [Tasks]
 *     parameters:
 *       - in: body
 *         name: title
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Task'
 *       - in: body
 *         name: description
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Task'
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         schema:
 *           $ref: '#/definitions/Task'
 *       400:
 *         description: Parâmetros inválidos
 */
router.post("/task", verifyJWT, async (req, res) => {
  const taskObject = req.body

  try {
    await Task.create(taskObject);
    res.status(201).json({ created: true })
  } catch (error) {
    res.status(400).send("Insira um title e uma description");
  } 
})



/**
 * @swagger
 * /tasks/{title}:
 *   put:
 *     summary: Editar uma tarefa existente
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         type: string
 *         description: titulo da tarefa
 *       - in: body
 *         name: task
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Task'
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         schema:
 *           $ref: '#/definitions/Task'
 *       400:
 *         description: Parâmetros inválidos
 *       404:
 *         description: Tarefa não encontrada
 */
router.put('/task/:title', verifyJWT, async (req, res) => {
  try {
    const { description, completed } = req.body;
    const task = await Task.findOneAndUpdate({title: req.params.title}, { description, completed }, { new: true });
    if (!task) {
      return res.status(404).send('Tarefa não encontrada.');
    }
    res.json(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});



/**
 * @swagger
 * /tasks/{title}:
 *   delete:
 *     summary: Excluir uma tarefa
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: tile
 *         required: true
 *         type: string
 *         description: Title da tarefa
 *     responses:
 *       204:
 *         description: Tarefa excluída com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */
router.delete('/task/:title', verifyJWT, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({title: req.params.title});
    if (!task) {
      return res.status(404).send('Tarefa não encontrada.');
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error.message);
  }
});



/**
 * @swagger
 * /tasks/{title}/complete:
 *   put:
 *     summary: Marcar uma tarefa como concluída
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         type: string
 *         description: titulo da tarefa
 *     responses:
 *       200:
 *         description: Tarefa marcada como concluída com sucesso
 *         schema:
 *           $ref: '#/definitions/Task'
 *       404:
 *         description: Tarefa não encontrada
 */
router.put('/:title/complete', verifyJWT, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({title: req.params.title}, { completed: true }, { new: true });
    if (!task) {
      return res.status(404).send('Tarefa não encontrada.');
    }
    res.json(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


module.exports = router;
