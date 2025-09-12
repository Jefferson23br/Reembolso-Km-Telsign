function initMap() {
    const options = {
        componentRestrictions: { country: "br" }, 
        fields: ["formatted_address", "name"],
        strictBounds: false,
    };
    try {
        const saidaInput = document.getElementById("viagem-saida");
        const chegadaInput = document.getElementById("viagem-chegada");
        new google.maps.places.Autocomplete(saidaInput, options);
        new google.maps.places.Autocomplete(chegadaInput, options);
    } catch (e) {
        console.error("Erro ao inicializar o Google Maps Autocomplete. Verifique a chave da API.", e);
    }
}

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
    const pageTitle = document.getElementById('page-title');
    const loginTitle = document.getElementById('login-title');
    const dashboardTitle = document.getElementById('dashboard-title');
    const viagemForm = document.getElementById('viagemForm');
    const viagemVeiculoSelect = document.getElementById('viagem-veiculo-select');
    const viagensList = document.getElementById('viagens-list');

    const API_URL = 'http://72.60..215:3000';
    const CONFIG = { appName: "Reembolso de Km" };

    const showView = (viewId) => {
        views.forEach(view => view.style.display = 'none');
        const viewToShow = document.getElementById(viewId);
        if (viewToShow) { viewToShow.style.display = 'block'; }
        menuButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.view === viewId);
        });
        if (viewId === 'view-listar-veiculo') fetchVeiculos();
        if (viewId === 'view-lancar-km') populateVeiculoSelect();
        if (viewId === 'view-listar-viagens') fetchViagens();
    };

    menuButtons.forEach(button => {
        button.addEventListener('click', (e) => showView(e.target.dataset.view));
    });

    const showLogin = () => { mainContainer.classList.add('container-login'); mainContainer.classList.remove('container-app'); loginArea.style.display = 'block'; dashboardArea.style.display = 'none'; };
    const showDashboard = () => { mainContainer.classList.remove('container-login'); mainContainer.classList.add('container-app'); loginArea.style.display = 'none'; dashboardArea.style.display = 'block'; showView('view-home'); };
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
    logoutButton.addEventListener('click', () => { localStorage.removeItem('token'); messageArea.textContent = 'Você saiu com sucesso.'; messageArea.className = 'message success'; showLogin(); });

    const fetchVeiculos = async () => {
        const token = localStorage.getItem('token');
        if (!token) { showLogin(); return; }
        try {
            const response = await fetch(`${API_URL}/api/veiculos`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (response.status === 401) { localStorage.removeItem('token'); showLogin(); throw new Error('Sessão expirou.'); }
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
                    veiculoDiv.innerHTML = `<div><strong>${v.placa}</strong> (${v.descricao})<br><small>Aluguel: ${dataInicio} - ${dataFim}</small></div><button class="edit-btn" data-id="${v.id}">Editar</button>`;
                    veiculosList.appendChild(veiculoDiv);
                });
            }
        } catch (error) {
            messageArea.textContent = `Erro: ${error.message}`;
            messageArea.className = 'message error';
        }
    };
    veiculoForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const data = {
            placa: document.getElementById('placa').value,
            descricao: document.getElementById('descricao').value,
            data_inicio_aluguel: document.getElementById('data_inicio_aluguel').value
        };
        try {
            const response = await fetch(`${API_URL}/api/veiculos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message);
            messageArea.textContent = 'Veículo cadastrado com sucesso!';
            messageArea.className = 'message success';
            veiculoForm.reset();
            showView('view-listar-veiculo'); 
        } catch (error) {
            messageArea.textContent = `Erro: ${error.message}`;
            messageArea.className = 'message error';
        }
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
    cancelEditBtn.addEventListener('click', () => { editModal.style.display = 'none'; });

    const populateVeiculoSelect = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_URL}/api/veiculos`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (!response.ok) throw new Error('Não foi possível carregar os veículos.');
            const veiculos = await response.json();
            viagemVeiculoSelect.innerHTML = '<option value="">-- Selecione um Veículo --</option>';
            veiculos.forEach(v => {
                if (!v.data_fim_aluguel) {
                    const option = document.createElement('option');
                    option.value = v.id;
                    option.textContent = `${v.placa} (${v.descricao})`;
                    viagemVeiculoSelect.appendChild(option);
                }
            });
        } catch (error) {
            messageArea.textContent = `Erro: ${error.message}`;
            messageArea.className = 'message error';
        }
    };
    viagemForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const viagemData = {
            veiculo_id: document.getElementById('viagem-veiculo-select').value,
            data_viagem: document.getElementById('viagem-data').value,
            distancia_percorrida: document.getElementById('viagem-distancia').value,
            local_saida: document.getElementById('viagem-saida').value,
            local_chegada: document.getElementById('viagem-chegada').value,
            descricao: document.getElementById('viagem-descricao').value,
        };
        try {
            const response = await fetch(`${API_URL}/api/viagens`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify(viagemData)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            messageArea.textContent = 'Viagem registrada com sucesso!';
            messageArea.className = 'message success';
            viagemForm.reset();
            showView('view-listar-viagens');
        } catch (error) {
            messageArea.textContent = `Erro: ${error.message}`;
            messageArea.className = 'message error';
        }
    });
    
    const fetchViagens = async () => {
        const token = localStorage.getItem('token');
        if (!token) { showLogin(); return; }
        try {
            const response = await fetch(`${API_URL}/api/viagens`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (!response.ok) throw new Error('Falha ao buscar viagens.');
            const viagens = await response.json();
            viagensList.innerHTML = '';
            if (viagens.length === 0) {
                viagensList.innerHTML = '<p>Nenhuma viagem registrada.</p>';
            } else {
                viagens.forEach(v => {
                    const viagemDiv = document.createElement('div');
                    viagemDiv.className = 'viagem-item';
                    const dataViagem = new Date(v.data_viagem).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

                    let statusClass = '';
                    switch (v.status_pagamento) {
                        case 'A Pagar':
                            statusClass = 'status-apagar';
                            break;
                        case 'Pago':
                            statusClass = 'status-pago';
                            break;
                        case 'Pago Parcial':
                            statusClass = 'status-pago-parcial';
                            break;
                        default:
                            statusClass = '';
                    }

                    viagemDiv.innerHTML = `
                        <div class="viagem-header">
                            <span>${dataViagem} - ${v.placa} (${Number(v.distancia_percorrida).toFixed(2)} km)</span>
                            <span class="status-badge ${statusClass}">${v.status_pagamento}</span>
                        </div>
                        <p class="viagem-details"><strong>Trajeto:</strong> ${v.local_saida || 'N/A'} → ${v.local_chegada || 'N/A'}</p>
                        <p class="viagem-details"><strong>Descrição:</strong> ${v.descricao || 'N/A'}</p>
                        <p class="viagem-details"><strong>Reembolso:</strong> R$ ${Number(v.valor_reembolso).toFixed(2)}</p>
                    `;
                    viagensList.appendChild(viagemDiv);
                });
            }
        } catch (error) {
            messageArea.textContent = `Erro: ${error.message}`;
            messageArea.className = 'message error';
        }
    };

    pageTitle.textContent = CONFIG.appName;
    loginTitle.textContent = CONFIG.appName;
    dashboardTitle.textContent = `Painel ${CONFIG.appName}`;
    const token = localStorage.getItem('token');
    if (token) { showDashboard(); } else { showLogin(); }
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});