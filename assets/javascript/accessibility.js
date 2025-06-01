document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.querySelector('nav'); // For blur effect

    const accessibilityButton = document.getElementById('accessibilityButton');
    const accessibilitySidebar = document.getElementById('accessibilitySidebar');
    const accessibilityOverlay = document.getElementById('accessibilityOverlay');
    const accessibilityClose = document.getElementById('accessibilityClose');
    const accessibilityCards = document.querySelectorAll('.accessibility-card');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeCard = document.querySelector('.accessibility-card.dark-mode-toggle');
    const dyslexicCard = document.querySelector('.accessibility-card.dyslexic-mode-card');
    const fontSizeCard = document.querySelector('.accessibility-card.text-size-card');
    const highlightCard = document.querySelector('.accessibility-card.highlight-links');
    const cursorSizeCard = document.querySelector('.accessibility-card.cursor-size-card');
    const textSpacingCard = document.querySelector('.accessibility-card.text-spacing');

    /**************** MODO ESCURO *****************/

    // CHECA localStorage, SE NÃO HOUVER NENHUM TEMA SALVO, O TEMA CLARO É ARMAZENADO NA CONSTANTE
    const currentTheme = localStorage.getItem('theme') || 'light';

    // CHECA SE O DARK MODE ESTÁ ATIVO OU NÃO E APLICA O TEMA SALVO NA PÁGINA CARREGADA
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (darkModeToggle) darkModeToggle.checked = true;
    }

    function setDarkMode(enabled) {
        document.documentElement.setAttribute('data-theme', enabled ? 'dark' : 'light');
        localStorage.setItem('theme', enabled ? 'dark' : 'light');
        if (darkModeToggle) darkModeToggle.checked = enabled;
    }

    // Dark Mode ao clicar no toggle 
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function () {
            setDarkMode(this.checked);
        });
    }

    //Aciona o evento ao clicar no card e não apenas no toggle
    if (darkModeCard) {
        darkModeCard.addEventListener('click', function () {
            setDarkMode(!darkModeToggle.checked);
        });
    }

    /************* ABRE O SIDEBAR DE ACESSIBILIDADE **************/
    if (accessibilityButton) {
        accessibilityButton.addEventListener('click', function () {
            accessibilitySidebar.classList.add('active');
            accessibilityOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Bloqueia a página de rolar


            if (navbar) {
                navbar.style.filter = 'blur(6px)';
            }
        });
    }

    // FECHA SIDEBAR AO CLICAR NO BOTÃO DE FECHAR
    if (accessibilityClose) {
        accessibilityClose.addEventListener('click', function () {
            closeSidebar();
        });
    }

    // FECHA SIDEBAR AO CLICAR NO OVERLAY
    if (accessibilityOverlay) {
        accessibilityOverlay.addEventListener('click', function () {
            closeSidebar();
        });
    }

    // FUNÇÃO PARA FECHAR SIDEBAR
    function closeSidebar() {
        accessibilitySidebar.classList.remove('active');
        accessibilityOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Permite rolar a página novamente


        if (navbar) {
            navbar.style.filter = '';
        }
    }

    /********************** TAMANHO DA FONTE **************************/
    function setFontSize(size) {
        const isMobile = window.innerWidth <= 480;

        if (isMobile && size > 1) {
            // Tamanho de fonte mobile
            document.documentElement.style.setProperty('--font-size-multiplier', 1 + (size - 1) * 0.6);
        } else {
            // Telas maiores que smartphones
            document.documentElement.style.setProperty('--font-size-multiplier', size);
        }

        localStorage.setItem('fontSize', size);

        if (fontSizeCard) {
            if (size > 1) {
                fontSizeCard.classList.add('active');
            } else {
                fontSizeCard.classList.remove('active');
            }
        }
    }

    // Checa o tamanho da tela ao redimensionar
    window.addEventListener('resize', function () {
        const savedSize = parseFloat(localStorage.getItem('fontSize')) || 1;
        setFontSize(savedSize);
    });

    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        setFontSize(parseFloat(savedFontSize));
    }

    if (fontSizeCard) {
        fontSizeCard.addEventListener('click', function () {
            const isActive = fontSizeCard.classList.contains('active');

            // Caso ativo, desligue (1), se não, ative (1.5)
            const newSize = isActive ? 1 : 1.5;

            setFontSize(newSize);
        });
    }

    /********************** DESTACAR LINKS  **************************/
    function setHighlight(enabled) {
        if (enabled) {
            let highlightStyle = document.getElementById('highlight-links-style');
            if (!highlightStyle) {
                highlightStyle = document.createElement('style');
                highlightStyle.id = 'highlight-links-style';
                document.head.appendChild(highlightStyle);
            }
            highlightStyle.textContent = 'body a { outline: 2px solid red; }';

            if (highlightCard) highlightCard.classList.add('active');

            localStorage.setItem('highlightLinks', 'enabled');
        } else {
            const highlightStyle = document.getElementById('highlight-links-style');
            if (highlightStyle) {
                highlightStyle.textContent = '';
            }

            if (highlightCard) highlightCard.classList.remove('active');

            localStorage.setItem('highlightLinks', 'disabled');
        }
    }

    if (localStorage.getItem('highlightLinks') === 'enabled') {
        setHighlight(true);
    }

    if (highlightCard) {
        highlightCard.addEventListener('click', function () {
            const isCurrentlyEnabled = highlightCard.classList.contains('active');
            setHighlight(!isCurrentlyEnabled);
        });
    }

    /********************* ESPAÇAMENTO DE TEXTO *********************/
    function setTextSpacing(enabled) {
        if (enabled) {
            let textSpacingStyle = document.getElementById('text-spacing-style');
            if (!textSpacingStyle) {
                textSpacingStyle = document.createElement('style');
                textSpacingStyle.id = 'text-spacing-style';
                document.head.appendChild(textSpacingStyle);
            }
            textSpacingStyle.textContent = 'body p { word-spacing: 14px; }';

            if (textSpacingCard) textSpacingCard.classList.add('active');

            localStorage.setItem('textSpacing', 'enabled');
        } else {
            const textSpacingStyle = document.getElementById('text-spacing-style');
            if (textSpacingStyle) {
                textSpacingStyle.textContent = '';
            }

            if (textSpacingCard) textSpacingCard.classList.remove('active');
            localStorage.setItem('textSpacing', 'disabled');
        }
    }

    if (localStorage.getItem('textSpacing') === 'enabled') {
        setTextSpacing(true);
    }

    if (textSpacingCard) {
        textSpacingCard.addEventListener('click', function () {
            const isEnabled = textSpacingCard.classList.contains('active');
            setTextSpacing(!isEnabled);
        });
    }

    /******************* MODO DISLÉXICO **********************/

    function setDyslexicFont(enabled) {
        if (enabled) {

            let dyslexicStyle = document.getElementById('dyslexic-font-style');
            if (!dyslexicStyle) {
                dyslexicStyle = document.createElement('style');
                dyslexicStyle.id = 'dyslexic-font-style';
                document.head.appendChild(dyslexicStyle);
            }


            dyslexicStyle.textContent = `
            * {
                font-family: 'OpenDyslexic', 'Open-Dyslexic', sans-serif !important;
            }
        `;

            if (dyslexicCard) dyslexicCard.classList.add('active');
            localStorage.setItem('dyslexicFont', 'enabled');
        } else {

            const dyslexicStyle = document.getElementById('dyslexic-font-style');
            if (dyslexicStyle) {
                dyslexicStyle.remove();
            }

            if (dyslexicCard) dyslexicCard.classList.remove('active');
            localStorage.setItem('dyslexicFont', 'disabled');
        }
    }

    if (localStorage.getItem('dyslexicFont') === 'enabled') {
        setDyslexicFont(true);
    }

    if (dyslexicCard) {
        dyslexicCard.addEventListener('click', function () {
            const isCurrentlyEnabled = dyslexicCard.classList.contains('active');
            setDyslexicFont(!isCurrentlyEnabled);
        });
    }

    /******************* CURSOR MAIOR **********************/
    function setCustomCursor(enabled) {
        if (enabled) {

            let cursorStyle = document.getElementById('custom-cursor-style');
            if (!cursorStyle) {
                cursorStyle = document.createElement('style');
                cursorStyle.id = 'custom-cursor-style';
                document.head.appendChild(cursorStyle);
            }

            cursorStyle.textContent = `
            * {
                cursor: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24"><path fill="%23FF0000" d="M4.5.79v22.42l6.56-6.57h9.29L4.5.79z"></path></svg>'), auto;
            }
        `;

            if (cursorSizeCard) cursorSizeCard.classList.add('active');

            localStorage.setItem('customCursor', 'enabled');
        } else {
            const cursorStyle = document.getElementById('custom-cursor-style');
            if (cursorStyle) {
                cursorStyle.textContent = '';
            }

            if (cursorSizeCard) cursorSizeCard.classList.remove('active');

            localStorage.setItem('customCursor', 'disabled');
        }
    }

    if (localStorage.getItem('customCursor') === 'enabled') {
        setCustomCursor(true);
    }

    if (cursorSizeCard) {
        cursorSizeCard.addEventListener('click', function () {
            const isCurrentlyEnabled = cursorSizeCard.classList.contains('active');
            setCustomCursor(!isCurrentlyEnabled);
        });
    }

    /******************* RESETA ACESSIBILIDADE **********************/
    //Acessa o cartão correspondente de maneira não tradicional, através do conteúdo do texto.
    let resetCard = null;
    accessibilityCards.forEach(function (card) {
        const cardText = card.querySelector('.accessibility-card-text');
        if (cardText && cardText.textContent.trim() === 'Resetar tudo') {
            resetCard = card;
        }
    });

    if (resetCard) {
        resetCard.addEventListener('click', function () {
            setDarkMode(false);
            setFontSize(1);
            setHighlight(false);
            setDyslexicFont(false);
            setCustomCursor(false);
            setTextSpacing(false);
            //ADICIONE OUTROS RESETS AQUI
        });
    }

    // Fecha acessibilidade com esc
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && accessibilitySidebar.classList.contains('active')) {
            closeSidebar();
        }
    });

});