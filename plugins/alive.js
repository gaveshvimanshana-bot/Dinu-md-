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
        let aliveMsg = `
👋 Hi ${pushname}!
✨ DARK-CYBER-MD is online!

⏳ Uptime: ${runtime(process.uptime())}
🛠 Owner: Mr Hashuwh
📞 Owner Number: 94713457207

💡 Stay tuned for commands!`;

        await conn.sendMessage(from, {
            image: { url: 'https://raw.githubusercontent.com/gaveshvimanshana-bot/Dinu-md-/refs/heads/main/Imqge/file_0000000025707208a5167eff51d93f68%20(1).png' },
            caption: aliveMsg
        }, { quoted: mek });

    } catch (e) {
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

//================== SYSTEM COMMAND ==================
cmd({
    pattern: "system",
    desc: "Show system info",
    category: "main",
    react: "💻",
    filename: __filename
}, async(conn, mek, m, { from, reply }) => {
    try {
        const totalMem = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
        const freeMem = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);
        const usedMem = (totalMem - freeMem).toFixed(2);
        const cpu = os.cpus().length;
        const platform = os.platform();
        const uptime = runtime(process.uptime());

        let sys = `
💻 𝗦𝗬𝗦𝗧𝗘𝗠 𝗜𝗡𝗙𝗢 💻
╭──────────●●►
│ OS : ${platform}
│ CPU : ${cpu} cores
│ RAM : ${usedMem}GB / ${totalMem}GB
│ Uptime : ${uptime}
╰──────────●●►`;

        await conn.sendMessage(from, { text: sys }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
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

        for (let i = 0; i < commands.length; i++) {
            if (commands[i].pattern && !commands[i].dontAddCommandList) {
                menu[commands[i].category] += `.${commands[i].pattern}\n`;
            }
        }

        let madeMenu = `
👋 𝐇𝐄𝐋𝐋𝐎, ${pushname}!

✨ 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 DARK-CYBER-MD ✨
╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」
│◈ Runtime : ${runtime(process.uptime())}
│◈ Owner : Mr Hashuwh
│◈ Number : 94713457207
╰──────────●●►

📥 *Download*
${menu.download}

👾 *AI*
${menu.ai}

🔧 *Main*
${menu.main}

🎉 *Fun*
${menu.fun}

🔄 *Convert*
${menu.convert}

🔍 *Search*
${menu.search}

👥 *Group*
${menu.group}

🔒 *Owner*
${menu.owner}

⚙️ *Other*
${menu.other}

🛠️ *Tools*
${menu.tools}

> *©POWERED BY VIMA-MD*`;

        await conn.sendMessage(from, {
            image: { url: 'https://raw.githubusercontent.com/gaveshvimanshana-bot/Dinu-md-/refs/heads/main/Imqge/file_0000000025707208a5167eff51d93f68%20(1).png' },
            caption: madeMenu
        }, { quoted: mek });

    } catch(e) {
        console.log(e);
        reply(`❌ Error`);
    }
});
