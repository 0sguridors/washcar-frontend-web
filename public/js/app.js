
console.log('CarWash iniciado!');

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    console.log('App inicializado');
    setupEventListeners();
}

function showHomeScreen() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('homeScreen').style.display = 'block';
    console.log('Tela principal aberta');
}

function showRegisterScreen() {
    alert('Tela de cadastro em desenvolvimento!');
}

function handleServiceCardClick(index) {
    const services = [
        'VIP: Sem filas, atendimento premium!',
        'Serviços Personalizados: Escolha o que seu carro precisa!',
        'Fidelidade: Acumule pontos e ganhe lavagens grátis!',
        'Empresarial: Soluções para frotas!'
    ];
    
    alert(services[index]);
    console.log('Serviço clicado:', services[index]);
}

function setupEventListeners() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value;
            if (query) {
                alert('Pesquisando por: ' + query);
            } else {
                alert('Digite algo para pesquisar!');
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = searchInput.value;
                if (query) {
                    alert('Pesquisando por: ' + query);
                } else {
                    alert('Digite algo para pesquisar!');
                }
            }
        });
    }
}

console.log('JavaScript carregado com sucesso!');