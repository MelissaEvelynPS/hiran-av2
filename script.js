const form = document.getElementById('avisoForm');
const listaAvisos = document.getElementById('listaAvisos');

// Função para carregar avisos do LocalStorage
function carregarAvisos() {
  const avisos = JSON.parse(localStorage.getItem('avisos')) || [];
  listaAvisos.innerHTML = '';

  avisos.forEach((aviso, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${aviso.titulo}</strong><br>
      <p>${aviso.descricao}</p>
      <small>📅 ${aviso.data} | 👤 ${aviso.destinatario}</small><br>
      <button onclick="excluirAviso(${index})">Excluir</button>
    `;
    listaAvisos.appendChild(li);
  });
}

// Função para adicionar um novo aviso
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  const data = document.getElementById('data').value;
  const destinatario = document.getElementById('destinatario').value;

  const novoAviso = { titulo, descricao, data, destinatario };

  const avisos = JSON.parse(localStorage.getItem('avisos')) || [];
  avisos.push(novoAviso);
  localStorage.setItem('avisos', JSON.stringify(avisos));

  form.reset();
  carregarAvisos();
});

// Função para excluir aviso
function excluirAviso(index) {
  const avisos = JSON.parse(localStorage.getItem('avisos')) || [];
  avisos.splice(index, 1);
  localStorage.setItem('avisos', JSON.stringify(avisos));
  carregarAvisos();
}

// Carrega os avisos assim que a página abre
window.onload = () => {
    carregarSubmenu(); // <--- CHAMA A FUNÇÃO DE INCLUSÃO
    carregarAvisos();
};
