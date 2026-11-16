var botaoTema = document.getElementById("botaoTema");
var temaSalvo = localStorage.getItem("tema");

if (temaSalvo == "escuro") {
  document.body.classList.add("dark");
}

if (botaoTema != null) {
  if (temaSalvo == "escuro") {
    botaoTema.innerHTML = "Tema claro";
  } else {
    botaoTema.innerHTML = "Tema escuro";
  }

  botaoTema.onclick = function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("tema", "escuro");
      botaoTema.innerHTML = "Tema claro";
    } else {
      localStorage.setItem("tema", "claro");
      botaoTema.innerHTML = "Tema escuro";
    }
  };
}

var botoesMais = document.getElementsByClassName("botaoMais");
var conteudosExtras = document.getElementsByClassName("conteudoExtra");

for (var i = 0; i < botoesMais.length; i++) {
  if (conteudosExtras[i] != null) {
    conteudosExtras[i].style.display = "none";
    botoesMais[i].innerHTML = "Ver mais";

    botoesMais[i].onclick = function () {
      var numero = 0;

      for (var j = 0; j < botoesMais.length; j++) {
        if (botoesMais[j] == this) {
          numero = j;
        }
      }

      if (conteudosExtras[numero].style.display == "none") {
        conteudosExtras[numero].style.display = "block";
        this.innerHTML = "Ver menos";
      } else {
        conteudosExtras[numero].style.display = "none";
        this.innerHTML = "Ver mais";
      }
    };
  }
}

var itensMenu = document.getElementsByClassName("menu");
var botaoMenu = document.getElementById("botaoMenu");

if (botaoMenu != null && itensMenu.length > 0) {
  botaoMenu.onclick = function () {
    itensMenu[0].classList.toggle("mostrar");
  };
}

var botaoModal = document.getElementById("botaoModal");
var modal = document.getElementById("modal");
var botaoFecharModal = document.getElementById("botaoFecharModal");

if (botaoModal != null && modal != null) {
  botaoModal.onclick = function () {
    modal.style.display = "block";
  };
}

if (botaoFecharModal != null && modal != null) {
  botaoFecharModal.onclick = function () {
    modal.style.display = "none";
  };
}

var botaoSimples = document.getElementById("botaoSimples");
var botaoComplexos = document.getElementById("botaoComplexos");
var informacaoSimples = document.getElementById("informacaoSimples");
var informacaoComplexos = document.getElementById("informacaoComplexos");

if (informacaoSimples != null) {
  informacaoSimples.style.display = "block";
}

if (informacaoComplexos != null) {
  informacaoComplexos.style.display = "none";
}

if (botaoSimples != null && informacaoSimples != null && informacaoComplexos != null) {
  botaoSimples.onclick = function () {
    informacaoSimples.style.display = "block";
    informacaoComplexos.style.display = "none";
  };
}

if (botaoComplexos != null && informacaoSimples != null && informacaoComplexos != null) {
  botaoComplexos.onclick = function () {
    informacaoSimples.style.display = "none";
    informacaoComplexos.style.display = "block";
  };
}

var respostasQuiz = ["C", "D", "B", "A", "D"];

function verificarQuestao(numero) {
  var alternativas = document.getElementsByName("questao" + numero);
  var respostaUsuario = "";
  var feedback = document.getElementById("feedback" + numero);

  for (var i = 0; i < alternativas.length; i++) {
    if (alternativas[i].checked) {
      respostaUsuario = alternativas[i].value;
    }
  }

  if (feedback != null) {
    if (respostaUsuario == "") {
      feedback.innerHTML = "Selecione uma alternativa.";
    } else if (respostaUsuario == respostasQuiz[numero - 1]) {
      feedback.innerHTML = "Resposta correta!";
    } else {
      feedback.innerHTML = "Resposta incorreta. Tente novamente!";
    }
  }
}

function finalizarQuiz() {
  var pontuacao = 0;

  for (var i = 1; i <= respostasQuiz.length; i++) {
    var alternativas = document.getElementsByName("questao" + i);
    var respostaUsuario = "";
    var feedback = document.getElementById("feedback" + i);

    for (var j = 0; j < alternativas.length; j++) {
      if (alternativas[j].checked) {
        respostaUsuario = alternativas[j].value;
      }
    }

    if (respostaUsuario == respostasQuiz[i - 1]) {
      pontuacao++;

      if (feedback != null) {
        feedback.innerHTML = "Resposta correta!";
      }
    } else {
      if (feedback != null) {
        if (respostaUsuario == "") {
          feedback.innerHTML = "Você não selecionou uma alternativa.";
        } else {
          feedback.innerHTML = "Resposta incorreta.";
        }
      }
    }
  }

  var resultadoQuiz = document.getElementById("resultadoQuiz");

  if (resultadoQuiz != null) {
    resultadoQuiz.innerHTML = "Você acertou " + pontuacao + " de " + respostasQuiz.length + " questões!";
  }
}

