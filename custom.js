function carregarPergunta() {
    // Chamada direta para o servidor local (sem enviar headers ou API_KEY pelo client)
    axios.get("http://localhost:3000/quiz")
    .then(response => {
        // Pega a primeira pergunta do quiz retornado
        const pergunta = response.data[0]; 
        
        // Exibe o texto da questão recebido via .text
        document.getElementById("pergunta").innerText = pergunta.text;

        const opcoesDiv = document.getElementById("opcoes");
        opcoesDiv.innerHTML = "";

        Object.entries(pergunta.answers).forEach(([key, value]) => {
            // Renderiza apenas as opções preenchidas
            if (value) { 
                const col = document.createElement("div");
                col.className = "col-6";

                const btn = document.createElement("button");
                btn.className = "btn btn-primary w-100 mb-2";
                btn.innerText = value;
                
                // Trata o retorno para garantir comparação booleana sem falhar por tipo
                const ehCorreta = String(pergunta.correct_answers[`${key}_correct`]).toLowerCase() === "true";
                btn.onclick = () => verificarResposta(ehCorreta);

                col.appendChild(btn);
                opcoesDiv.appendChild(col);
            }
        });
    })
    .catch(error => {
        console.error("Erro ao carregar pergunta:", error);
        alert("⚠️ Não foi possível carregar a pergunta. Verifique a conexão com o servidor local.");
    });
}

function verificarResposta(correto) {
    if (correto) {
        alert("✅ Parabéns! Resposta correta.");
    } else {
        alert("❌ Resposta incorreta. Tente novamente.");
    }
}

// Inicializa a chamada assim que a página carrega
carregarPergunta();