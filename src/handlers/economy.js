module.exports = (client) => {
    /**
     * Currency
     */
    const CurrencySystem = require("currency-system");
const cs = new CurrencySystem();
// Debug logs! Help in finding issues!
CurrencySystem.cs
  .on("debug", (debug, error) => {
    console.log(debug);
    if (error) console.error(error);
  })
  .on("userFetch", (user, functionName) => {
    console.log(
      `( ${functionName} ) Fetched User:  ${
        client.users.cache.get(user.userID).tag
      }`
    );
  })
  .on("userUpdate", (oldData, newData) => {
    console.log("User Updated: " + client.users.cache.get(newData.userID).tag);
  });
    cs.setMongoURL(client.config.mongourl);
// Set Default Bank Amount when a new user is created!
cs.setDefaultBankAmount(0);
cs.setDefaultWalletAmount(0);
//  Its bank space limit (can be changed according to per user) here 0 means infinite.
cs.setMaxBankAmount(0);
// Set Default Maximum Amount of Wallet Currency a user can have! (can be changed according to per user) here 0 means infinite.
cs.setMaxWalletAmount(0);
// Search for new npm package updates on bot startup! Latest version will be displayed in console.
cs.searchForNewUpdate(true);
  
}