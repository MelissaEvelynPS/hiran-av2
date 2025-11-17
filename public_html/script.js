const form = document.getElementById('avisoForm');
const listaAvisos = document.getElementById('listaAvisos');

// --- 1. FUNÇÃO PARA CARREGAR O SUBMENU (NOVA FUNÇÃO) ---
function carregarSubmenu() {
    // 1. Defina o ID do contêiner onde o submenu.html será inserido
    const container = document.getElementById('container-submenu'); 

    // Garante que o contêiner exista na página atual antes de tentar carregar
    if (container) {
        // 2. Tenta carregar o arquivo externo 'submenu.html'
        fetch('submenu.html')
            .then(response => {
                if (!response.ok) {
                    // Lança um erro se o arquivo não for encontrado (ex: erro 404)
                    throw new Error('Erro ao carregar submenu. Status: ' + response.status);
                }
                return response.text(); // Converte a resposta em texto HTML
            })
            .then(html => {
                // 3. Insere o conteúdo HTML no contêiner
                container.innerHTML = html;
            })
            .catch(error => {
                // Exibe erro no console caso a requisição falhe
                console.error('Falha na inclusão do submenu:', error);
                // Opcional: Mostra uma mensagem de erro ao usuário
                container.innerHTML = '<p style="color: red;">Erro ao carregar o menu.</p>'; 
            });
    }
}

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
