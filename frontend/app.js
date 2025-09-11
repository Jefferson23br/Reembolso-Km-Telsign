document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.getElementById('main-container');
    const loginArea = document.getElementById('login-area');
    const dashboardArea = document.getElementById('dashboard-area');
    const loginForm = document.getElementById('loginForm');
    const veiculoForm = document.getElementById('veiculoForm');
    const veiculosList = document.getElementById('veiculos-list');
    const logoutButton = document.getElementById('logoutButton');
    const messageArea = document.getElementById('message-area');
    const menuButtons = document.querySelectorAll('.dashboard-menu button');
    const views = document.querySelectorAll('.view');
    
    const editModal = document.getElementById('edit-veiculo-modal');
    const editForm = document.getElementById('editVeiculoForm');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');

    const API_URL = 'http://localhost:3000';

    const showView = (viewId) => {
        views.forEach(view => view.style.display = 'none');
        const viewToShow = document.getElementById(viewId);
        if (viewToShow) {
            viewToShow.style.display = 'block';
        }
        menuButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.view === viewId);
        });
        if (viewId === 'view-listar-veiculo') {
            fetchVeiculos();
        }
    };

    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const viewId = button.dataset.view;
            showView(viewId);
        });
    });

    const showLogin = () => {
        mainContainer.classList.add('container-login');
        mainContainer.classList.remove('container-app');
        loginArea.style.display = 'block';
        dashboardArea.style.display = 'none';
    };

    const showDashboard = () => {
        mainContainer.classList.remove('container-login');
        mainContainer.classList.add('container-app');
        loginArea.style.display = 'none';
        dashboardArea.style.display = 'block';
        showView('view-home');
    };

    const fetchVeiculos = async () => {
        const token = localStorage.getItem('token');
        if (!token) { showLogin(); return; }

        try {
            const response = await fetch(`${API_URL}/api/veiculos`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 401) {
                localStorage.removeItem('token');
                showLogin();
                throw new Error('Sua sessão expirou. Faça login novamente.');
            }
            if (!response.ok) throw new Error('Falha ao buscar veículos.');

            const veiculos = await response.json();
            veiculosList.innerHTML = '';
            
            if (veiculos.length === 0) {
                veiculosList.innerHTML = '<p>Nenhum veículo cadastrado.</p>';
            } else {
                veiculos.forEach(v => {
                    const veiculoDiv = document.createElement('div');
                    veiculoDiv.className = 'veiculo-item';
                    
                    const dataInicio = new Date(v.data_inicio_aluguel).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
                    const dataFim = v.data_fim_aluguel ? new Date(v.data_fim_aluguel).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : 'Em aberto';

                    veiculoDiv.innerHTML = `
                        <div>
                            <strong>${v.placa}</strong> (${v.descricao})<br>
                            <small>Aluguel: ${dataInicio} - ${dataFim}</small>
                        </div>
                        <button class="edit-btn" data-id="${v.id}">Editar</button>
                    `;
                    veiculosList.appendChild(veiculoDiv);
                });
            }
        } catch (error) {
            messageArea.textContent = `Erro: ${error.message}`;
            messageArea.className = 'message error';
        }
    };
    
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            localStorage.setItem('token', data.token);
            messageArea.textContent = '';
            showDashboard();
        } catch (error) {
            messageArea.textContent = `Erro: ${error.message}`;
            messageArea.className = 'message error';
        }
    });

    veiculoForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const placa = document.getElementById('placa').value;
        const descricao = document.getElementById('descricao').value;
        const data_inicio_aluguel = document.getElementById('data_inicio_aluguel').value;

        try {
            const response = await fetch(`${API_URL}/api/veiculos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ placa, descricao, data_inicio_aluguel })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            messageArea.textContent = 'Veículo cadastrado com sucesso!';
            messageArea.className = 'message success';
            veiculoForm.reset();
            showView('view-listar-veiculo'); 
        } catch (error) {
            messageArea.textContent = `Erro: ${error.message}`;
            messageArea.className = 'message error';
        }
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token');
        messageArea.textContent = 'Você saiu com sucesso.';
        messageArea.className = 'message success';
        showLogin();
    });

    veiculosList.addEventListener('click', async (event) => {
        if (event.target.classList.contains('edit-btn')) {
            const veiculoId = event.target.dataset.id;
            const token = localStorage.getItem('token');

            const response = await fetch(`${API_URL}/api/veiculos`, { headers: { 'Authorization': `Bearer ${token}` }});
            const veiculos = await response.json();
            const veiculoParaEditar = veiculos.find(v => v.id == veiculoId);

            if (veiculoParaEditar) {
                document.getElementById('edit-veiculo-id').value = veiculoParaEditar.id;
                document.getElementById('edit-placa').value = veiculoParaEditar.placa;
                document.getElementById('edit-descricao').value = veiculoParaEditar.descricao;
                document.getElementById('edit-data_inicio_aluguel').value = new Date(veiculoParaEditar.data_inicio_aluguel).toISOString().split('T')[0];
                document.getElementById('edit-data_fim_aluguel').value = veiculoParaEditar.data_fim_aluguel ? new Date(veiculoParaEditar.data_fim_aluguel).toISOString().split('T')[0] : '';
                editModal.style.display = 'flex';
            }
        }
    });

    editForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const veiculoId = document.getElementById('edit-veiculo-id').value;

        const updatedData = {
            placa: document.getElementById('edit-placa').value,
            descricao: document.getElementById('edit-descricao').value,
            data_inicio_aluguel: document.getElementById('edit-data_inicio_aluguel').value,
            data_fim_aluguel: document.getElementById('edit-data_fim_aluguel').value,
        };

        try {
            const response = await fetch(`${API_URL}/api/veiculos/${veiculoId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(updatedData)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            editModal.style.display = 'none';
            fetchVeiculos();
            messageArea.textContent = 'Veículo atualizado com sucesso!';
            messageArea.className = 'message success';
        } catch (error) {
            messageArea.textContent = `Erro: ${error.message}`;
            messageArea.className = 'message error';
        }
    });

    cancelEditBtn.addEventListener('click', () => {
        editModal.style.display = 'none';
    });
    
    const token = localStorage.getItem('token');
    if (token) {
        showDashboard();
    } else {
        showLogin();
    }

    document.getElementById('currentYear').textContent = new Date().getFullYear();
});