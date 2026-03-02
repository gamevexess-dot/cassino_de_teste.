// Variáveis Globais
let banca = 50000;

// 1. FUNÇÃO DE LOGIN - TESTADA
function logar() {
    // Pega os elementos com cuidado
    const campoUsuario = document.getElementById('user');
    const campoSenha = document.getElementById('pass');
    
    if (!campoUsuario || !campoSenha) {
        console.error("Erro: Campos de login não encontrados no HTML!");
        return;
    }

    const u = campoUsuario.value;
    const p = campoSenha.value;

    // LOGIN EXATO: Michael (M maiúsculo) e 123
    if (u === "Michael" && p === "123") {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'flex';
        atualizarSaldo();
    } else {
        alert("Usuário ou senha incorretos! Digite Michael e 123.");
    }
}

// 2. FUNÇÃO DE NAVEGAÇÃO
function abrirJogo(tipo) {
    const dados = document.getElementById('jogo-dados');
    const roleta = document.getElementById('jogo-roleta');
    
    if (tipo === 'dados') {
        dados.style.display = 'block';
        roleta.style.display = 'none';
    } else {
        dados.style.display = 'none';
        roleta.style.display = 'block';
    }
}

// 3. JOGO DE DADOS
function jogarDados(apostaTipo) {
    let valor = parseFloat(document.getElementById('aposta-dados').value);
    
    if (isNaN(valor) || valor <= 0 || valor > banca) {
        alert("Valor de aposta inválido ou saldo insuficiente!");
        return;
    }

    const d1_el = document.getElementById('d1');
    const d2_el = document.getElementById('d2');

    d1_el.classList.add('animar-giro');
    d2_el.classList.add('animar-giro');

    setTimeout(() => {
        d1_el.classList.remove('animar-giro');
        d2_el.classList.remove('animar-giro');

        let v1 = Math.floor(Math.random() * 6) + 1;
        let v2 = Math.floor(Math.random() * 6) + 1;
        d1_el.innerText = v1;
        d2_el.innerText = v2;

        let soma = v1 + v2;
        let resultado = (soma % 2 === 0) ? 'par' : 'impar';

        if (apostaTipo === resultado) {
            banca += valor;
            mostrarMensagem("GANHOU!", "lime");
        } else {
            banca -= valor;
            mostrarMensagem("PERDEU!", "red");
        }
        atualizarSaldo();
    }, 500);
}

// 4. JOGO DE ROLETA (ADICIONADO PARA NÃO DAR ERRO)
function jogarRoleta(corEscolhida) {
    let valor = parseFloat(document.getElementById('aposta-roleta').value);
    if (isNaN(valor) || valor <= 0 || valor > banca) return alert("Erro na aposta!");

    const roletaImg = document.getElementById('roleta-img');
    roletaImg.classList.add('animar-giro');

    setTimeout(() => {
        roletaImg.classList.remove('animar-giro');
        let cores = ['vermelho', 'preto'];
        let resultado = cores[Math.floor(Math.random() * cores.length)];

        if (corEscolhida === resultado) {
            banca += valor;
            mostrarMensagem(`DEU ${resultado.toUpperCase()}! VOCÊ GANHOU!`, "lime");
        } else {
            banca -= valor;
            mostrarMensagem(`DEU ${resultado.toUpperCase()}! VOCÊ PERDEU!`, "red");
        }
        atualizarSaldo();
    }, 800);
}

// FUNÇÕES DE APOIO
function atualizarSaldo() {
    document.getElementById('saldo').innerText = `R$ ${banca.toLocaleString('pt-BR')},00`;
}

function mostrarMensagem(texto, cor) {
    const msg = document.getElementById('msg-resultado');
    msg.innerText = texto;
    msg.style.color = cor;
}