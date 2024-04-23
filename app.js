const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

let tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const newTasks = req.body;
    tasks.push(...newTasks);
    res.status(201).json({ message: 'Tarefa adicionada com sucesso!'});
});

app.delete('/tasks/:index', (req, res) => {
    const { index } = req.params;
    tasks.splice(index, 1);
    res.send('Tarefa removida!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});