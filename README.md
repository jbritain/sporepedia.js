# sporepedia.js
![](https://img.shields.io/npm/v/sporepedia)

A JavaScript library for easy API access to the [Sporepedia](http://www.spore.com/sporepedia) - the content library for the 2008 god game 'Spore' by Maxis. This is essentially a wrapper for the [REST API provided by Spore](http://www.spore.com/comm/developer/).

## Installation

With npm
```bash
$ npm install sporepedia.js
```

```js
const spore = require("sporepedia");
```
`import` is not supported

## Usage

When `startIndex` is referred to, this is how many assets are skipped when loading a list. In conjunction with `length`, this is for pagination.

For example, if `startIndex` is `0` and `length` is `100`, it'll load the first 100 assets. If `startIndex` is then set to `100`, it'll load the second 100, and so on.

## Functions

<dl>
<dt><a href="#stats">stats()</a> ⇒ <code>String</code></dt>
<dd><p>Get daily stats about Spore.com</p>
</dd>
<dt><a href="#creatureStats">creatureStats(assetID)</a> ⇒ <code>String</code></dt>
<dd><p>Get various stats like height, diet, abilities etc. for a creature</p>
</dd>
<dt><a href="#user">user(username)</a> ⇒ <code>String</code></dt>
<dd><p>Get profile pic, tagline, user id and creation date</p>
</dd>
<dt><a href="#userAssets">userAssets(username, [startIndex], [length])</a> ⇒ <code>String</code></dt>
<dd><p>Get asset id, name, creation date, type, parent and rating for a list of assets created by a user</p>
</dd>
<dt><a href="#userSporecasts">userSporecasts(username)</a> ⇒ <code>String</code></dt>        
<dd><p>Get id, name, tags, subscription count, rating etc. for Sporecasts subscribed to by a 
user</p>
</dd>
<dt><a href="#userAchievements">userAchievements(username, [startIndex], [length])</a> ⇒ <code>String</code></dt>
<dd><p>Get number of achievements for user and a list of achievement ids and unlock-dates</p></dd>
<dt><a href="#userBuddies">userBuddies(username, startIndex, length)</a> ⇒ <code>String</code></dt>
<dd><p>For a given username, get a list of buddy names and ids and total buddy count</p>     
</dd>
<dt><a href="#userSubscribers">userSubscribers(username, startIndex, length)</a> ⇒ <code>String</code></dt>
<dd><p>For a given username, get the list of users who have added that username as a buddy.</p>
</dd>
<dt><a href="#sporecastAssets">sporecastAssets(sporecastID, [startIndex], [length])</a> ⇒ <code>String</code></dt>
<dd><p>Get asset id, and name for assets in a sporecast</p>
</dd>
<dt><a href="#asset">asset(assetID)</a> ⇒ <code>String</code></dt>
<dd><p>For a given asset id, get name, description, tags, 10 latest comments, type, parent, rating, creation date and author name/id</p>
</dd>
<dt><a href="#assetComments">assetComments(assetID, [startIndex], [length])</a> ⇒ <code>String</code></dt>
<dd><p>For a given asset id, get a list of comments, sender names and comment dates</p>      
</dd>
<dt><a href="#assetData">assetData(dataType, assetID)</a> ⇒ <code>String</code></dt>
<dd><p>Get XML and PNGs for an asset ID.</p>
</dd>
<dt><a href="#achievementIcon">achievementIcon(achievementID)</a> ⇒ <code>String</code></dt> 
<dd><p>Get the official Spore achievement icon for a given achievement id</p>
</dd>
<dt><a href="#search">search(viewType, startIndex, length)</a> ⇒ <code>String</code></dt>    
<dd><p>List creations for a given view</p>
</dd>
</dl>

<a name="stats"></a>

## stats() ⇒ <code>String</code>
Get daily stats about Spore.com

**Kind**: global function
**Returns**: <code>String</code> - JavaScript object containing some stats
<a name="creatureStats"></a>

## creatureStats(assetID) ⇒ <code>String</code>
Get various stats like height, diet, abilities etc. for a creature

**Kind**: global function
**Returns**: JavaScript object containing creature stats

| Param | Type | Description |
| --- | --- | --- |
| assetID | <code>String</code> | The asset ID of the creature |

<a name="user"></a>

## user(username) ⇒ <code>String</code>
Get profile pic, tagline, user id and creation date

**Kind**: global function
**Returns**: <code>String</code> - JavaScript object containg user data

| Param | Type |
| --- | --- |
| username | <code>String</code> |

<a name="userAssets"></a>

## userAssets(username, [startIndex], [length]) ⇒ <code>String</code>
Get asset id, name, creation date, type, parent and rating for a list of assets created by a 
user

**Kind**: global function
**Returns**: <code>String</code> - JavaScript object containing list of assets

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| username | <code>String</code> |  |  |
| [startIndex] | <code>Number</code> | <code>0</code> | The start index - i.e if it was 5 the first 5 assets would be skipped |
| [length] | <code>Number</code> | <code>100</code> | The number of assets to fetch |        

<a name="userSporecasts"></a>

## userSporecasts(username) ⇒ <code>String</code>
Get id, name, tags, subscription count, rating etc. for Sporecasts subscribed to by a user   

**Kind**: global function
**Returns**: <code>String</code> - JavaScript object containing info for Sporecasts

| Param | Type |
| --- | --- |
| username | <code>\*</code> |

<a name="userAchievements"></a>

## userAchievements(username, [startIndex], [length]) ⇒ <code>String</code>
Get number of achievements for user and a list of achievement ids and unlock-dates

**Kind**: global function
**Returns**: <code>String</code> - JavaScript object containing list of achievements

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| username | <code>String</code> |  |  |
| [startIndex] | <code>Number</code> | <code>0</code> | The start index - i.e if it was 5 the first 5 achievements would be skipped |
| [length] | <code>Number</code> | <code>100</code> | The number of achievements to fetch |  

<a name="userBuddies"></a>

## userBuddies(username, startIndex, length) ⇒ <code>String</code>
For a given username, get a list of buddy names and ids and total buddy count

**Kind**: global function
**Returns**: <code>String</code> - JavaScript object containing a list of buddies

| Param | Type | Description |
| --- | --- | --- |
| username | <code>String</code> |  |
| startIndex | <code>Number</code> | The start index - i.e if it was 5 the first 5 buddies would be skipped |
| length | <code>Number</code> | The number of buddies to fetch |

<a name="userSubscribers"></a>

## userSubscribers(username, startIndex, length) ⇒ <code>String</code>
For a given username, get the list of users who have added that username as a buddy.

**Kind**: global function
**Returns**: <code>String</code> - JavaScript object containing list of subscribers

| Param | Type | Description |
| --- | --- | --- |
| username | <code>String</code> |  |
| startIndex | <code>Number</code> | The start index - i.e if it was 5 the first 5 subscribers would be skipped |
| length | <code>Number</code> | The number of subscribers to fetch |

<a name="sporecastAssets"></a>

## sporecastAssets(sporecastID, [startIndex], [length]) ⇒ <code>String</code>
Get asset id, and name for assets in a sporecast

**Kind**: global function
**Returns**: <code>String</code> - JavaScript object containing info for assets

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sporecastID | <code>\*</code> |  | ID of sporecast |
| [startIndex] | <code>Number</code> | <code>0</code> | The start index - i.e if it was 5 the first 5 sporecasts would be skipped |
| [length] | <code>Number</code> | <code>100</code> | The number of sporecasts to fetch |    

<a name="asset"></a>

## asset(assetID) ⇒ <code>String</code>
For a given asset id, get name, description, tags, 10 latest comments, type, parent, rating, 
creation date and author name/id

**Kind**: global function
**Returns**: <code>String</code> - JavaScript object containing info for an asset

| Param | Type |
| --- | --- |
| assetID | <code>\*</code> |

<a name="assetComments"></a>

## assetComments(assetID, [startIndex], [length]) ⇒ <code>String</code>
For a given asset id, get a list of comments, sender names and comment dates

**Kind**: global function
**Returns**: <code>String</code> - JavaScript object containing list of comments

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| assetID | <code>\*</code> |  |  |
| [startIndex] | <code>Number</code> | <code>0</code> | The start index - i.e if it was 5 the first 5 comments would be skipped |
| [length] | <code>Number</code> | <code>100</code> | The number of comments to fetch |      

<a name="assetData"></a>

## assetData(dataType, assetID) ⇒ <code>String</code>
Get XML and PNGs for an asset ID.

**Kind**: global function
**Returns**: <code>String</code> - If dataType is 'model', returns an XML string with the model info. Otherwise returns the URL of the image

| Param | Type | Description |
| --- | --- | --- |
| dataType | <code>&#x27;model&#x27;</code> \| <code>&#x27;image&#x27;</code> \| <code>&#x27;thumb&#x27;</code> | 'model' returns the XML for a spore model, 'thumb' returns the URL to a 
smaller thumbnail of the asset, 'image' returns the URL to a full size image of the asset |  
| assetID | <code>String</code> |  |

<a name="achievementIcon"></a>

## achievementIcon(achievementID) ⇒ <code>String</code>
Get the official Spore achievement icon for a given achievement id

**Kind**: global function
**Returns**: <code>String</code> - The URL of the achievement icon

| Param | Type |
| --- | --- |
| achievementID | <code>\*</code> |

<a name="search"></a>

## search(viewType, startIndex, length) ⇒ <code>String</code>
List creations for a given view

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| viewType | <code>&quot;TOP\_RATED&quot;</code> \| <code>&quot;TOP\_RATED\_NEW&quot;</code> 
\| <code>&quot;NEWEST&quot;</code> \| <code>&quot;FEATURED&quot;</code> \| <code>&quot;RANDOM&quot;</code> \| <code>&quot;CUTE\_AND\_CREEPY&quot;</code> |  |
| startIndex | <code>\*</code> | The start index - i.e if it was 5 the first 5 creations would be skipped |
| length | <code>\*</code> | The number of creations to fetch |

<small>README generated with [jsdoc-to-markdown](https://www.npmjs.com/package/jsdoc-to-markdown)</small>