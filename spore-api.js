// this is based on the official Spore developer docs
// http://www.spore.com/comm/samples

const axios = require("axios");
const convert = require("xml-js");

const RESTBase = "http://spore.com/rest";

async function getXML(url){
    let hasErrored = false;

    const res = await axios.get(`${RESTBase}${url}`).catch(e => {
        let error = e.toJSON();
        throw new Error(`Server returned status ${error.status}`);
    });

    let converted = convert.xml2js(res.data, {
        compact: true
    });
    delete converted._declaration;
    return converted;
}




/**
 * Get daily stats about Spore.com
 * @returns
 */
exports.stats = () => getXML("/stats");



/**
 * Get various stats like height, diet, abilities etc. for a creature
 * @param {String} assetID The asset ID of the creature
 * @returns 
 */
exports.creatureStats = assetID => getXML(`/creature/${assetID}`);




/**
 * Get profile pic, tagline, user id and creation date
 * @param {String} username 
 * @returns 
 */
exports.user = username => getXML(`/user/${username}`);

/**
 * Get asset id, name, creation date, type, parent and rating for a list of assets created by a user
 * @param {String} username
 * @param {Number} [startIndex=0] The start index - i.e if it was 5 the first 5 assets would be skipped
 * @param {Number} [length=100] The number of assets to fetch
 * @returns 
 */
exports.userAssets = (username, startIndex=0, length=100) => getXML(`/assets/user/${username}/${startIndex}/${length}`)

/**
 * Get id, name, tags, subscription count, rating etc. for Sporecasts subscribed to by a user
 * @param {*} username 
 * @returns 
 */
exports.userSporecasts = username => getXML(`/sporecasts/${username}`);

/**
 * Get number of achievements for user and a list of achievement ids and unlock-dates
 * @param {String} username 
 * @param {Number} [startIndex=0] The start index - i.e if it was 5 the first 5 achievements would be skipped
 * @param {Number} [length=100] The number of achievements to fetch
 * @returns 
 */
exports.userAchievements = (username, startIndex=0, length=100) => getXML(`/assets/achievements/${username}/${startIndex}/${length}`)

/**
 * For a given username, get a list of buddy names and ids and total buddy count 
 * @param {String} username 
 * @param {Number} startIndex The start index - i.e if it was 5 the first 5 buddies would be skipped
 * @param {Number} length The number of buddies to fetch
 * @returns 
 */
exports.userBuddies = (username, startIndex=0, length=100) => getXML(`/users/buddies/${username}/${startIndex}/${length}`)

/**
 * For a given username, get the list of users who have added that username as a buddy.
 * @param {String} username 
 * @param {Number} startIndex The start index - i.e if it was 5 the first 5 subscribers would be skipped
 * @param {Number} length The number of subscribers to fetch
 * @returns 
 */
exports.userSubscribers = (username, startIndex=0, length=100) => getXML(`/users/subscribers/${username}/${startIndex}/${length}`)

/**
 * Get asset id, and name for assets in a sporecast 
 * @param {*} sporecastID ID of sporecast
 * @param {Number} [startIndex=0] The start index - i.e if it was 5 the first 5 sporecasts would be skipped
 * @param {Number} [length=100] The number of sporecasts to fetch
 * @returns 
 */
exports.sporecastAssets = (sporecastID, startIndex=0, length=100) => getXML(`/assets/sporecast/${sporecastID}/${startIndex}/${length}`)



/**
 * For a given asset id, get name, description, tags, 10 latest comments, type, parent, rating, creation date and author name/id
 * @param {*} assetID 
 * @returns 
 */
exports.asset = assetID => getXML(`/asset/${assetID}`)

/**
 * For a given asset id, get a list of comments, sender names and comment dates 
 * @param {*} assetID
 * @param {Number} [startIndex=0] The start index - i.e if it was 5 the first 5 comments would be skipped
 * @param {Number} [length=100] The number of comments to fetch
 * @returns 
 */
exports.assetComments = (assetID, startIndex=0, length=100) => getXML(`/comments/${assetID}/${startIndex}/${length}`)