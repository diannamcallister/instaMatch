// retrieve constants
const config = require('../../config.js');
const rp = require('request-promise');
const instagram_url = config.instagram_url;

function getImagesFromInstagram(account_name) {
    console.log('INSTAGRAM: get images for account: ' + account_name);
    const url = instagram_url + '/' + account_name + '/?__a=1';
    return rp({
        uri: url,
        method: 'GET',
        json: true
    }).then((result) => {
        console.log("got data!")
        console.log(result);
    }).catch((error) => {
        console.log("error!");
        console.log(error);
    });
}

module.exports = {
    getImagesFromInstagram : getImagesFromInstagram
}