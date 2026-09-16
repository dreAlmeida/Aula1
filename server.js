const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const API_URL = "https://quizapi.io/api/v1/questions?quiz_id=cmu3ifhb7005hu3uttrl5twqj";
const API_KEY = "qa_sk_7df6e65e2bcc538f4ad7e9904b5965c2e4b8e851"; // substitua pela sua chave

// Rota proxy
app.get("/quiz", async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { "X-Api-Key": API_KEY },
      params: { limit: 1, category: "anime", difficulty: "easy" }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
