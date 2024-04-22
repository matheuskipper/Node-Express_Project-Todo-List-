const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const newTasks = req.body;
    tasks.push(...newTasks);
    res.status(201).json({ message: 'Tarefa adicionada com sucesso!'});
});

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks.splice(id, 1);
    res.send('Tarefa removida!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})