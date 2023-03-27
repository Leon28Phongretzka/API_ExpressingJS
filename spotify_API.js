const spotifyWebAPI = require('spotify-web-api-node');
require('dotenv').config();

const spotifyAPI = new spotifyWebAPI({
    clientId: process.env.MY_CLIENT_ID,
    clientSecret: process.env.MY_CLIENT_SECRET,
});

function spotify_followers(artist_name) {
    spotifyAPI.clientCredentialsGrant().then(
        function (data) {
            console.log('Login Successful!');
            spotifyAPI.setAccessToken(data.body['access_token']);

            spotifyAPI.getArtist(artist_name).then(
                function (data) {
                    console.log('Follower = ' + data.body.followers.total);
                    return data.body.followers.total;
                }
            );
        }
    );
}

module.exports = spotify_followers;
