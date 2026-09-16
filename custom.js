function carregarPergunta() {
    axios.get("http://localhost:3000/quiz")
    .then(response => {
        const pergunta = response.data[0];
        document.getElementById("pergunta").innerText = pergunta.question;

        const opcoesDiv = document.getElementById("opcoes");
        opcoesDiv.innerHTML = "";

        Object.entries(pergunta.answers).forEach(([key, value]) => {
            if (value) {
                const col = document.createElement("div");
                col.className = "col-6";

                const btn = document.createElement("button");
                btn.className = "btn btn-primary w-100";
                btn.innerText = value;
                btn.onclick = () => verificarResposta(pergunta.correct_answers[`${key}_correct`] === "true");

                col.appendChild(btn);
                opcoesDiv.appendChild(col);
            }
        });
    })
    .catch(error => {
        console.error("Erro ao carregar pergunta:", error);
        alert("⚠️ Não foi possível carregar a pergunta.");
    });
}

function verificarResposta(correto) {
    if (correto) {
        alert("✅ Parabéns! Resposta correta.");
    } else {
        alert("❌ Resposta incorreta. Tente novamente.");
    }
}

carregarPergunta();
