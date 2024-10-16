const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Função para ler os dados do arquivo JSON
const lerDados = () => {
    try {
        const data = fs.readFileSync('data.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Erro ao ler o arquivo:", err);
        return {}; // Retorna um objeto vazio em caso de erro
    }
};

// Função para escrever os dados no arquivo JSON
const escreverDados = (dados) => {
    fs.writeFileSync('data.json', JSON.stringify(dados, null, 2));
};

// Rota para buscar CNPJ pelo telefone
app.get('/cnpj/:telefone', (req, res) => {
    const telefone = req.params.telefone;
    const dados = lerDados(); // Ler os dados do arquivo
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
        const dados = lerDados(); // Ler os dados existentes
        dados[telefone] = cnpj; // Adicionar o novo telefone e CNPJ
        escreverDados(dados); // Gravar os dados atualizados no arquivo
        res.json({ message: "Dados adicionados com sucesso", dados: { telefone, cnpj } });
    } else {
        res.status(400).json({ error: "Informe telefone e CNPJ corretamente" });
    }
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
