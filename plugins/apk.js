const { cmd } = require("../command");
const axios = require("axios");

cmd(
  {
    pattern: "apk",
    alias: ["android", "af"],
    react: "📍",
    desc: "Download your favourite APK with full info",
    category: "download",
    filename: __filename,
  },
  async (bot, mek, m, { q, reply, from }) => {
    try {
      if (!q) return reply("❌ *Please provide an app name to search!*");

      await bot.sendMessage(from, { react: { text: "⏳", key: mek.key } });

      const apiUrl = `https://ws75.aptoide.com/api/7/apps/search/query=${encodeURIComponent(q)}/limit=3`;
      const { data } = await axios.get(apiUrl, {
        headers: { "User-Agent": "Mozilla/5.0" },
      });

      if (!data?.datalist?.list?.length)
        return reply("⚠️ *No apps found with the given name.*");

      const apps = data.datalist.list;

      for (let app of apps) {
        const appSize = app.size ? (app.size / 1048576).toFixed(2) + " MB" : "Unknown";
        const downloadUrl = app?.file?.path_alt || app?.file?.path;

        const caption = `
╭━━〔 📥 APK DOWNLOADER 〕━━┈⊷
┃📛 Name: ${app.name}
┃📦 Size: ${appSize}
┃⭐ Rating: ${app.stats?.rating?.avg || "N/A"}
┃👨‍💻 Dev: ${app.developer?.name || "Unknown"}
┃🆔 Package: ${app.package || "N/A"}
╰━━━━━━━━━━━━━━━┈⊷
        `;

        // Send app icon
        if (app.icon) {
          await bot.sendMessage(
            from,
            { image: { url: app.icon }, caption },
            { quoted: mek }
          );
        } else {
          await bot.sendMessage(from, { text: caption }, { quoted: mek });
        }

        // Send screenshots (top 2)
        if (app.media?.screenshots?.length) {
          for (let i = 0; i < Math.min(2, app.media.screenshots.length); i++) {
            await bot.sendMessage(from, { image: { url: app.media.screenshots[i].url } }, { quoted: mek });
          }
        }

        // Size check (WhatsApp limit ~100MB)
        if (app.size && app.size > 100 * 1024 * 1024) {
          await bot.sendMessage(
            from,
            { text: `⚠️ APK is too large to send. Download here:\n${downloadUrl}` },
            { quoted: mek }
          );
        } else if (downloadUrl) {
          await bot.sendMessage(
            from,
            {
              document: { url: downloadUrl },
              fileName: `${app.name}.apk`,
              mimetype: "application/vnd.android.package-archive",
            },
            { quoted: mek }
          );
        } else {
          await bot.sendMessage(
            from,
            { text: `❌ Download link not found. Check app page: ${app.url}` },
            { quoted: mek }
          );
        }

        await bot.sendMessage(from, { react: { text: "✅", key: mek.key } });
      }
    } catch (err) {
      console.error("❌ APK Downloader Error:", err);
      reply("❌ *An error occurred while downloading the APK.*");
    }
  }
);
