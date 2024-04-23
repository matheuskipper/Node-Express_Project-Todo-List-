document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Função para carregar as tarefas
    const loadTasks = async () => {
        taskList.innerHTML = '';
        const response = await fetch('/tasks');
        const tasks = await response.json();
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;
            taskList.appendChild(li);
        });
    };

    // Carregar tarefas ao carregar a página
    loadTasks();

    // Enviar nova tarefa ao servidor
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const task = taskInput.value;
        if (task.trim() === '') return;
        await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([task])
        });
        taskInput.value = '';
        loadTasks();
    });

    // Remover tarefa ao clicar nela
    taskList.addEventListener('click', async (e) => {
        if (e.target.tagName === 'LI') {
            const index = Array.from(taskList.children).indexOf(e.target);
            const response = await fetch(`/tasks/${index}`, { method: 'DELETE' });
            if (response.ok) {
                loadTasks();
            } else {
                console.error('Erro ao remover tarefa');
            }
        }
    });
});