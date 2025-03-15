/**
 * Script para a Pizzaria Brito
 * Desenvolvido por: [Seu Nome]
 * Data: [Data Atual]
 */

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav');
const formContato = document.getElementById('form-contato');
const scrollLinks = document.querySelectorAll('a[href^="#"]');

// Toggle Mobile Menu
mobileMenuBtn.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'block' ? 'none' : 'block';
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

// Validação do Formulário de Contato
if (formContato) {
    formContato.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Pegar valores do formulário
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        
        // Validação simples
        if (nome === '' || email === '' || mensagem === '') {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return false;
        }
        
        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um endereço de e-mail válido.');
            return false;
        }
        
        // Aqui você pode adicionar o código para enviar o formulário via AJAX
        // Simulação de envio bem-sucedido
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        formContato.reset();
    });
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
});

// Detectar cliques fora do menu mobile para fechá-lo
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !e.target.closest('nav') && 
        !e.target.closest('.mobile-menu') && 
        navMenu.style.display === 'block') {
        navMenu.style.display = 'none';
    }
}); 