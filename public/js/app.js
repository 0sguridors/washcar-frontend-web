// CarWash - JavaScript Principal

document.addEventListener('DOMContentLoaded', function() {
    console.log('CarWash App iniciado!');
    initializeApp();
});

// Inicializar aplicação
function initializeApp() {
    checkUserSession();
    setupEventListeners();
    setupPWA();
}

// Gerenciamento de telas
function showLoginScreen() {
    hideAllScreens();
    document.getElementById('loginScreen').style.display = 'flex';
}

function showHomeScreen() {
    hideAllScreens();
    document.getElementById('homeScreen').style.display = 'block';
    updateBottomNav('home');
    simulateLogin(); // Simula login automático
}

function showRegisterScreen() {
    alert('Tela de registro será implementada em breve!');
}

function showVehiclesScreen() {
    alert('Tela de veículos será implementada em breve!');
    updateBottomNav('vehicles');
}

function showScheduleScreen() {
    alert('Tela de agendamento será implementada em breve!');
    updateBottomNav('schedule');
}

function showProfileScreen() {
    alert('Tela de perfil será implementada em breve!');
    updateBottomNav('profile');
}

function hideAllScreens() {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.style.display = 'none';
    });
}

// Atualizar navegação inferior
function updateBottomNav(activeTab) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    const activeMap = {
        'home': 0,
        'vehicles': 1,
        'schedule': 2,
        'profile': 3
    };
    
    if (navItems[activeMap[activeTab]]) {
        navItems[activeMap[activeTab]].classList.add('active');
    }
}

// Verificar sessão do usuário
function checkUserSession() {
    const token = localStorage.getItem('carwash_token');
    if (token) {
        showHomeScreen();
    } else {
        showLoginScreen();
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Listener para pesquisa
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    // Listeners para service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            handleServiceCardClick(index);
        });
    });
}

// Realizar pesquisa
function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim();
    
    if (query) {
        console.log('Pesquisando por:', query);
        alert(`Pesquisando lava-rápidos próximos: ${query}`);
    } else {
        alert('Digite algo para pesquisar!');
    }
}

// Lidar com cliques nos cards de serviço
function handleServiceCardClick(index) {
    const services = [
        'Membership VIP - Fila prioritária e benefícios exclusivos!',
        'Serviços Personalizados - Escolha exatamente o que seu carro precisa!',
        'Plano de Fidelidade - Acumule pontos e ganhe lavagens grátis!',
        'Pacotes Empresariais - Soluções especiais para frotas!'
    ];
    
    const actions = [
        () => alert('VIP: Sem filas, atendimento premium, desconto de 20%!'),
        () => alert('Personalizados: Cera, enceramento, hidratação de pneus!'),
        () => alert('Fidelidade: A cada 5 lavagens, ganhe 1 grátis!'),
        () => alert('Empresarial: Contratos mensais, relatórios detalhados!')
    ];
    
    console.log('Serviço selecionado:', services[index]);
    actions[index]();
}

// Simulação de login
function simulateLogin() {
    const token = 'carwash_token_' + Date.now();
    localStorage.setItem('carwash_token', token);
    localStorage.setItem('carwash_user', JSON.stringify({
        name: 'Usuário Demo',
        email: 'demo@carwash.com',
        phone: '(41) 99999-9999',
        membershipType: 'standard'
    }));
}

// Logout
function logout() {
    localStorage.removeItem('carwash_token');
    localStorage.removeItem('carwash_user');
    showLoginScreen();
}

// Configuração PWA
function setupPWA() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registrado com sucesso');
            })
            .catch(error => {
                console.log('Erro ao registrar Service Worker:', error);
            });
    }
    
    // Prompt de instalação PWA
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallButton();
    });
    
    function showInstallButton() {
        const installBtn = document.createElement('button');
        installBtn.innerHTML = '📱 Instalar App';
        installBtn.className = 'install-btn';
        installBtn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #6366f1;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 20px;
            cursor: pointer;
            z-index: 1000;
            font-size: 14px;
        `;
        
        installBtn.onclick = () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('PWA instalado com sucesso!');
                    }
                    deferredPrompt = null;
                    installBtn.remove();
                });
            }
        };
        
        document.body.appendChild(installBtn);
        
        // Remove botão após 10 segundos se não clicar
        setTimeout(() => {
            if (installBtn.parentNode) {
                installBtn.remove();
            }
        }, 10000);
    }
}

// Funções utilitárias
function formatPhone(phone) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 1000;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Exposar funções globalmente para uso no HTML
window.showHomeScreen = showHomeScreen;
window.showLoginScreen = showLoginScreen;
window.showRegisterScreen = showRegisterScreen;
window.showVehiclesScreen = showVehiclesScreen;
window.showScheduleScreen = showScheduleScreen;
window.showProfileScreen = showProfileScreen;
window.logout = logout;