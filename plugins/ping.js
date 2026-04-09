const { cmd } = require("../command");

cmd(
  {
    pattern: "ping",
    react: "🏓",
    desc: "Bot response speed test",
    category: "main",
    filename: __filename,
  },
  async (conn, mek, m, { from, pushname }) => {
    try {
      const start = Date.now();

      await conn.sendMessage(from, { text: "🏓 Pinging..." }, { quoted: mek });

      const end = Date.now();

      await conn.sendMessage(
        from,
        { text: `🏓 Pong! Response time: *${end - start}ms*` },
        { quoted: mek }
      );

    } catch (e) {
      console.log(e);
    }
  }
);
