const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

//================== ALIVE ==================
cmd({
    pattern: "alive",
    desc: "Check if bot is online",
    category: "main",
    filename: __filename
}, async(conn, mek, m, {from, pushname, reply}) => {
    try {
        let aliveMsg = `
👋 Hi ${pushname}!
✨ DARK-CYBER-MD is online!

⏳ Uptime: ${runtime(process.uptime())}
🛠 Owner: Mr Hashuwh
📞 Owner Number: 94713457207`;

        await conn.sendMessage(from, {
            image: { url: 'https://raw.githubusercontent.com/gaveshvimanshana-bot/Dinu-md-/refs/heads/main/Imqge/file_0000000025707208a5167eff51d93f68%20(1).png' },
            caption: aliveMsg
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});

//================== PING ==================
cmd({
    pattern: "ping",
    desc: "Check bot speed",
    category: "main",
    react: "⚡",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const start = Date.now();
        const msg = await conn.sendMessage(from, { text: '*```Pinging...```*' });
        const ping = Date.now() - start;
        await conn.sendMessage(from, { text: `⚡ Speed: ${ping}ms` }, { quoted: msg });
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

//================== SYSTEM ==================
cmd({
    pattern: "system",
    desc: "System info",
    category: "main",
    react: "💻",
    filename: __filename
}, async(conn, mek, m, { from, reply }) => {
    try {
        const total = (os.totalmem() / 1073741824).toFixed(2);
        const free = (os.freemem() / 1073741824).toFixed(2);
        const used = (total - free).toFixed(2);

        let sys = `
💻 SYSTEM INFO
╭────────────
│ OS : ${os.platform()}
│ CPU : ${os.cpus().length}
│ RAM : ${used}GB / ${total}GB
│ Uptime : ${runtime(process.uptime())}
╰────────────`;

        await conn.sendMessage(from, { text: sys }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error`);
    }
});

//================== MENU ==================
cmd({
    pattern: "menu",
    desc: "Get menu",
    category: "main",
    react: "📜",
    filename: __filename
}, async(conn, mek, m, { from, pushname, reply }) => {
    try {
        let menu = {
            main: '', download: '', group: '', owner: '',
            convert: '', ai: '', tools: '', search: '',
            fun: '', voice: '', other: ''
        };

        for (let cmd of commands) {
            if (cmd.pattern && !cmd.dontAddCommandList) {
                menu[cmd.category] += `.${cmd.pattern}\n`;
            }
        }

        let text = `
👋 Hello ${pushname}

⏳ Uptime: ${runtime(process.uptime())}

📥 Download
${menu.download}

🤖 AI
${menu.ai}

🔧 Main
${menu.main}

👥 Group
${menu.group}

🎉 Fun
${menu.fun}

🛠 Tools
${menu.tools}

> VIMA-MD`;

        await conn.sendMessage(from, {
            image: { url: 'https://raw.githubusercontent.com/gaveshvimanshana-bot/Dinu-md-/refs/heads/main/Imqge/file_0000000025707208a5167eff51d93f68%20(1).png' },
            caption: text
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("❌ Error");
    }
});

//================== GROUP COMMANDS ==================

// Kick
cmd({
    pattern: "kick",
    category: "group",
    react: "❌",
    filename: __filename
}, async(conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, quoted, reply }) => {
    if (!isGroup) return reply("Group only");
    if (!isAdmins) return reply("Admin only");
    if (!isBotAdmins) return reply("Bot not admin");

    let user = quoted ? quoted.sender : m.mentionedJid[0];
    if (!user) return reply("Reply or tag user");

    await conn.groupParticipantsUpdate(from, [user], "remove");
    reply("✅ Done");
});

// Add
cmd({
    pattern: "add",
    category: "group",
    react: "➕",
    filename: __filename
}, async(conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, args, reply }) => {
    if (!isGroup) return reply("Group only");
    if (!isAdmins) return reply("Admin only");
    if (!isBotAdmins) return reply("Bot not admin");

    let num = args[0]?.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    if (!num) return reply("Give number");

    await conn.groupParticipantsUpdate(from, [num], "add");
    reply("✅ Added");
});

// Promote
cmd({
    pattern: "promote",
    category: "group",
    react: "⬆️",
    filename: __filename
}, async(conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, quoted, reply }) => {
    if (!isGroup) return reply("Group only");
    if (!isAdmins) return reply("Admin only");
    if (!isBotAdmins) return reply("Bot not admin");

    let user = quoted ? quoted.sender : m.mentionedJid[0];
    if (!user) return reply("Reply or tag");

    await conn.groupParticipantsUpdate(from, [user], "promote");
    reply("✅ Promoted");
});

// Demote
cmd({
    pattern: "demote",
    category: "group",
    react: "⬇️",
    filename: __filename
}, async(conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, quoted, reply }) => {
    if (!isGroup) return reply("Group only");
    if (!isAdmins) return reply("Admin only");
    if (!isBotAdmins) return reply("Bot not admin");

    let user = quoted ? quoted.sender : m.mentionedJid[0];
    if (!user) return reply("Reply or tag");

    await conn.groupParticipantsUpdate(from, [user], "demote");
    reply("✅ Demoted");
});
