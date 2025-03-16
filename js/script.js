/**
 * Script para a Pizzaria Brito
 * Desenvolvido por: [Seu Nome]
 * Data: [Data Atual]
 */

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav');
const scrollLinks = document.querySelectorAll('a[href^="#"]');

// Toggle Mobile Menu com animação suave
mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Previne que o evento se propague para o document
    
    if (navMenu.style.display === 'block') {
        // Fechar o menu
        navMenu.style.opacity = '0';
        setTimeout(() => {
            navMenu.style.display = 'none';
        }, 300); // Corresponde à duração da transição CSS
    } else {
        // Abrir o menu
        navMenu.style.display = 'block';
        navMenu.style.opacity = '0';
        
        // Force reflow para que a transição funcione
        navMenu.offsetHeight;
        
        navMenu.style.opacity = '1';
    }
});

// Smooth Scroll para links internos
scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Se estiver no menu mobile, feche-o após clicar
            if (window.innerWidth <= 768) {
                navMenu.style.display = 'none';
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Ajuste para o header fixo
                behavior: 'smooth'
            });
        }
    });
});

// Inicialização do Mapa
function initMap() {
    // Coordenadas de Cocal dos Alves, PI (aproximadas)
    const lat = -3.620023;
    const lng = -41.445005;
    
    // Inicializar o mapa se o elemento existir
    const mapElement = document.getElementById('mapa');
    if (mapElement) {
        // Criar mapa com opções melhoradas
        const map = L.map('mapa', {
            center: [lat, lng],
            zoom: 16,
            zoomControl: true,
            scrollWheelZoom: true,
            dragging: true
        });
        
        // Adicionar camada com estilo melhorado para visualização de ruas e prédios
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);
        
        // Adicionar marcador personalizado com popup
        const pizzaIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        
        // Conteúdo do popup com informações formatadas
        const popupContent = `
            <strong>Pizzaria Brito</strong>
            <p>Belém, SN - Zona Rural<br>
            Cocal dos Alves - PI<br>
            CEP: 64238-000</p>
            <p><i class="fas fa-phone-alt"></i> (86) 98161-0248</p>
        `;
        
        // Adicionar marcador com popup
        const marker = L.marker([lat, lng], {icon: pizzaIcon}).addTo(map);
        marker.bindPopup(popupContent, {
            maxWidth: 250,
            minWidth: 200,
            closeButton: true
        }).openPopup();
        
        // Adicionar círculo para destacar a área
        L.circle([lat, lng], {
            color: 'rgba(231, 76, 60, 0.2)',
            fillColor: 'rgba(231, 76, 60, 0.1)',
            fillOpacity: 0.5,
            radius: 150
        }).addTo(map);
        
        // Ajustar tamanho do mapa em caso de redimensionamento
        window.addEventListener('resize', () => {
            map.invalidateSize();
        });
    }
}

// Animação de entrada para os cards de pizza
const animateOnScroll = () => {
    const pizzaCards = document.querySelectorAll('.pizza-card');
    
    pizzaCards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (cardPosition < screenPosition) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
};

// Aplicar estilo inicial para animação
document.addEventListener('DOMContentLoaded', () => {
    const pizzaCards = document.querySelectorAll('.pizza-card');
    
    pizzaCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Executar a animação após o carregamento
    animateOnScroll();
    
    // Adicionar evento de scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Atualizar o ano no rodapé automaticamente
    const anoAtual = new Date().getFullYear();
    const footerAno = document.querySelector('.footer-bottom p');
    if (footerAno) {
        footerAno.textContent = footerAno.textContent.replace('2023', anoAtual);
    }
    
    // Inicializar o mapa
    initMap();
});

// Detectar cliques fora do menu mobile para fechá-lo
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !e.target.closest('nav') && 
        !e.target.closest('.mobile-menu') && 
        navMenu.style.display === 'block') {
        
        // Fechar o menu com animação suave
        navMenu.style.opacity = '0';
        setTimeout(() => {
            navMenu.style.display = 'none';
        }, 300); // Corresponde à duração da transição CSS
    }
}); 