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
        // Generate system status message
        const status = `          
╭━━〔 *𝐇𝐀𝐒𝐇𝐀𝐍-𝐌𝐃* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *👋 ʜɪ*: ${pushname}
┃◈┃• *⏳ ᴜᴘᴛɪᴍᴇ*:  ${runtime(process.uptime())} 
┃◈┃• *📟 ʀᴀᴍ*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
┃◈┃• *👨‍💻 ᴏᴡɴᴇʀ*: ᴍʀ ʜᴀꜱʜᴜᴜ </>
┃◈└───────────┈⊷
╰──────────────┈⊷

*𝐇𝐀𝐒𝐇𝐀𝐍-𝐌𝐃 𝐌𝐔𝐋𝐓𝐈 𝐃𝐄𝐕𝐈𝐂𝐄 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 𝐁𝐎𝐓 𝐂𝐑𝐄𝐀𝐓𝐄𝐃 𝐁𝐘 𝐌𝐑 𝐇𝐀𝐒𝐇𝐔𝐔 𝐂𝐎𝐃𝐄𝐑 | 𝐓𝐇𝐈𝐒 𝐈𝐒 𝐀 𝐕𝐄𝐑𝐒𝐈𝐎𝐍 1 𝐏𝐑𝐎𝐉𝐄𝐂𝐓 😚🩵*

     ⭕ 𝗙𝗢𝗟𝗟𝗢𝗪 𝗢𝗨𝗥 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 𝗖𝗛𝗔𝗡𝗡𝗘𝗟
     
*https://whatsapp.com/channel/0029VazhnLzK0IBdwXG4152o*

  
> *𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 𝗛𝗔𝗦𝗛𝗔𝗡-𝗠𝗗 𝗩𝗘𝗥𝗦𝗜𝗢𝗡 1 💐💙*`;


        await conn.sendMessage(from, { 
            image: { url: `https://files.catbox.moe/vbo0vq.png` },  // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363395674230271@newsletter',
                    newsletterName: '𝐇𝐀𝐒𝐇𝐀𝐍-𝐌𝐃',
                    serverMessageId: 190
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
