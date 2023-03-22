const sporeAPI = require("./spore-api.js");

(async () => {
    console.log(await sporeAPI.userAssets("HyperHamster534"));
})();
