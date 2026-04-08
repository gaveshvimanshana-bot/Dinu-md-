const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["status", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "👋",
    filename: __filename
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
        // Date & Time (Sri Lanka)
        const now = new Date();
        const date = now.toLocaleDateString("en-GB", { timeZone: "Asia/Colombo" });
        const time = now.toLocaleTimeString("en-GB", { timeZone: "Asia/Colombo" });

        // Auto Greeting
        const hours = now.getHours();
        let greeting;
        if(hours >= 5 && hours < 12) greeting = "Good Morning ☀️";
        else if(hours >= 12 && hours < 16) greeting = "Good Afternoon 🌤️";
        else if(hours >= 16 && hours < 19) greeting = "Good Evening 🌇";
        else greeting = "Good Night 🌙";

        // Status message
        const status = `          
╭━━〔 *𝗩𝗜𝗠𝗔-𝗠𝗗* 〕━━┈⊷
┃◈┃• 👋 Hi: ${pushname}
┃◈┃• ${greeting}
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
