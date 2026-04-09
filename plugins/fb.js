const { cmd, commands } = require("../command");
const getFbVideoInfo = require("@xaviabot/fb-downloader");

cmd(
  {
    pattern: "fb",
    alias: ["facebook"],
    react: " 📥 ",
    desc: "Download Facebook Video",
    category: "download",
    filename: __filename,
  },
  async (
    danuwa,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
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
      reply,
    }
  ) => {
    try {
      if (!q) return reply("*Please provide a valid Facebook video URL!* ❤️");

      const fbRegex = /(https?:\/\/)?(www\.)?(facebook|fb)\.com\/.+/;
      if (!fbRegex.test(q))
        return reply("*Invalid Facebook URL! Please check and try again.* ☹️");

      reply("*Downloading your video...* ❤️");

      const result = await getFbVideoInfo(q);
      if (!result || (!result.sd && !result.hd)) {
        return reply("*Failed to download video. Please try again later.* ☹️");
      }

      const { title, sd, hd } = result;
      const bestQualityUrl = hd || sd;
      const qualityText = hd ? "HD" : "SD";

      const desc = `
╭━━〔 *ＶＩＭＡ-ＭＤ✘📥 FB DOWNLOADER* 〕━━⬣
┃ 👻 *Title*: ${title || "Unknown"}
┃ 🎬 *Quality*: ${quality}
╰━━━━━━━━━━━━━━━◯◦◦◦◦◦◦◦◦◦✤✳⬣

> *𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 𝗩𝗜𝗠𝗔-𝗠𝗗 ✘ 𝗩1 😚💙*
`;

      await danuwa.sendMessage(
        from,
        {
          image: {
            url: "https://raw.githubusercontent.com/gaveshvimanshana-bot/Dinu-md-/refs/heads/main/Imqge/file_0000000025707208a5167eff51d93f68%20(1).png",
          },
          caption: desc,
        },
        { quoted: mek }
      );

      await danuwa.sendMessage(
        from,
        {
          video: { url: bestQualityUrl },
          caption: `*📥 Downloaded in ${qualityText} quality*`,
        },
        { quoted: mek }
      );

      return reply("Thank you for using 𝗩𝗜𝗠𝗔-𝗠𝗗 😚");
    } catch (e) {
      console.error(e);
      reply(`*Error:* ${e.message || e}`);
    }
  }
);