function reiniciarQuiz() {
  for (var i = 1; i <= respostasQuiz.length; i++) {
    var alternativas = document.getElementsByName("questao" + i);
    var feedback = document.getElementById("feedback" + i);

    for (var j = 0; j < alternativas.length; j++) {
      alternativas[j].checked = false;
    }

    if (feedback != null) {
      feedback.innerHTML = "";
    }
  }

  var resultadoQuiz = document.getElementById("resultadoQuiz");

  if (resultadoQuiz != null) {
    resultadoQuiz.innerHTML = "";
  }
}

var campoPesquisa = document.getElementById("pesquisaConteudo");
var filtroCategoria = document.getElementById("filtroCategoria");
var botaoPesquisar = document.getElementById("botaoPesquisar");
var botaoFiltrar = document.getElementById("botaoFiltrar");
var resultadoPesquisa = document.getElementById("resultadoPesquisa");
var carrosselConteudos = document.getElementById("carrosselConteudos");
var botaoAnterior = document.getElementById("botaoAnterior");
var botaoProximo = document.getElementById("botaoProximo");

var cardsEncontrados = [];
var indiceCard = 0;

function obterCards() {
  if (carrosselConteudos != null) {
    return carrosselConteudos.getElementsByClassName("card");
  } else {
    return document.getElementsByClassName("card");
  }
}

function mostrarCard() {
  var cards = obterCards();

  for (var i = 0; i < cards.length; i++) {
    cards[i].style.display = "none";
  }

  if (cardsEncontrados.length > 0) {
    cardsEncontrados[indiceCard].style.display = "block";

    if (resultadoPesquisa != null) {
      resultadoPesquisa.innerHTML = "Exibindo " + (indiceCard + 1) + " de " + cardsEncontrados.length + " resultado(s).";
    }
  } else {
    if (resultadoPesquisa != null) {
      resultadoPesquisa.innerHTML = "Nenhum conteúdo encontrado.";
    }
  }
}

function filtrarConteudos() {
  var cards = obterCards();
  var textoPesquisa = "";
  var categoriaSelecionada = "todos";

  if (campoPesquisa != null) {
    textoPesquisa = campoPesquisa.value.toLowerCase();
  }

  if (filtroCategoria != null) {
    categoriaSelecionada = filtroCategoria.value;
  }

  cardsEncontrados = [];
  indiceCard = 0;

  for (var i = 0; i < cards.length; i++) {
    var textoCard = cards[i].innerHTML.toLowerCase();
    var categoriasCard = cards[i].getAttribute("data-categorias");

    var correspondeTexto = textoCard.includes(textoPesquisa);
    var correspondeCategoria = categoriaSelecionada == "todos" ||
      (categoriasCard != null && categoriasCard.includes(categoriaSelecionada));

    if (correspondeTexto && correspondeCategoria) {
      cardsEncontrados.push(cards[i]);
    }
  }

  mostrarCard();
}

if (campoPesquisa != null) {
  campoPesquisa.oninput = function () {
    filtrarConteudos();
  };
}

if (botaoPesquisar != null) {
  botaoPesquisar.onclick = function () {
    filtrarConteudos();
  };
}

if (botaoFiltrar != null) {
  botaoFiltrar.onclick = function () {
    filtrarConteudos();
  };
}

if (filtroCategoria != null) {
  filtroCategoria.onchange = function () {
    filtrarConteudos();
  };
}

function moverCarrossel(direcao) {
  if (cardsEncontrados.length > 0) {
    indiceCard = indiceCard + direcao;

    if (indiceCard >= cardsEncontrados.length) {
      indiceCard = 0;
    }

    if (indiceCard < 0) {
      indiceCard = cardsEncontrados.length - 1;
    }

    mostrarCard();
  }
}

if (botaoAnterior != null) {
  botaoAnterior.onclick = function () {
    moverCarrossel(-1);
  };
}

if (botaoProximo != null) {
  botaoProximo.onclick = function () {
    moverCarrossel(1);
  };
}

if (carrosselConteudos != null) {
  filtrarConteudos();
}

var botaoDNA = document.getElementById("botaoDNA");
var botaoRNA = document.getElementById("botaoRNA");
var informacaoDNA = document.getElementById("informacaoDNA");
var informacaoRNA = document.getElementById("informacaoRNA");

if (informacaoDNA != null) {
  informacaoDNA.style.display = "block";
}

if (informacaoRNA != null) {
  informacaoRNA.style.display = "none";
}

if (botaoDNA != null && informacaoDNA != null && informacaoRNA != null) {
  botaoDNA.onclick = function () {
    informacaoDNA.style.display = "block";
    informacaoRNA.style.display = "none";
  };
}

if (botaoRNA != null && informacaoDNA != null && informacaoRNA != null) {
  botaoRNA.onclick = function () {
    informacaoDNA.style.display = "none";
    informacaoRNA.style.display = "block";
  };
}