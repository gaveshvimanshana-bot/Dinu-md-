const { readEnv } = require("../lib/database");
const { cmd, commands } = require("../command");

cmd(
  {
    pattern: "menu",
    alias: ["getmenu"],
    desc: "Show all commands menu",
    category: "main",
    filename: __filename,
  },
  async (
    robin,
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
      const config = await readEnv(); // get prefix etc
      let menu = {
        main: "",
        download: "",
        group: "",
        owner: "",
        convert: "",
        search: "",
      };

      // Add commands to menu
      for (let i = 0; i < commands.length; i++) {
        const cmdObj = commands[i];
        if (cmdObj.pattern && !cmdObj.dontAddCommandList) {
          let cat = cmdObj.category || "misc";
          if (!menu[cat]) menu[cat] = "";
          menu[cat] += `▫️ ${config.PREFIX}${cmdObj.pattern}\n`;
        }
      }

      let menuText = `👋 *Hello ${pushname}*

| *MAIN COMMANDS* |
${menu.main || "No commands"}

| *DOWNLOAD COMMANDS* |
${menu.download || "No commands"}

| *GROUP COMMANDS* |
${menu.group || "No commands"}

| *OWNER COMMANDS* |
${menu.owner || "No commands"}

| *CONVERT COMMANDS* |
${menu.convert || "No commands"}

| *SEARCH COMMANDS* |
${menu.search || "No commands"}

🥶 𝐌𝐚𝐝𝐞 𝐛𝐲 𝐒_𝐈_𝐇_𝐈_𝐋_𝐄_𝐋 🥶

> ROBIN MENU MSG
`;

      await robin.sendMessage(
        from,
        {
          image: {
            url: "https://raw.githubusercontent.com/Dark-Robin/Bot-Helper/refs/heads/main/autoimage/Bot%20robin%20menu.jpg",
          },
          caption: menuText,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error("[MENU ERROR]", e);
      reply(`Error: ${e.message}`);
    }
  }
);
