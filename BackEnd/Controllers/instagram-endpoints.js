// retrieve constants
const config = require('../../config.js');
const rp = require('request-promise');
const instagram_url = config.instagram_url;

async function getImagesFromInstagram(req, res) {
    let url_info = await getURLsFromInstagram(req.params.account_name);
    if (url_info.status !== 200) {
        return res.status(url_info.status).json({status: url_info.status, message: url_info.message});
    }
    let url_list = url_info.urls;
    // have each image be in the list twice, so it can eventually be matched with itself
    for (let i = 0; i < config.num_imgs; i++) {
        url_list.push(url_list[i]);
    }
    url_list = shuffle(url_list);
    let position_urls = [];
    for (let i = 0; i < Math.sqrt(config.num_imgs * 2); i++) {
        position_urls[i] = url_list.slice((i * 4), ((i + 1) * 4));
    }
    return res.status(200).json(position_urls);
}

async function getURLsFromInstagram(account_name) {
    console.log(`INSTAGRAM: get images for account: ${account_name}`);
    const url = `${instagram_url}/${account_name}/?__a=1`;
    return rp({
        uri: url,
        method: 'GET',
        json: true
    }).then((data) => {
        const isPrivate = data.graphql.user.is_private;
        const imgCount = data.graphql.user.edge_owner_to_timeline_media.count;
        if (isPrivate){
            return {status: 400, message: "The account you requested to see the images of is private"};
        }
        if (imgCount < config.num_imgs) {
            return {status:400, message: `the account requested only has ${imgCount} images when the game needs ${config.num_imgs}`};
        }
        let urls = [];
        for (var i = 0; i < config.num_imgs; i++) {
            let url_name = data.graphql.user.edge_owner_to_timeline_media.edges[i].node.display_url;
            console.log(`image #${i}, URL=${url_name}`);
            urls.push(url_name); 
        }
        console.log(`Got first ${config.num_imgs} images of ${account_name}`);
        return {status: 200, urls: urls};
    }).catch((error) => {
        if (error.statusCode === 404) {
            // the instagram account does not exist
            return {status: 400, message: "The account you requested does not exist"}
        } 
        // another issue occurred
        console.error("Error when retrieving images from instagram");
        return {status: 500, message: "An error occurred when retrieving images from the instagram API"}
    });
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

module.exports = {
    getImagesFromInstagram : getImagesFromInstagram
}