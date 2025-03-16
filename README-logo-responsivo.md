# Logo Responsivo - Pizzaria Brito

## Implementação de Logo Responsivo com CSS e Media Queries

Este documento explica como implementamos o redimensionamento responsivo do logotipo da Pizzaria Brito usando CSS e media queries, sem a necessidade de carregar múltiplas versões da imagem para diferentes tamanhos de tela.

## 🛠️ Técnicas Utilizadas

1. **Variáveis CSS**: Centralizamos todas as dimensões do logo em variáveis CSS para facilitar a manutenção e ajustes
2. **Media Queries**: Utilizamos breakpoints para ajustar o tamanho do logo em diferentes dispositivos
3. **Transições CSS**: Adicionamos transições suaves para melhorar a experiência quando o tamanho da tela muda
4. **Preservação de Proporção**: Garantimos que a proporção da imagem seja mantida com `width: auto` e `object-fit: contain`
5. **Otimização de Texto**: Prevenimos quebras de linha no texto do logo com `white-space: nowrap`

## 📐 Breakpoints e Dimensões

| Dispositivo        | Largura da Tela | Altura do Logo | Margem Direita | Tamanho do Texto |
|--------------------|-----------------|----------------|----------------|------------------|
| Desktop            | > 992px         | 60px           | 15px           | 24px             |
| Tablet             | 768px - 992px   | 50px           | 12px           | 20px             |
| Mobile             | 480px - 768px   | 40px           | 8px            | 18px             |
| Mobile (pequeno)   | < 480px         | 35px           | 8px            | 18px             |

## 💻 Implementação CSS

```css
/* Definição de variáveis */
:root {
    --logo-height-desktop: 60px;
    --logo-height-tablet: 50px;
    --logo-height-mobile: 40px;
    --logo-margin-desktop: 15px;
    --logo-margin-tablet: 12px;
    --logo-margin-mobile: 8px;
    --logo-text-desktop: 24px;
    --logo-text-tablet: 20px;
    --logo-text-mobile: 18px;
}

/* Estilo base para desktop */
.logo {
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
}

.logo img {
    height: var(--logo-height-desktop);
    margin-right: var(--logo-margin-desktop);
    transition: all 0.3s ease;
    width: auto;
    max-width: 100%;
    object-fit: contain;
}

.logo h1 {
    font-size: var(--logo-text-desktop);
    color: #e74c3c;
    transition: all 0.3s ease;
    white-space: nowrap;
}

/* Media queries para diferentes tamanhos de tela */
@media (max-width: 992px) {
    .logo img {
        height: var(--logo-height-tablet);
        margin-right: var(--logo-margin-tablet);
    }
    .logo h1 {
        font-size: var(--logo-text-tablet);
    }
}

@media (max-width: 768px) {
    .logo img {
        height: var(--logo-height-mobile);
        margin-right: var(--logo-margin-mobile);
    }
    .logo h1 {
        font-size: var(--logo-text-mobile);
    }
}

@media (max-width: 480px) {
    .logo img {
        height: calc(var(--logo-height-mobile) - 5px);
    }
}
```

## 🔍 Como Testar

Para verificar como o logo se comporta em diferentes tamanhos de tela:

1. Abra a página da Pizzaria Brito em um navegador desktop
2. Utilize as ferramentas de desenvolvedor do navegador (F12 ou clique com botão direito > Inspecionar)
3. Ative o modo de visualização responsiva (geralmente um ícone que parece um tablet e telefone)
4. Redimensione a janela de visualização para diferentes larguras e observe como o logo se adapta
5. Você também pode testar em dispositivos reais como tablets e smartphones

## 🏆 Vantagens desta Abordagem

- **Performance**: Carrega apenas uma imagem, economizando requisições HTTP e largura de banda
- **Manutenção Simplificada**: Mudanças podem ser feitas facilmente alterando as variáveis CSS
- **Experiência de Usuário**: Transições suaves entre tamanhos de tela
- **Código Limpo**: Utilização de variáveis e comentários para facilitar o entendimento
- **Escalabilidade**: Fácil adicionar novos breakpoints para outros dispositivos se necessário

## 📱 Comportamento Visual do Logo

- **Desktop**: Logo em tamanho completo, com amplo espaço de navegação
- **Tablet**: Logo ligeiramente reduzido para balancear presença e economia de espaço
- **Mobile**: Logo compacto para maximizar espaço de navegação em telas pequenas
- **Mobile (pequeno)**: Logo ainda mais reduzido para dispositivos muito pequenos

---

_Esta implementação segue as melhores práticas de design responsivo e performance web._ 