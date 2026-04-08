const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["status", "runtime", "uptime"],
    desc: "Check uptime and system status with audio",
    category: "main",
    react: "👋",
    filename: __filename
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
        // Sri Lanka Date & Time
        const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" });
        const date = new Date(now).toLocaleDateString("en-GB");
        const time = new Date(now).toLocaleTimeString("en-GB");

        // Status message
        const status = `          
╭━━〔 *𝑽𝑰𝑴𝑨-𝑴𝑫* 〕━━┈⊷
┃〠┃• 👋 Hi: ${pushname}
┃〠┃• ⏳ Uptime: ${runtime(process.uptime())} 
┃〠┃• 📅 Date: ${date}
┃〠┃• 🕒 Time: ${time}
┃〠┃• 📟 RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
┃〠┃• 👨‍💻 Owner: Mr Gαʋҽʂԋ🔥
┃〠┃• 📦 𝚟𝚎𝚛𝚜𝚒𝚘𝚗: v1.0.0
╰──────────────┈⊷

*VIMA-MD MULTI DEVICE WHATSAPP BOT CREATED BY MR VIMA CODER* 😚🔥
> *POWERED BY VIMA-MD* 🔥💙`;

        // Send Image + Caption
        await conn.sendMessage(from, { 
            image: { url: 'https://raw.githubusercontent.com/gaveshvimanshana-bot/Dinu-md-/main/Imqge/file_0000000025707208a5167eff51d93f68%20(1).png' },
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

        // Send MP3 Audio
        await conn.sendMessage(from, {
            audio: { url: 'https://raw.githubusercontent.com/gaveshvimanshana-bot/Dinu-md-/main/Imqge/AUD-20240527-WA0004.mp3' },
            mimetype: 'audio/mpeg'
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
