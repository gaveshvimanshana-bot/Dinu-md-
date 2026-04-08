const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive/bot",
    alias: ["status", "runtime", "uptime"],
    desc: "Check uptime and system status with audio",
    category: "main",
    react: "💓",
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
╭━━〔 *𝗩𝗜𝗠𝗔-𝗠𝗗* 〕━━┈⊷
┃◈┃• 👋 Hi: ${pushname}
┃◈┃• ⏳ Uptime: ${runtime(process.uptime())} 
┃◈┃• 📅 Date: ${date}
┃◈┃• 🕒 Time: ${time}
┃◈┃• 📟 RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
┃◈┃• 👨‍💻 Owner: Mr Gavesh
┃◈┃• 📦 Version: v1.0.0
╰──────────────┈⊷

*VIMA-MD MULTI DEVICE WHATSAPP BOT CREATED BY MR VIMA CODER 😚🩵*

⭕ FOLLOW OUR WHATSAPP CHANNEL
https://whatsapp.com/channel/0029VbC5HIn9mrGW7Qtp3X1c

> POWERED BY VIMA-MD V1 😈💙`;

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
