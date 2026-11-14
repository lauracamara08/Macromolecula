var botaoTema = document.getElementById("botaoTema");
var temaSalvo = localStorage.getItem("tema");
if (temaSalvo == "escuro") {
  document.body.classList.add("dark");
}
if (botaoTema != null) {
  if (temaSalvo == "escuro") {
    botaoTema.innerHTML = "Tema claro";
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

var conteudoExtra = document.getElementById("conteudoExtra");
var botaoMais = document.getElementById("botaoMais");
if (botaoMais != null && conteudoExtra != null) {
  botaoMais.onclick = function () {
    if (conteudoExtra.style.display == "none") {
      conteudoExtra.style.display = "block";
      botaoMais.innerHTML = "Ver menos";
    } else {
      conteudoExtra.style.display = "none";
      botaoMais.innerHTML = "Ver mais";
    }
  };
}
var conteudoExtraProteinas = document.getElementById("conteudoExtraProteinas");
var botaoMaisProteinas = document.getElementById("botaoMaisProteinas");
if (botaoMaisProteinas != null && conteudoExtraProteinas != null) {
  botaoMaisProteinas.onclick = function () {
    if (conteudoExtraProteinas.style.display == "none") {
      conteudoExtraProteinas.style.display = "block";
      botaoMaisProteinas.innerHTML = "Ver menos";
    } else {
      conteudoExtraProteinas.style.display = "none";
      botaoMaisProteinas.innerHTML = "Ver mais";
    }
  };
}

var botaoMenu = document.getElementById("botaoMenu");
var menus = document.getElementsByClassName("menu");
if (botaoMenu != null && menus.length > 0) {
  botaoMenu.onclick = function () {
    menus[0].classList.toggle("aberto");
    if (menus[0].classList.contains("aberto")) {
      botaoMenu.innerHTML = "Fechar menu";
    } else {
      botaoMenu.innerHTML = "Menu";
    }
  };
}

var botaoAbrirModal = document.getElementById("botaoAbrirModal");
var botaoFecharModal = document.getElementById("botaoFecharModal");
var modalLipidios = document.getElementById("modalLipidios");
if (
  botaoAbrirModal != null &&
  botaoFecharModal != null &&
  modalLipidios != null
) {
  botaoAbrirModal.onclick = function () {
    modalLipidios.style.display = "flex";
  };

  botaoFecharModal.onclick = function () {
    modalLipidios.style.display = "none";
  };
}

var respostasQuiz = ["C", "D", "B", "A", "D"];
function verificarQuestao(numero) {
  var alternativas = document.getElementsByName("questao" + numero);
  var feedback = document.getElementById("feedback" + numero);
  var respostaSelecionada = "";
  for (var i = 0; i < alternativas.length; i++) {
    if (alternativas[i].checked) {
      respostaSelecionada = alternativas[i].value;
    }
  }
  if (respostaSelecionada == "") {
    feedback.innerHTML = "Escolha uma alternativa.";
  } else if (respostaSelecionada == respostasQuiz[numero - 1]) {
    feedback.innerHTML = "Resposta correta!";
  } else {
    feedback.innerHTML = "Resposta incorreta. Tente outra alternativa.";
  }
}

function finalizarQuiz() {
  var pontuacao = 0;

  for (var numero = 1; numero <= respostasQuiz.length; numero++) {
    var alternativas = document.getElementsByName("questao" + numero);
    var feedback = document.getElementById("feedback" + numero);
    var respostaSelecionada = "";

    for (var i = 0; i < alternativas.length; i++) {
      if (alternativas[i].checked) {
        respostaSelecionada = alternativas[i].value;
      }
    }

    if (respostaSelecionada == "") {
      feedback.innerHTML = "Sem resposta.";
    } else if (respostaSelecionada == respostasQuiz[numero - 1]) {
      pontuacao++;
      feedback.innerHTML = "Resposta correta!";
    } else {
      feedback.innerHTML = "Resposta incorreta.";
    }
  }

  var resultado = document.getElementById("resultadoQuiz");

  resultado.innerHTML =
    "Você acertou " + pontuacao + " de " + respostasQuiz.length + " questões. ";

  if (pontuacao == respostasQuiz.length) {
    resultado.innerHTML += "Excelente trabalho!";
  } else if (pontuacao >= 3) {
    resultado.innerHTML += "Bom trabalho! Continue estudando.";
  } else {
    resultado.innerHTML += "Revise o conteúdo e tente novamente.";
  }
}

function reiniciarQuiz() {
  for (var numero = 1; numero <= respostasQuiz.length; numero++) {
    var alternativas = document.getElementsByName("questao" + numero);

    for (var i = 0; i < alternativas.length; i++) {
      alternativas[i].checked = false;
    }

    document.getElementById("feedback" + numero).innerHTML = "";
  }

  document.getElementById("resultadoQuiz").innerHTML = "";
}

var carrosselConteudos = document.getElementById("carrosselConteudos");

if (carrosselConteudos != null) {
  var cardsConteudo = carrosselConteudos.getElementsByClassName("card");
  var cardsEncontrados = [];
  var indiceCard = 0;

  for (var i = 0; i < cardsConteudo.length; i++) {
    cardsEncontrados.push(i);
  }

  function mostrarCard() {
    for (var i = 0; i < cardsConteudo.length; i++) {
      cardsConteudo[i].style.display = "none";
    }

    var resultadoPesquisa = document.getElementById("resultadoPesquisa");

    if (cardsEncontrados.length == 0) {
      resultadoPesquisa.innerHTML = "Nenhum conteúdo encontrado.";
      return;
    }

    if (indiceCard >= cardsEncontrados.length) {
      indiceCard = 0;
    } else if (indiceCard < 0) {
      indiceCard = cardsEncontrados.length - 1;
    }

    cardsConteudo[cardsEncontrados[indiceCard]].style.display = "block";

    resultadoPesquisa.innerHTML =
      "Conteúdo " +
      (indiceCard + 1) +
      " de " +
      cardsEncontrados.length +
      " encontrado(s).";
  }

  function filtrarConteudos() {
    var textoBusca = document
      .getElementById("pesquisaConteudo")
      .value.toLowerCase();
    var categoriaSelecionada = document.getElementById("filtroCategoria").value;

    cardsEncontrados = [];

    for (var i = 0; i < cardsConteudo.length; i++) {
      var textoCard = cardsConteudo[i].innerHTML.toLowerCase();
      var categoriasCard =
        " " + cardsConteudo[i].getAttribute("data-categorias") + " ";

      var correspondeCategoria =
        categoriaSelecionada == "todos" ||
        categoriasCard.includes(" " + categoriaSelecionada + " ");
      var correspondePesquisa = textoCard.includes(textoBusca);

      if (correspondeCategoria && correspondePesquisa) {
        cardsEncontrados.push(i);
      }
    }

    indiceCard = 0;

    mostrarCard();
  }

  function moverCarrossel(direcao) {
    if (cardsEncontrados.length == 0) {
      return;
    }

    indiceCard += direcao;

    if (indiceCard < 0) {
      indiceCard = cardsEncontrados.length - 1;
    } else if (indiceCard >= cardsEncontrados.length) {
      indiceCard = 0;
    }

    mostrarCard();
  }

  document.getElementById("pesquisaConteudo").onkeyup = filtrarConteudos;

  document.getElementById("botaoPesquisar").onclick = filtrarConteudos;

  document.getElementById("botaoFiltrar").onclick = filtrarConteudos;

  document.getElementById("botaoAnterior").onclick = function () {
    moverCarrossel(-1);
  };

  document.getElementById("botaoProximo").onclick = function () {
    moverCarrossel(1);
  };

  mostrarCard();
}

var botaoDNA = document.getElementById("botaoDNA");
var botaoRNA = document.getElementById("botaoRNA");

var informacaoDNA = document.getElementById("informacaoDNA");
var informacaoRNA = document.getElementById("informacaoRNA");

if (
    botaoDNA != null &&
    botaoRNA != null &&
    informacaoDNA != null &&
    informacaoRNA != null
) {
    botaoDNA.onclick = function () {
        informacaoDNA.style.display = "block";
        informacaoRNA.style.display = "none";
    };

    botaoRNA.onclick = function () {
        informacaoDNA.style.display = "none";
        informacaoRNA.style.display = "block";
    };
}
