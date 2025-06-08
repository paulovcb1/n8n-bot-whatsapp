const venom = require('venom-bot');

venom
  .create({ session: 'bot-n8n', headless: 'new' }) // mesmo nome de sessão da VPS
  .then((client) => {
    console.log('Autenticado! Pode fechar.');
  });
