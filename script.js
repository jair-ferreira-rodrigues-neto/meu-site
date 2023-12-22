//tabuleiro
var tamanhoBloco = 25;
var linhas = 20;
var colunas = 20;
var tabuleiro;
var contexto;
var cobraX = tamanhoBloco * 5;
var cobraY = tamanhoBloco * 5;
var velocidadeX = 0;
var velocidadeY = 0;
var corpoCobra = [];
var comidaX;
var comidaY;
var jogoEncerrado = false;

window.onload = function () {
    tabuleiro = document.getElementById("tabuleiro");
    tabuleiro.height = linhas * tamanhoBloco;
    tabuleiro.width = colunas * tamanhoBloco;
    contexto = tabuleiro.getContext("2d");

    document.addEventListener("keyup", mudarDirecao);
    setInterval(atualizar, 1000 / 10);

    colocarComida();
}

function atualizar() {
    if (jogoEncerrado) {
        return;
    }

    contexto.fillStyle = "black";
    contexto.fillRect(0, 0, tabuleiro.width, tabuleiro.height);

    contexto.fillStyle = "red";
    contexto.fillRect(comidaX, comidaY, tamanhoBloco, tamanhoBloco);

    if (cobraX == comidaX && cobraY == comidaY) {
        corpoCobra.push([comidaX, comidaY]);
        colocarComida();
    }

    for (let i = corpoCobra.length - 1; i > 0; i--) {
        corpoCobra[i] = corpoCobra[i - 1];
    }
    if (corpoCobra.length) {
        corpoCobra[0] = [cobraX, cobraY];
    }

    contexto.fillStyle = "lime";
    cobraX += velocidadeX * tamanhoBloco;
    cobraY += velocidadeY * tamanhoBloco;
    contexto.fillRect(cobraX, cobraY, tamanhoBloco, tamanhoBloco);
    for (let i = 0; i < corpoCobra.length; i++) {
        contexto.fillRect(corpoCobra[i][0], corpoCobra[i][1], tamanhoBloco, tamanhoBloco);
    }

    //condições de fim de jogo
    if (cobraX < 0 || cobraX > colunas * tamanhoBloco || cobraY < 0 || cobraY > linhas * tamanhoBloco) {
        encerrarJogo();
    }

    for (let i = 0; i < corpoCobra.length; i++) {
        if (cobraX == corpoCobra[i][0] && cobraY == corpoCobra[i][1]) {
            encerrarJogo();
        }
    }
}

function mudarDirecao(e) {
    if (e.code == "ArrowUp" && velocidadeY != 1) {
        velocidadeX = 0;
        velocidadeY = -1;
    }
    else if (e.code == "ArrowDown" && velocidadeY != -1) {
        velocidadeX = 0;
        velocidadeY = 1;
    }
    else if (e.code == "ArrowLeft" && velocidadeX != 1) {
        velocidadeX = -1;
        velocidadeY = 0;
    }
    else if (e.code == "ArrowRight" && velocidadeX != -1) {
        velocidadeX = 1;
        velocidadeY = 0;
    }
}

function colocarComida() {
    //(0-1) * colunas -> (0-19.9999) -> (0-19) * 25
    comidaX = Math.floor(Math.random() * colunas) * tamanhoBloco;
    comidaY = Math.floor(Math.random() * linhas) * tamanhoBloco;
}

function encerrarJogo() {
    jogoEncerrado = true;
    alert("Fim de Jogo. Pontuação: " + corpoCobra.length);
    resetarJogo();
}

function resetarJogo() {
    cobraX = tamanhoBloco * 5;
    cobraY = tamanhoBloco * 5;
    velocidadeX = 0;
    velocidadeY = 0;
    corpoCobra = [];
    colocarComida();
    jogoEncerrado = false;
}

function mudarDirecaoBotao(direcao) {
    if (direcao == "ArrowUp" && velocidadeY != 1) {
        velocidadeX = 0;
        velocidadeY = -1;
    }
    else if (direcao == "ArrowDown" && velocidadeY != -1) {
        velocidadeX = 0;
        velocidadeY = 1;
    }
    else if (direcao == "ArrowLeft" && velocidadeX != 1) {
        velocidadeX = -1;
        velocidadeY = 0;
    }
    else if (direcao == "ArrowRight" && velocidadeX != -1) {
        velocidadeX = 1;
        velocidadeY = 0;
    }
}
