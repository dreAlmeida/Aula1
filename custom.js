let perguntas = [];
let perguntaAtual = 0;
let pontuacao = 0;
let respondida = false;

function carregarQuiz() {

    axios.get("http://localhost:3000/quiz")
        .then(response => {

            perguntas = response.data.data;

            exibirPergunta();
        })
        .catch(error => {
            console.error("Erro:", error);
        });
}

function exibirPergunta() {

    respondida = false;

    const pergunta = perguntas[perguntaAtual];

    document.getElementById("contador").innerText =
        `${perguntaAtual + 1}/${perguntas.length}`;

    document.getElementById("pergunta").innerText =
        pergunta.text;

    document.getElementById("feedback").innerHTML = "";

    const opcoesDiv = document.getElementById("opcoes");
    opcoesDiv.innerHTML = "";

    pergunta.answers.forEach(answer => {

        const col = document.createElement("div");
        col.className = "col-md-6";

        const btn = document.createElement("button");

        btn.className =
            "btn btn-primary w-100 py-3";

        btn.innerText = answer.text;

        btn.onclick = () =>
            responder(answer, pergunta);

        col.appendChild(btn);

        opcoesDiv.appendChild(col);
    });
}

function responder(answerSelecionada, pergunta) {

    if (respondida) return;

    respondida = true;

    const botoes =
        document.querySelectorAll("#opcoes button");

    botoes.forEach(btn => {

        btn.disabled = true;

        const resposta = pergunta.answers.find(
            r => r.text === btn.innerText
        );

        if (resposta.isCorrect) {
            btn.classList.remove("btn-primary");
            btn.classList.add("btn-success");
        }
    });

    if (answerSelecionada.isCorrect) {

        pontuacao++;

        document.getElementById("pontuacao").innerText =
            pontuacao;

    } else {

        botoes.forEach(btn => {

            if (btn.innerText === answerSelecionada.text) {

                btn.classList.remove("btn-primary");
                btn.classList.add("btn-danger");
            }
        });
    }

    document.getElementById("feedback").innerHTML = `
        <div class="alert ${
            answerSelecionada.isCorrect
                ? 'alert-success'
                : 'alert-danger'
        }">
            <strong>
            ${
                answerSelecionada.isCorrect
                    ? '✅ Resposta correta!'
                    : '❌ Resposta incorreta!'
            }
            </strong>

            <hr>

            ${pergunta.explanation}
        </div>
    `;

    setTimeout(() => {

        perguntaAtual++;

        if (perguntaAtual < perguntas.length) {
            exibirPergunta();
        } else {
            finalizarQuiz();
        }

    }, 2500);
}

function finalizarQuiz() {

    const percentual =
        Math.round(
            (pontuacao / perguntas.length) * 100
        );

    document.querySelector(".cardb").innerHTML = `
        <div class="text-center">

            <h1>🎉 Quiz Finalizado!</h1>

            <h3 class="mt-4">
                Você acertou
                ${pontuacao}
                de
                ${perguntas.length}
                perguntas
            </h3>

            <h2 class="mt-3">
                ${percentual}% de aproveitamento
            </h2>

            <button
                class="btn btn-primary mt-4"
                onclick="reiniciarQuiz()">
                Jogar novamente
            </button>

        </div>
    `;
}

function reiniciarQuiz() {
    location.reload();
}

carregarQuiz();