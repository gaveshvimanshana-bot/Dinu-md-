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
}, 
async (conn, mek, m, { from, pushname, reply }) => {
    try {
        // Start measuring latency
        const start = Date.now();
        await reply('🏓 Pong! Checking latency...');
        const latency = Date.now() - start;

        // Status message
        const status = `
╭━━〔 *PONG STATUS* 〕━━┈⊷
┃• Hi: ${pushname}
┃• 🏓 Ping: ${latency}ms
┃• ⏳ Uptime: ${runtime(process.uptime())}
┃• 📟 RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
┃• 👨‍💻 Owner: Mr Gαʋҽʂԋ🔥
╰──────────────┈⊷
`;

        // Reply with system info
        await reply(status);

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`Error: ${e.message}`);
    }
});
