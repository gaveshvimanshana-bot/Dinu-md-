conn.ev.on('messages.upsert', async (mek) => {
try {
mek = mek.messages[0];
if (!mek.message) return;

mek.message = (getContentType(mek.message) === 'ephemeralMessage')
    ? mek.message.ephemeralMessage.message
    : mek.message;

if (mek.key && mek.key.remoteJid === 'status@broadcast') return;

const m = sms(conn, mek);
const type = getContentType(mek.message);
const from = mek.key.remoteJid;

const body =
    (type === 'conversation') ? mek.message.conversation :
    (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text :
    (type === 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption :
    (type === 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption :
    '';

const isCmd = body.startsWith(prefix);

// 🔥 FIXED cmdName
const cmdName = isCmd
    ? body.slice(prefix.length).trim().split(" ")[0].toLowerCase()
    : '';

const args = body.trim().split(/ +/).slice(1);
const q = args.join(' ');
const isGroup = from.endsWith('@g.us');

const sender = mek.key.fromMe
    ? (conn.user.id.split(':')[0] + '@s.whatsapp.net')
    : (mek.key.participant || mek.key.remoteJid);

const senderNumber = sender.split('@')[0];
const botNumber = conn.user.id.split(':')[0];
const pushname = mek.pushName || 'No Name';

const isMe = botNumber.includes(senderNumber);
const isOwner = ownerNumber.includes(senderNumber) || isMe;

const botNumber2 = await jidNormalizedUser(conn.user.id);

const groupMetadata = isGroup
    ? await conn.groupMetadata(from).catch(() => {})
    : '';

const groupName = isGroup ? groupMetadata.subject : '';
const participants = isGroup ? groupMetadata.participants : [];
const groupAdmins = isGroup ? await getGroupAdmins(participants) : [];

const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false;
const isAdmins = isGroup ? groupAdmins.includes(sender) : false;

// reply function
const reply = (txt) => {
    conn.sendMessage(from, { text: txt }, { quoted: mek });
};

//================ COMMAND HANDLER ==================

const events = require('./command');

if (isCmd) {
    console.log("COMMAND DETECTED:", cmdName);

    const cmd = events.commands.find(
        (cmd) => cmd.pattern === cmdName
    ) || events.commands.find(
        (cmd) => cmd.alias && cmd.alias.includes(cmdName)
    );

    if (cmd) {
        console.log("COMMAND FOUND:", cmd.pattern);

        if (cmd.react) {
            await conn.sendMessage(from, {
                react: { text: cmd.react, key: mek.key }
            });
        }

        try {
            await cmd.function(conn, mek, m, {
                from,
                quoted: mek,
                body,
                isCmd,
                command: cmdName,
                args,
                q,
                isGroup,
                sender,
                senderNumber,
                botNumber2,
                botNumber,
                pushname,
                isMe,
                isOwner,
                groupMetadata,
                groupName,
                participants,
                groupAdmins,
                isBotAdmins,
                isAdmins,
                reply
            });
        } catch (e) {
            console.error("[PLUGIN ERROR]", e);
        }
    } else {
        console.log("COMMAND NOT FOUND ❌");
    }
}

} catch (err) {
console.error("MESSAGE ERROR:", err);
}
});
