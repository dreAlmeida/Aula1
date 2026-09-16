const express = require("express");
const axios = require("axios");
const cors = require("cors");
 
const app = express();
app.use(cors());
 
const API_URL = "https://quizapi.io/api/v1/questions";
const API_KEY = ""; // substitua pela chave real
const QUIZ_ID = "cmu3ifhb7005hu3uttrl5twqj"; // substitua pelo ID do quiz pronto
 
app.get("/quiz", async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { "X-Api-Key": API_KEY },
      params: { quiz: QUIZ_ID }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Erro na API:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});
 
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));