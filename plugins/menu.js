const { cmd, commands } = require("../command");
const pendingMenu = {};
const numberEmojis = ["0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"];

const headerImage = "https://github.com/DANUWA-MD/DANUWA-MD/blob/main/images/DANUWA-MD.png?raw=true";

// ======================= MAIN MENU =======================
cmd({
  pattern: "menu",
  react: "📋",
  desc: "Show command categories",
  category: "main",
  filename: __filename
}, async (bot, m, msg, { from, sender, reply }) => {
  sender = sender || m.key?.participant || m.key?.remoteJid;
  if (!sender) return;

  if (!reply) reply = async (text) => await bot.sendMessage(from, { text });

  await bot.sendMessage(from, { react: { text: "📋", key: m.key } });

  const commandMap = {};

  for (const command of commands) {
    if (command.dontAddCommandList) continue;
    const category = (command.category || "MISC").toUpperCase();
    if (!commandMap[category]) commandMap[category] = [];
    commandMap[category].push(command);
  }

  const categories = Object.keys(commandMap);

  if (categories.length === 0) return reply("❌ No commands available in the menu.");

  let menuText = `*🎉 MAIN MENU 🎉*\n───────────────────────\n`;

  categories.forEach((cat, i) => {
    const emojiIndex = (i + 1).toString().split("").map(n => numberEmojis[n] || n).join("");
    menuText += `┃ ${emojiIndex} *${cat}* (${commandMap[cat].length})\n`;
  });

  menuText += `───────────────────────\nType a number to see commands in that category.`;

  await bot.sendMessage(from, {
    image: { url: headerImage },
    caption: menuText,
  }, { quoted: m });

  pendingMenu[sender] = { step: "category", commandMap, categories };

  // auto delete pending menu after 1 minute
  setTimeout(() => delete pendingMenu[sender], 60 * 1000);
});

// ======================= SELECT CATEGORY =======================
cmd({
  filter: (text, { sender }) => {
    sender = sender || "";
    return pendingMenu[sender] && pendingMenu[sender].step === "category" && /^\d+$/.test(text.trim());
  }
}, async (bot, m, msg, { from, body, sender, reply }) => {
  sender = sender || m.key?.participant || m.key?.remoteJid;
  if (!sender || !pendingMenu[sender]) return;

  if (!reply) reply = async (text) => await bot.sendMessage(from, { text });

  await bot.sendMessage(from, { react: { text: "✅", key: m.key } });

  const { commandMap, categories } = pendingMenu[sender];
  const index = parseInt(body.trim()) - 1;

  if (index < 0 || index >= categories.length) return reply("❌ Invalid number, please type a valid number.");

  const selectedCategory = categories[index];
  const cmdsInCategory = commandMap[selectedCategory];

  let cmdText = `*📂 ${selectedCategory} COMMANDS*\n───────────────────────\n`;
  cmdsInCategory.forEach(c => {
    const patterns = [c.pattern, ...(c.alias || [])].filter(Boolean).map(p => `.${p}`);
    cmdText += `┃ ${patterns.join(", ")} - ${c.desc || "No description"}\n`;
  });
  cmdText += `───────────────────────\n📌 Total Commands: ${cmdsInCategory.length}`;

  await bot.sendMessage(from, {
    image: { url: headerImage },
    caption: cmdText,
  }, { quoted: m });

  delete pendingMenu[sender];
});
