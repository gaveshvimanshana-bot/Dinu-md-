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
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {

        // Date & Time (Sri Lanka)
        const now = new Date();
        const date = now.toLocaleDateString("en-GB", { timeZone: "Asia/Colombo" });
        const time = now.toLocaleTimeString("en-GB", { timeZone: "Asia/Colombo" });

        // Generate system status message
        const status = `          
╭━━〔 *𝗩𝗜𝗠𝗔-𝗠𝗗* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *👋 ʜɪ*: ${pushname}
┃◈┃• *⏳ ᴜᴘᴛɪᴍᴇ*:  ${runtime(process.uptime())} 
┃◈┃• *📅 ᴅᴀᴛᴇ*: ${date}
┃◈┃• *🕒 ᴛɪᴍᴇ*: ${time}
┃◈┃• *📟 ʀᴀᴍ*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
┃◈┃• *👨‍💻 ᴏᴡɴᴇʀ*: ᴍʀ 𝚐𝚊𝚟𝚎𝚜𝚑 </>
┃◈└───────────┈⊷
╰──────────────┈⊷

*𝗩𝗜𝗠𝗔-𝗠𝗗 𝐌𝐔𝐋𝐓𝐈 𝐃𝐄𝐕𝐈𝐂𝐄 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 𝐁𝐎𝐓 𝐂𝐑𝐄𝐀𝐓𝐄𝐃 𝐁𝐘 𝐌𝐑 𝗩𝗜𝗠𝗔 𝐂𝐎𝐃𝐄𝐑 | 𝐓𝐇𝐈𝐒 𝐈𝐒 𝐀 𝐕𝐄𝐑𝐒𝐈𝐎𝐍 1 BOT 😚🩵*

     ⭕ 𝗙𝗢𝗟𝗟𝗢𝗪 𝗢𝗨𝗥 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 𝗖𝗛𝗔𝗡𝗡𝗘𝗟
     
*https://whatsapp.com/channel/0029VbC5HIn9mrGW7Qtp3X1c*

  
> *𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 𝗩𝗜𝗠𝗔-𝗠𝗗 𝗩 1😈💙*`;

        await conn.sendMessage(from, { 
            image: { url: `https://raw.githubusercontent.com/gaveshvimanshana-bot/Dinu-md-/refs/heads/main/Imqge/file_0000000025707208a5167eff51d93f68%20(1).png` },
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363405437936771@newsletter',
                    newsletterName: 'VIMA-𝐌𝐃',
                    serverMessageId: 190
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
