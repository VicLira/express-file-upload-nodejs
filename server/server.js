const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: '../public/assets/' });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/upload', upload.single('imagem'), (req, res) => {
  console.log('Rota de upload acionada');
  console.log('Arquivo recebido:', req.file);

  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, '../public/assets/' + req.file.originalname);
  console.log('Caminho temporário:', tempPath);
  console.log('Caminho de destino:', targetPath);

  // Mover o arquivo temporário recebido pelo Multer para o local de destino desejado.
  fs.rename(tempPath, targetPath, err => {
    if (err) throw err;

    // Salvar o caminho da imagem no banco de dados
    const imagePath = '../public/assets/' + req.file.originalname;
    console.log('Caminho da imagem:', imagePath);

    // Salvar imagePath no banco de dados

    res.send('Imagem salva com sucesso!');
  });
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
