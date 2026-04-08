const { cmd } = require('../command');

cmd({
  pattern: 'hello',       // command name
  desc: 'Say hello',      // command description
  category: 'fun',        // category
}, async (bot, mek, m) => {
  await m.reply('Hello! 👋'); // user reply
});
