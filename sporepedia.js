// this is based on the official Spore developer docs
// http://www.spore.com/comm/samples

const axios = require("axios");
const convert = require("xml-js");

const APIBase = "http://spore.com";

async function getXML(url, type){
    if(!(["rest", "data", "atom"].includes(type))){
        return undefined;
    }

    const fullUrl = `${APIBase}/${type}${url}`
    const res = await axios.get(fullUrl).catch(e => {
        let error = e.toJSON();
        throw new Error(`Server returned status ${error.status} for URL ${fullUrl}`);
    });

    let converted = convert.xml2js(res.data, {
        compact: true
    });
    delete converted._declaration;
    return converted;
}



/* --------------------- REST --------------------- */
/**
 * Get daily stats about Spore.com
 * @returns {String} JavaScript object containing some stats
 */
exports.stats = async () => await getXML("/stats", "rest");



/**
 * Get various stats like height, diet, abilities etc. for a creature
 * @param {String} assetID The asset ID of the creature
 * @returns {String} JavaScript object containing creature stats
 */
exports.creatureStats = async assetID => await getXML(`/creature/${assetID}`, "rest");




/**
 * Get profile pic, tagline, user id and creation date
 * @param {String} username 
 * @returns {String} JavaScript object containg user data
 */
exports.user = async username => await getXML(`/user/${username}`, "rest");

/**
 * Get asset id, name, creation date, type, parent and rating for a list of assets created by a user
 * @param {String} username
 * @param {Number} [startIndex=0] The start index - i.e if it was 5 the first 5 assets would be skipped
 * @param {Number} [length=100] The number of assets to fetch
 * @returns {String} JavaScript object containing list of assets
 */
exports.userAssets = async (username, startIndex=0, length=100) => await getXML(`/assets/user/${username}/${startIndex}/${length}`, "rest")

/**
 * Get id, name, tags, subscription count, rating etc. for Sporecasts subscribed to by a user
 * @param {*} username 
 * @returns {String} JavaScript object containing info for Sporecasts
 */
exports.userSporecasts = async username => await getXML(`/sporecasts/${username}`, "rest");

/**
 * Get number of achievements for user and a list of achievement ids and unlock-dates
 * @param {String} username 
 * @param {Number} [startIndex=0] The start index - i.e if it was 5 the first 5 achievements would be skipped
 * @param {Number} [length=100] The number of achievements to fetch
 * @returns {String} JavaScript object containing list of achievements
 */
exports.userAchievements = async (username, startIndex=0, length=100) => await getXML(`/assets/achievements/${username}/${startIndex}/${length}`, "rest")

/**
 * For a given username, get a list of buddy names and ids and total buddy count 
 * @param {String} username 
 * @param {Number} startIndex The start index - i.e if it was 5 the first 5 buddies would be skipped
 * @param {Number} length The number of buddies to fetch
 * @returns {String} JavaScript object containing a list of buddies
 */
exports.userBuddies = async (username, startIndex=0, length=100) => await getXML(`/users/buddies/${username}/${startIndex}/${length}`, "rest")

/**
 * For a given username, get the list of users who have added that username as a buddy.
 * @param {String} username 
 * @param {Number} startIndex The start index - i.e if it was 5 the first 5 subscribers would be skipped
 * @param {Number} length The number of subscribers to fetch
 * @returns {String} JavaScript object containing list of subscribers
 */
exports.userSubscribers = async (username, startIndex=0, length=100) => await getXML(`/users/subscribers/${username}/${startIndex}/${length}`, "rest")

/**
 * Get asset id, and name for assets in a sporecast 
 * @param {*} sporecastID ID of sporecast
 * @param {Number} [startIndex=0] The start index - i.e if it was 5 the first 5 sporecasts would be skipped
 * @param {Number} [length=100] The number of sporecasts to fetch
 * @returns {String} JavaScript object containing info for assets
 */
exports.sporecastAssets = async (sporecastID, startIndex=0, length=100) => await getXML(`/assets/sporecast/${sporecastID}/${startIndex}/${length}`, "rest")



/**
 * For a given asset id, get name, description, tags, 10 latest comments, type, parent, rating, creation date and author name/id
 * @param {*} assetID 
 * @returns {String} JavaScript object containing info for an asset
 */
exports.asset = async assetID => await getXML(`/asset/${assetID}`, "rest")

/**
 * For a given asset id, get a list of comments, sender names and comment dates 
 * @param {*} assetID
 * @param {Number} [startIndex=0] The start index - i.e if it was 5 the first 5 comments would be skipped
 * @param {Number} [length=100] The number of comments to fetch
 * @returns {String} JavaScript object containing list of comments
 */
exports.assetComments = async (assetID, startIndex=0, length=100) => await getXML(`/comments/${assetID}/${startIndex}/${length}`, "rest")



/* --------------------- STATIC --------------------- */

/**
 * Get XML and PNGs for an asset ID.
 * @param {('model'|'image'|'thumb')} dataType 'model' returns the XML for a spore model, 'thumb' returns the URL to a smaller thumbnail of the asset, 'image' returns the URL to a full size image of the asset
 * @param {String} assetID 
 * @returns {String} If dataType is 'model', returns an XML string with the model info. Otherwise returns the URL of the image
 */
exports.assetData = async (dataType, assetID) => {

    if (!["model", "image", "thumb"].includes(dataType)){
        throw new Error(`Invalid data type ${dataType}`);
    }

    const subID1 = assetID.slice(0, 3);
    const subID2 = assetID.slice(3, 6);
    const subID3 = assetID.slice(6, 9);

    if (dataType === "model"){
        const url = `${APIBase}/static/model/${subID1}/${subID2}/${subID3}/${assetID}.xml`
        let res = await axios.get(url).catch(e => {
            let error = e.toJSON();
            throw new Error(`Server returned status ${error.status} for URL ${url}`);
        });
        return res.data
    } else {
        return `${APIBase}/static/${dataType}/${subID1}/${subID2}/${subID3}/${assetID}${(dataType === "image") ? "_lrg" : ""}.png`
    }
}

/**
 * Get the official Spore achievement icon for a given achievement id
 * @param {*} achievementID 
 * @returns {String} The URL of the achievement icon
 */
exports.achievementIcon = async (achievementID) => {return `${APIBase}/static/war/images/achievements/${achievementID}.png`}


/* --------------------- RSS --------------------- */
/**
 * List creations for a given view
 * @param {("TOP_RATED" | "TOP_RATED_NEW" | "NEWEST" | "FEATURED" | "RANDOM" | "CUTE_AND_CREEPY")} viewType 
 * @param {*} startIndex The start index - i.e if it was 5 the first 5 creations would be skipped
 * @param {*} length The number of creations to fetch
 * @returns {String}
 */
exports.search = async (viewType, startIndex, length) => {
    if (!["TOP_RATED", "TOP_RATED_NEW", "NEWEST", "FEATURED", "RANDOM", "CUTE_AND_CREEPY"].includes(viewType)){
        throw new Error("Invalid view type");
    }

    return getXML(`${APIBase}/atom/assets/view/${viewType}/${startIndex}/${length}`);
}

(async () => {
    console.log(await exports.stats())
})()