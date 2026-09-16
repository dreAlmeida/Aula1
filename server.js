const express = require("express");
const axios = require("axios");
const cors = require("cors");
 
const app = express();
app.use(cors());
 
const API_URL = "https://quizapi.io/api/v1/questions";
const API_KEY = "qa_sk_7df6e65e2bcc538f4ad7e9904b5965c2e4b8e851"; // substitua pela sua chave real se não for "segredo"
const QUIZ_ID = "cmu3ifhb7005hu3uttrl5twqj";
 
app.get("/quiz", async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { 
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      params: { 
        quiz_id: QUIZ_ID,
        include_answers: "true"
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Erro na API:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});
 
app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));