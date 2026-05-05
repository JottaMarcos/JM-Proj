/* ============================================
   TAB NAVIGATION (SPA)
   ============================================ */

// Switch to a specific tab
function switchTab(tabId) {
    // Remove active from all tabs and buttons
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Activate the selected tab
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.add('active');

        // Trigger animation
        requestAnimationFrame(() => {
            targetTab.style.opacity = '1';
            targetTab.style.transform = 'translateY(0)';
        });
    }

    // Activate the corresponding button
    const activeBtn = document.querySelector(`.nav-btn[data-tab="${tabId}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // Close mobile menu
    document.querySelector('.nav').classList.remove('open');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL hash (for sharing links)
    history.pushState(null, '', `#${tabId}`);
}

// Event listeners for nav buttons
document.querySelectorAll('.nav-btn, .nav-btn-cta').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        switchTab(tabId);
    });
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '') || 'inicio';
    switchTab(hash);
});

// Load tab from URL hash on page load
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '') || 'inicio';
    switchTab(hash);
});

/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('open');
        menuToggle.classList.remove('active');
    }
});

/* ============================================
   SMOOTH SCROLL FOR FOOTER LINKS
   ============================================ */
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

/* ============================================
   FORM HANDLING (placeholder)
   ============================================ */
document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Formulário pronto! Conecte ao seu serviço de e-mail ou formulário (ex: Formspree, EmailJS).');
});

/* ============================================
   INTERSECTION OBSERVER (fade-in on scroll)
   ============================================ */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards and stat items
document.querySelectorAll('.project-placeholder, .stat-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
/* ============================================
   GRÁFICOS - ANÁLISE DE DADOS (Chart.js)
   ============================================ */

// Carrega Chart.js se não estiver carregado
function loadCharts() {
    if (typeof Chart === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = initCharts;
        document.head.appendChild(script);
    } else {
        initCharts();
    }
}

function initCharts() {
    // Configuração global
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.font.family = "'Inter', sans-serif";

    // Gráfico 1: Vendas por Canal (Doughnut)
    const channelCtx = document.getElementById('channelChart');
    if (channelCtx) {
        new Chart(channelCtx, {
            type: 'doughnut',
            data: {  // ✅ CORRIGIDO: adicionado "data:"
                labels: ['Orgânico', 'Ads', 'Social', 'Email'],
                datasets: [{
                    data: [45, 30, 15, 10],  // ✅ CORRIGIDO: adicionado "data:"
                    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
                    borderWidth: 0,
                    spacing: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { padding: 20, usePointStyle: true } }
                },
                cutout: '65%'
            }
        });
    }

    // Gráfico 2: Evolução Mensal (Line)
    const trendCtx = document.getElementById('trendChart');
    if (trendCtx) {
        new Chart(trendCtx, {
            type: 'line',
            data: {  // ✅ CORRIGIDO
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Faturamento (R$ mil)',
                    data: [180, 195, 210, 235, 260, 284.5],  // ✅ CORRIGIDO
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#3b82f6',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: false, grid: { color: 'rgba(148, 163, 184, 0.1)' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // Gráfico 3: Funil de Conversão (Bar Horizontal)
    const funnelCtx = document.getElementById('funnelChart');
    if (funnelCtx) {
        new Chart(funnelCtx, {
            type: 'bar',
            data: {  // ✅ CORRIGIDO
                labels: ['Visitantes', 'Clicaram', 'Add Carrinho', 'Compraram'],
                datasets: [{
                    label: 'Usuários',
                    data: [10000, 3200, 890, 320],  // ✅ CORRIGIDO
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(59, 130, 246, 0.6)',
                        'rgba(59, 130, 246, 0.4)',
                        'rgba(59, 130, 246, 1)'
                    ],
                    borderWidth: 0,
                    borderRadius: 4
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { beginAtZero: true, grid: { color: 'rgba(148, 163, 184, 0.1)' } },
                    y: { grid: { display: false } }
                }
            }
        });
    }
}

// Inicializa gráficos quando a aba de dados for ativada
document.addEventListener('DOMContentLoaded', () => {
    const dadosTab = document.getElementById('dados');
    if (dadosTab) {
        const observer = new MutationObserver((mutations) => {
            if (dadosTab.classList.contains('active')) {
                loadCharts();
                observer.disconnect();
            }
        });
        observer.observe(dadosTab, { attributes: true, attributeFilter: ['class'] });
    }
});
/* ============================================
   CRM - INTERATIVIDADE DO ECOSISTEMA
   ============================================ */

// Clique nos nós do diagrama para mostrar detalhes
document.querySelectorAll('.eco-node').forEach(node => {
    node.addEventListener('click', () => {
        // Remove active de todos
        document.querySelectorAll('.eco-node').forEach(n => n.classList.remove('active'));
        document.querySelectorAll('.detail-content').forEach(d => d.classList.remove('active'));
        
        // Adiciona active no clicado
        node.classList.add('active');
        
        // Mostra o detalhe correspondente
        const infoKey = node.getAttribute('data-info');
        const detail = document.getElementById(`detail-${infoKey}`);
        if (detail) {
            detail.classList.add('active');
        }
    });
});

// Ativa o CRM central por padrão ao carregar a aba
document.addEventListener('DOMContentLoaded', () => {
    const crmTab = document.getElementById('crm');
    if (crmTab) {
        const observer = new MutationObserver((mutations) => {
            if (crmTab.classList.contains('active')) {
                // Ativa CRM central por padrão
                document.querySelector('.eco-node.center')?.classList.add('active');
                document.getElementById('detail-crm')?.classList.add('active');
                observer.disconnect();
            }
        });
        observer.observe(crmTab, { attributes: true, attributeFilter: ['class'] });
    }
});