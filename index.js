// script.js

const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const counter = document.getElementById("completed-counter");

let completedTasks = 0;

const tarefasIniciais = [
  { nome: "Implementar tela de listagem de tarefas", etiqueta: "frontend", data: "21/08/2024", concluida: false },
  { nome: "Criar endpoint para cadastro de tarefas", etiqueta: "backend", data: "21/08/2024", concluida: false },
  { nome: "Implementar protótipo da listagem de tarefas", etiqueta: "ux", data: "21/08/2024", concluida: false }
];

function criarTarefaHTML(tarefa) {
  const div = document.createElement("div");
  div.className = "task";
  if (tarefa.concluida) div.classList.add("completed");

  div.innerHTML = `
    <strong>${tarefa.nome}</strong>
    <span class="label">${tarefa.etiqueta}</span>
    <span class="date">Criado em: ${tarefa.data}</span>
    <button class="concluir">${tarefa.concluida ? '✔️' : 'Concluir'}</button>
  `;

  const btn = div.querySelector(".concluir");
  btn.addEventListener("click", () => {
    if (!tarefa.concluida) {
      tarefa.concluida = true;
      div.classList.add("completed");
      btn.textContent = "✔️";
      atualizarContador();
    }
  });

  return div;
}

function atualizarContador() {
  completedTasks = document.querySelectorAll(".task.completed").length;
  counter.textContent = `${completedTasks} tarefa${completedTasks === 1 ? '' : 's'} concluída${completedTasks === 1 ? '' : 's'}`;
}

function carregarTarefasIniciais() {
  tarefasIniciais.forEach(tarefa => {
    const elemento = criarTarefaHTML(tarefa);
    taskList.appendChild(elemento);
  });
  atualizarContador();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.getElementById("task-name").value;
  const etiqueta = document.getElementById("task-label").value;
  const data = new Date().toLocaleDateString("pt-BR");

  const novaTarefa = {
    nome,
    etiqueta,
    data,
    concluida: false
  };

  const elemento = criarTarefaHTML(novaTarefa);
  taskList.appendChild(elemento);
  form.reset();
});

carregarTarefasIniciais();
