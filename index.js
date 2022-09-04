let perguntas;
httpRequest = new XMLHttpRequest();
httpRequest.open('GET', 'https://quiz-trainee.herokuapp.com/questions', true);
httpRequest.send();

httpRequest.onreadystatechange = function(){
   if(this.readyState == 4 && this.status == 200){
      perguntas = (JSON.parse(this.responseText));
   }
}
var perguntaAtual = -1;
var pontos = 0;
function mostrarQuestao() {
    console.log(perguntas);
    if (perguntaAtual == -1) {
        document.getElementById("resultado").style.display = 'none'
        document.getElementById("listaRespostas").style.display = "inline"
        document.getElementById("confirmar").innerHTML = "Próxima"
    } else
        for (var i = 0; i < 4; i++)
            if (document.getElementsByName("resposta")[i].checked)
                break
            else if (i == 3)
                return
      perguntaAtual++
    if (perguntaAtual >= perguntas.length) {
        finalizarQuiz();
        return;
    }
    document.getElementById('titulo').innerHTML = perguntas[perguntaAtual].title
    var spansRespostas = document.getElementsByTagName("span")
    var botoesRespostas = document.getElementsByName("resposta")
    for (var i = 0; i < perguntas[perguntaAtual].options.length; i++) {
        if (botoesRespostas[i].checked) {
            pontos += Number(botoesRespostas[i].value)
            botoesRespostas[i].checked = false
        }
        spansRespostas[i].innerHTML = perguntas[perguntaAtual].options[i].answer
        spansRespostas[i].parentElement.children[0].value = perguntas[perguntaAtual].options[i].value
    }
}
function finalizarQuiz() {
    var porcentagemFinal = Math.round((pontos * 100) / 15)
    perguntaAtual = -1
    pontos = 0
    document.getElementById('titulo').innerHTML = 'RESULTADO DO QUIZ'
    document.getElementById("listaRespostas").style.display = "none"
    document.getElementById("resultado").style.display = 'block'
    if(porcentagemFinal==100){
        document.getElementById("resultado").innerHTML = `Parabéns você é um especialista, sua pontuação é ${porcentagemFinal}%`
    }else{
    document.getElementById("resultado").innerHTML = 'Sua porcentagem de pontuação: ' + porcentagemFinal + '%'}
    document.getElementById("confirmar").innerHTML = "Refazer";
}