const express = require('express');
const bodyParser = require('body-parser');
const venom = require('venom-bot');

let client;

venom
  .create({ session: 'bot-n8n',
    headless: 'new'
   })
  .then((cli) => {
    client = cli;
    startServer();
  })
  .catch((err) => {
    console.error('Erro ao iniciar o Venom:', err);
  });

function startServer() {
  const app = express();
  app.use(bodyParser.json());
  app.use(require('cors')());

  app.post('/send-message', async (req, res) => {
    const { phone, message } = req.body;

    if (!phone || !message) {
      return res.status(400).json({ error: 'Faltando número ou mensagem.' });
    }

    try {
      const numero = phone.includes('@c.us') ? phone : `${phone}@c.us`;
      await client.sendText(numero, message);
      res.json({ success: true });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      res.status(500).json({ error: 'Erro ao enviar mensagem.' });
    }
  });

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}
