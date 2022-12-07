const Asurkay = require("./structures/Client");
const client = new Asurkay();
const { Collection } = require("discord.js");
const blacklistedWords = new Collection();
module.exports = { blacklistedWords };
client.connect()
module.exports = client;
