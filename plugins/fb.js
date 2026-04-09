const { cmd } = require("../command");
const getFbVideoInfo = require("@xaviabot/fb-downloader");

cmd(
  {
    pattern: "fb",
    alias: ["facebook"],
    react: "📥",
    desc: "Download Facebook Videos (HD/SD/Audio)",
    category: "download",
    filename: __filename,
  },
  async (conn, mek, m, { from, q, args, reply }) => {
    try {
      if (!q) {
        return reply("*❌ Please provide a Facebook video URL!*");
      }

      const fbRegex = /(https?:\/\/)?(www\.)?(facebook|fb)\.com\/.+/;
      if (!fbRegex.test(q)) {
        return reply("*❌ Invalid Facebook URL!*");
      }

      await reply("*⏳ Downloading your video...*");

      const data = await getFbVideoInfo(q);

      if (!data || (!data.sd && !data.hd)) {
        return reply("*❌ Video not found or private!*");
      }

      const { title, sd, hd, thumbnail } = data;

      // 👉 option detect
      const type = args[1]; // hd / sd / audio

      let videoUrl;
      let quality;

      if (type === "sd") {
        videoUrl = sd;
        quality = "SD";
      } else if (type === "audio") {
        videoUrl = hd || sd;
        quality = "Audio";
      } else {
        videoUrl = hd || sd;
        quality = hd ? "HD" : "SD";
      }

      // 👉 caption
      const caption = `
╭━━〔 📥 FB DOWNLOADER 〕━━⬣
┃ 👻 *Title*: ${title || "Unknown"}
┃ 🎬 *Quality*: ${quality}
╰━━━━━━━━━━━━━━━⬣
`;

      // 👉 thumbnail preview
      await conn.sendMessage(
        from,
        {
          image: {
            url:
              thumbnail ||
              "https://i.ibb.co/2kRZ7fH/facebook-video-download.png",
          },
          caption: caption,
        },
        { quoted: mek }
      );

      // 👉 send audio or video
      if (type === "audio") {
        await conn.sendMessage(
          from,
          {
            audio: { url: videoUrl },
            mimetype: "audio/mp4",
          },
          { quoted: mek }
        );
      } else {
        await conn.sendMessage(
          from,
          {
            video: { url: videoUrl },
            caption: `*✅ Downloaded in ${quality}*`,
          },
          { quoted: mek }
        );
      }

      // 👉 react done
      await conn.sendMessage(from, {
        react: { text: "✅", key: mek.key },
      });

    } catch (e) {
      console.log(e);
      reply(`*❌ Error:* ${e.message}`);
    }
  }
);
