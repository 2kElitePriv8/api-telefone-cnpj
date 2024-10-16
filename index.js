const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Simulando um "banco de dados" em JSON
let dados = {
    "11987654321": "12.345.678/0001-99",
    "21987654321": "98.765.432/0001-88"
};

// Rota para buscar CNPJ pelo telefone
app.get('/cnpj/:telefone', (req, res) => {
    const telefone = req.params.telefone;
    const cnpj = dados[telefone];
    
    if (cnpj) {
        res.json({ telefone: telefone, cnpj: cnpj });
    } else {
        res.status(404).json({ error: "Telefone não encontrado" });
    }
});

// Rota para adicionar novo telefone e CNPJ
app.post('/adicionar', (req, res) => {
    const { telefone, cnpj } = req.body;
    
    if (telefone && cnpj) {
        dados[telefone] = cnpj;
        res.json({ message: "Dados adicionados com sucesso", dados: { telefone, cnpj } });
    } else {
        res.status(400).json({ error: "Informe telefone e CNPJ corretamente" });
    }
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
