const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "HZhTSTaR#GSbb2P9sxKEAnd9Azxm8lHr11m7owXEc-g-lcLAda-M",
AUTO_RECORDING: process.env.AUTO_RECORDING || "true",
ANTI_BAD_WORD: process.env.ANTI_BAD_WORD || "true",
AUTO_REPLY: process.env.AUTO_REPLY || "true",
ALIVE_IMG: process.env.ALIVE_IMG || "https://raw.githubusercontent.com/gaveshvimanshana-bot/Dinu-md-/refs/heads/main/Screenshot_20260509_175348_WhatsApp.jpg",
ALIVE_MSG: process.env.ALIVE_MSG || "HELLO IM WHITE MD CREATED BY Gavesh <NOW ALIVE> ",
AUTO_STATUS_SEEN:"true",
};
