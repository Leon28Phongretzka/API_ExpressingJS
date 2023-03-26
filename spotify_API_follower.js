const spotifyWebAPI = require('spotify-web-api-node');
require('dotenv').config();

const spotifyAPI = new spotifyWebAPI({
    clientId: process.env.MY_CLIENT_ID,
    clientSecret: process.env.MY_CLIENT_SECRET,
});

spotifyAPI.clientCredentialsGrant().then(
    function (data) {
        console.log('Login Successful!');
        spotifyAPI.setAccessToken(data.body['access_token']);

        // Get Hardwell's spotify follower
        spotifyAPI.getArtist(process.env.Hardwell_ID).then(
            function (data) {
                console.log('Hardwell_Follower = ' + data.body.followers.total);
            }
        );     
        
        // Get Martin Garrix's spotify follower
        spotifyAPI.getArtist(process.env.Martin_Garrix_ID).then(
            function (data) {
                console.log('MG_Follower = ' + data.body.followers.total);
            }
        );   
    },
    function (err) {
      console.log('Login failed!', err);
    }
);
