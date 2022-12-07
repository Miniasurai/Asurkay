require("dotenv").config();

module.exports = {
    token: process.env.TOKEN || "MTA0OTkyMzk1NDQ3MjY2OTIzNA.GXeciw._hKbSL7rn3p_ckmAYLZYtxGmaHmrX7g0TwJDio",  // your bot token
    clientID: process.env.CLIENT_ID || "1049923954472669234", // your bot client id
    prefix: process.env.PREFIX || ",", // bot prefix
    ownerID: ["758599343107604501", "758599343107604501", "758599343107604501"],
    mongourl: process.env.MONGO_URL || "mongodb+srv://kurai:nirath137@cluster0.wyjs5hz.mongodb.net/?retryWrites=true&w=majority", // MongoDb URL
    embedColor: process.env.EMBED_COLOR || "#00FFFF", // embed colour
    logs: process.env.LOGS || "1047501597145571358", // channel id for guild create and delete logs
    errorLogsChannel: process.env.ERROR_LOGS_CHANNEL || "1047501597145571358", //error logs channel id
    links: {
        img: process.env.IMG || 'https://media.discordapp.net/attachments/963097935820750878/983300268131225651/20220606_145403.png', //setup system background image 
        support: process.env.SUPPORT || 'https://discord.gg/7EzJsbH4', //support server invite link
        invite: process.env.INVITE || 'https://discord.com/oauth2/authorize?client_id=1049923954472669234&permissions=8&scope=bot%20applications.commands' //bot invite link
    },
  dbCacheRefreshInterval: 1 * 60 * 60 * 1000,

}

function parseBoolean(value) {
    if (typeof (value) === 'string') {
        value = value.trim().toLowerCase();
    }
    switch (value) {
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}