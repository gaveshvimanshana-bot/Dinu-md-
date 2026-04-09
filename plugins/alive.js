const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions');

//================== ALIVE COMMAND ==================
cmd({
    pattern: "alive",
    desc: "Check if bot is online",
    category: "main",
    filename: __filename
}, async(conn, mek, m, {from, pushname, reply}) => {
    try {
        let aliveMessage = `
👋 Hi ${pushname}!
✨ DARK-CYBER-MD is online!

⏳ Uptime: ${runtime(process.uptime())}
🛠 Owner: Mr Hashuwh
📞 Owner Number: 94713457207

💡 Stay tuned for commands!`;

        await conn.sendMessage(from, {
            image: { url: config.ALIVE_IMG },
            caption: aliveMessage
        }, { quoted: mek });

    } catch(e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});

//================== PING COMMAND ==================
cmd({
    pattern: "ping",
    desc: "Check bot's response time.",
    category: "main",
    react: "⚡",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const startTime = Date.now();
        const message = await conn.sendMessage(from, { text: '*```Pinging...```*' });
        const endTime = Date.now();
        const ping = endTime - startTime;
        await conn.sendMessage(from, { text: `*DARK-CYBER-MD* : _${ping}ms 💥_` }, { quoted: message });
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

//================== MENU COMMAND ==================
cmd({
    pattern: "menu",
    desc: "Get the bot menu",
    react: "📜",
    category: "main",
    filename: __filename
}, async(conn, mek, m, { from, pushname, reply }) => {
    try {
        let menu = {
            main: '',
            download: '',
            group: '',
            owner: '',
            convert: '',
            ai: '',
            tools: '',
            search: '',
            fun: '',
            voice: '',
            other: ''
        };

        // Fill menu categories dynamically
        for (let i = 0; i < commands.length; i++) {
            if (commands[i].pattern && !commands[i].dontAddCommandList) {
                menu[commands[i].category] += `.${commands[i].pattern}\n`;
            }
        }

        let madeMenu = `
👋 𝐇𝐄𝐋𝐋𝐎, ${pushname}!

✨ 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 DARK-CYBER-MD ✨
╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」
│◈ яυηтιмє : ${runtime(process.uptime())}
│◈ σωηєя ηαмє : Mr Hashuwh
│◈ σωηєя ηυмвєя : 94713457207
╰──────────●●►

📥 *𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐌𝐞𝐧𝐮*
${menu.download}

👾 *𝐀𝐢 𝐌𝐞𝐧𝐮*
${menu.ai}

🔧 *𝐌𝐚𝐢𝐧 𝐌𝐞𝐧𝐮*
${menu.main}

🎉 *𝐅𝐮𝐧 𝐌𝐞𝐧𝐮*
${menu.fun}

🔄 *𝐂𝐨𝐧𝐯𝐞𝐫𝐭 𝐌𝐞𝐧𝐮*
${menu.convert}

🔍 *𝐒𝐞𝐚𝐫𝐜𝐡 𝐌𝐞𝐧𝐮*
${menu.search}

👥 *𝐆𝐫𝐨𝐮𝐩 𝐌𝐞𝐧𝐮*
${menu.group}

🔒 *𝐎𝐰𝐧𝐞𝐫 𝐌𝐞𝐧𝐮*
${menu.owner}

⚙️ *𝐎𝐭𝐡𝐞𝐫 𝐌𝐞𝐧𝐮*
${menu.other}

🛠️ *𝐓𝐨𝐨𝐥𝐬 𝐌𝐞𝐧𝐮*
${menu.tools}

> *©POWERED BY VIMA-MD*`;

        await conn.sendMessage(from, {
            image: { url: `https://raw.githubusercontent.com/gaveshvimanshana-bot/Dinu-md-/refs/heads/main/Imqge/file_0000000025707208a5167eff51d93f68%20(1).png` },
            caption: madeMenu
        }, { quoted: mek });

    } catch(e) {
        console.log(e);
        reply(`❌ 𝔼𝕣𝕣𝕠𝕣`);
    }
});
