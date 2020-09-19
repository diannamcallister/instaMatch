// retrieve constants
const config = require('../../config.js');
const rp = require('request-promise');
const instagram_url = config.instagram_url;

async function getImagesFromInstagram(req, res) {
    let url_info = await getURLsFromInstagram(req.params.account_name);
    if (url_info.status !== 200) {
        return res.status(url_info.status).json({status: url_info.status, message: url_info.message});
    }
    return res.status(200).json(url_info.urls);
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
        let urls = {};
        for (var i = 0; i < config.num_imgs; i++) {
            let url_name = data.graphql.user.edge_owner_to_timeline_media.edges[i].node.display_url;
            console.log(`image #${i}, URL=${url_name}`);
            urls[i] = url_name; 
        }
        console.log(`Got first ${config.num_imgs} images of ${account_name}`);
        return {status: 200, urls: urls};
    }).catch((error) => {
        console.error("Error when retrieving images from instagram");
        console.error(error);
        return {status: 500, message: "An error occurred when retrieving images from the instagram API"}
    });
}

module.exports = {
    getImagesFromInstagram : getImagesFromInstagram
}