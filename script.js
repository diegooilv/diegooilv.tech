(function configurarTemaInicial() {
    try {
        const salvo = localStorage.getItem('tema');
        const prefereEscuro = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const tema = salvo || (prefereEscuro ? 'escuro' : 'claro');
        document.documentElement.setAttribute('data-tema', tema);
        const botaoTema = document.getElementById('botao-tema');
        if (botaoTema) botaoTema.setAttribute('aria-pressed', tema === 'escuro' ? 'true' : 'false');
    } catch {
    }
})();

document.getElementById('botao-tema')?.addEventListener('click', () => {
    const atual = document.documentElement.getAttribute('data-tema') || 'escuro';
    const proximo = atual === 'escuro' ? 'claro' : 'escuro';
    document.documentElement.setAttribute('data-tema', proximo);
    localStorage.setItem('tema', proximo);
    const botaoTema = document.getElementById('botao-tema');
    botaoTema?.setAttribute('aria-pressed', proximo === 'escuro' ? 'true' : 'false');
});

(function configurarMenu() {
    const botao = document.getElementById('botao-menu');
    const lista = document.getElementById('links-navegacao');
    if (!botao || !lista) return;

    const fecharMenu = () => {
        lista.classList.remove('aberto');
        botao.setAttribute('aria-expanded', 'false');
        botao.setAttribute('aria-label', 'Abrir menu');
    };

    const abrirMenu = () => {
        lista.classList.add('aberto');
        botao.setAttribute('aria-expanded', 'true');
        botao.setAttribute('aria-label', 'Fechar menu');
    };

    botao.addEventListener('click', () => {
        const aberto = lista.classList.contains('aberto');
        aberto ? fecharMenu() : abrirMenu();
    });

    lista.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', fecharMenu);
    });

    document.addEventListener('click', (e) => {
        if (!lista.contains(e.target) && e.target !== botao) {
            fecharMenu();
        }
    });
})();

(function corrigirScrollComCabecalho() {
    const ids = ['inicio', 'sobre', 'projetos', 'contato'];
    const cabecalho = document.querySelector('.cabecalho');
    const altura = () => (cabecalho?.offsetHeight || 80) - 50;

    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.scrollMarginTop = `${altura()}px`;
        }
    });

    window.addEventListener('resize', () => {
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.scrollMarginTop = `${altura()}px`;
        });
    });
})();