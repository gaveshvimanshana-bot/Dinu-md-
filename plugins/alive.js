const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const yts = require('yt-search');

//================== ALIVE ==================
cmd({
    pattern: "alive",
    desc: "Check bot online",
    category: "main",
    filename: __filename
}, async(conn, mek, m, {from, pushname, reply}) => {
    try {
        let msg = `
👋 Hi ${pushname}
✨ DARK-CYBER-MD Online

⏳ Uptime: ${runtime(process.uptime())}
🛠 Owner: Mr Hashuwh`;

        await conn.sendMessage(from, {
            image: { url: 'https://raw.githubusercontent.com/gaveshvimanshana-bot/Dinu-md-/refs/heads/main/Imqge/file_0000000025707208a5167eff51d93f68%20(1).png' },
            caption: msg
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("❌ Error");
    }
});

//================== PING ==================
cmd({
    pattern: "ping",
    category: "main",
    react: "⚡",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const start = Date.now();
        const m1 = await conn.sendMessage(from, { text: 'Pinging...' });
        const ping = Date.now() - start;
        await conn.sendMessage(from, { text: `⚡ ${ping}ms` }, { quoted: m1 });
    } catch {
        reply("Error");
    }
});

//================== SYSTEM ==================
cmd({
    pattern: "system",
    category: "main",
    react: "💻",
    filename: __filename
}, async(conn, mek, m, { from, reply }) => {
    try {
        let total = (os.totalmem()/1073741824).toFixed(2);
        let free = (os.freemem()/1073741824).toFixed(2);
        let used = (total - free).toFixed(2);

        let sys = `
💻 SYSTEM
OS: ${os.platform()}
CPU: ${os.cpus().length} cores
RAM: ${used}/${total} GB
UPTIME: ${runtime(process.uptime())}`;

        await conn.sendMessage(from, { text: sys }, { quoted: mek });
    } catch {
        reply("Error");
    }
});

//================== MENU WITH BUTTONS ==================
cmd({
    pattern: "menu",
    category: "main",
    react: "📜",
    filename: __filename
}, async(conn, mek, m, { from, pushname, reply }) => {
    try {
        let menuText = `
👋 Hi ${pushname}!
🕒 ${new Date().toLocaleString()}
🛠 Owner: Gavesh
📦 Version: 1.0

⚡ Command Panel
1✳ Download
2✳ Group
3✳ Other
`;

        let buttons = [
            { buttonId: 'menu_download', buttonText: { displayText: '1 Download' }, type: 1 },
            { buttonId: 'menu_group', buttonText: { displayText: '2 Group' }, type: 1 },
            { buttonId: 'menu_other', buttonText: { displayText: '3 Other' }, type: 1 }
        ];

        await conn.sendMessage(from, {
            text: menuText,
            buttons: buttons,
            headerType: 1
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("❌ Error");
    }
});

//================== MENU BUTTON HANDLERS ==================
cmd({
    pattern: "menu_download",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    let text = `
📥 Download Menu
1✳ FB
2✳ APK
`;
    await conn.sendMessage(from, { text }, { quoted: mek });
});

cmd({
    pattern: "menu_group",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    let text = `
👥 Group Menu
1✳ Kick
2✳ Add
3✳ Promote
4✳ Demote
`;
    await conn.sendMessage(from, { text }, { quoted: mek });
});

cmd({
    pattern: "menu_other",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    let text = `
⚙️ Other Menu
1✳ Ping
2✳ Alive
3✳ System
`;
    await conn.sendMessage(from, { text }, { quoted: mek });
});

//================== GROUP COMMANDS ==================
// Kick
cmd({
    pattern: "kick",
    category: "group",
    filename: __filename
}, async(conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, isOwner, quoted, reply }) => {
    if (!isGroup) return reply("Group only");
    if (!isAdmins && !isOwner) return reply("Admin only");
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
    filename: __filename
}, async(conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, isOwner, args, reply }) => {
    if (!isGroup) return reply("Group only");
    if (!isAdmins && !isOwner) return reply("Admin only");
    if (!isBotAdmins) return reply("Bot not admin");

    let num = args[0]?.replace(/[^0-9]/g,"") + "@s.whatsapp.net";
    if (!args[0]) return reply("Give number");

    await conn.groupParticipantsUpdate(from, [num], "add");
    reply("✅ Added");
});
