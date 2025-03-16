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

// Inicialização do Mapa do Google Maps
window.initGoogleMap = function() {
    // Elemento do mapa
    const mapElement = document.getElementById('mapa');
    
    if (mapElement) {
        // Coordenadas de Cocal dos Alves, PI (mais precisas)
        const pizzariaLocation = { lat: -3.620023, lng: -41.445005 };
        
        // Opções do mapa
        const mapOptions = {
            center: pizzariaLocation,
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_RIGHT
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            streetViewControl: true,
            fullscreenControl: true,
            styles: [
                {
                    featureType: "poi.business",
                    stylers: [{ visibility: "on" }]  // Mostrar pontos de interesse comerciais
                },
                {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [{ visibility: "on" }]  // Destacar as ruas
                },
                {
                    featureType: "building",
                    elementType: "geometry",
                    stylers: [{ visibility: "on" }]  // Destacar os edifícios
                }
            ]
        };
        
        // Criar o mapa
        const map = new google.maps.Map(mapElement, mapOptions);
        
        // Conteúdo da janela de informações
        const infoContent = `
            <div class="info-window">
                <h3>Pizzaria Brito</h3>
                <p>Belém, SN - Zona Rural</p>
                <p>Cocal dos Alves - PI</p>
                <p>CEP: 64238-000</p>
                <p><a href="tel:+5586981610248">(86) 98161-0248</a></p>
            </div>
        `;
        
        // Criar janela de informações
        const infowindow = new google.maps.InfoWindow({
            content: infoContent,
            maxWidth: 250
        });
        
        // Adicionar marcador
        const marker = new google.maps.Marker({
            position: pizzariaLocation,
            map: map,
            title: "Pizzaria Brito",
            animation: google.maps.Animation.DROP
        });
        
        // Abrir janela de informações ao clicar no marcador
        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });
        
        // Abrir a janela de informações automaticamente
        infowindow.open(map, marker);
        
        // Adicionar círculo ao redor do marcador
        const circle = new google.maps.Circle({
            strokeColor: "#E74C3C",
            strokeOpacity: 0.3,
            strokeWeight: 2,
            fillColor: "#E74C3C",
            fillOpacity: 0.1,
            map,
            center: pizzariaLocation,
            radius: 100
        });
        
        // Ajustar o mapa ao redimensionar a janela
        window.addEventListener('resize', () => {
            google.maps.event.trigger(map, 'resize');
            map.setCenter(pizzariaLocation);
        });
    }
};

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