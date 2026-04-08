const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "ping",
    alias: ["p"],
    desc: "Check bot response time (ping) with system info",
    category: "main",
    react: "🏓",
    filename: __filename
}, async (conn, mek, m, { from, pushname }) => {
    try {
        const start = Date.now();
        // Use sendMessage directly instead of reply
        await conn.sendMessage(from, { text: '🏓 Pong! Checking latency...' }, { quoted: mek });
        const latency = Date.now() - start;

        const status = `
╭━━〔 *PONG STATUS* 〕━━┈⊷
┃• Hi: ${pushname}
┃• 🏓 Ping: ${latency}ms
┃• ⏳ Uptime: ${runtime(process.uptime())}
┃• 📟 RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
┃• 👨‍💻 Owner: Mr Gαʋҽʂԋ🔥
╰──────────────┈⊷
`;

        await conn.sendMessage(from, { text: status }, { quoted: mek });

    } catch (e) {
        console.error("Error in ping command:", e);
        await conn.sendMessage(from, { text: `Error: ${e.message}` }, { quoted: mek });
    }
});
