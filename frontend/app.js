document.addEventListener('DOMContentLoaded', () => {
    

    const loginArea = document.getElementById('login-area');
    const appArea = document.getElementById('app-area');
    const loginForm = document.getElementById('loginForm');
    const veiculoForm = document.getElementById('veiculoForm');
    const veiculosList = document.getElementById('veiculos-list');
    const logoutButton = document.getElementById('logoutButton');
    const messageArea = document.getElementById('message-area');

    const API_URL = 'http://localhost:3000'; 


    const fetchVeiculos = async () => {
        const token = localStorage.getItem('token');
        if (!token) return; 

        try {
            const response = await fetch(`${API_URL}/api/veiculos`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });

            if (!response.ok) {
                throw new Error('Falha ao buscar veículos.');
            }

            const veiculos = await response.json();
            veiculosList.innerHTML = '';
            
            if (veiculos.length === 0) {
                veiculosList.innerHTML = '<p>Nenhum veículo cadastrado.</p>';
            } else {
                veiculos.forEach(v => {
                    const veiculoDiv = document.createElement('div');
                    veiculoDiv.innerHTML = `<strong>Placa:</strong> ${v.placa} | <strong>Descrição:</strong> ${v.descricao} | <strong>Início:</strong> ${new Date(v.data_inicio_aluguel).toLocaleDateString()}`;
                    veiculosList.appendChild(veiculoDiv);
                });
            }
        } catch (error) {
            messageArea.textContent = `Erro: ${error.message}`;
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
            loginArea.style.display = 'none';
            appArea.style.display = 'block';
            messageArea.textContent = `Bem-vindo!`;
            fetchVeiculos();
        } catch (error) {
            messageArea.textContent = `Erro: ${error.message}`;
            messageArea.style.color = 'red';
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
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({ placa, descricao, data_inicio_aluguel })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            messageArea.textContent = 'Veículo cadastrado com sucesso!';
            messageArea.style.color = 'green';
            veiculoForm.reset(); 
            fetchVeiculos(); 
        } catch (error) {
            messageArea.textContent = `Erro: ${error.message}`;
            messageArea.style.color = 'red';
        }
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token');
        loginArea.style.display = 'block';
        appArea.style.display = 'none';
        messageArea.textContent = '';
    });
});