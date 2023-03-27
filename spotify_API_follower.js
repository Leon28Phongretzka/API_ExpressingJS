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
        
        // Get Sub Zero Project's spotify follower
        spotifyAPI.getArtist(process.env.Sub_Zero_Project_ID).then(
            function (data) {
                console.log('SZP_Follower = ' + data.body.followers.total);
            }
        );

        // Get KSHMR's spotify follower
        spotifyAPI.getArtist(process.env.KSHMR_ID).then(
            function (data) {
                console.log('KSHMR_Follower = ' + data.body.followers.total);
            }
        );

        // Get Apashe spotify follower
        spotifyAPI.getArtist(process.env.Apashe_ID).then(
            function (data) {
                console.log('Apashe_Follower = ' + data.body.followers.total);
            }
        );

        spotifyAPI.getArtist(process.env.DVLM_ID).then(
            function (data) {
                console.log('DVLM_Follower = ' + data.body.followers.total);
            }
        );

        spotifyAPI.getArtist(process.env.Don_Diablo_ID).then(
            function (data) {
                console.log('Don_Diablo_Follower = ' + data.body.followers.total);
            }
        );

        spotifyAPI.getArtist(process.env.W_W_ID).then(
            function (data) {
                console.log('W-W_Follower = ' + data.body.followers.total);
            }
        );

        spotifyAPI.getArtist(process.env.Coone_ID).then(
            function (data) {
                console.log('Coone_Follower = ' + data.body.followers.total);
            }
        );
        
        spotifyAPI.getArtist(process.env.Avicii_ID).then(
            function (data) {
                console.log('Avicii_Follower = ' + data.body.followers.total);
            }
        );

        spotifyAPI.getArtist(process.env.Crunkz_ID).then(
            function (data) {
                console.log('Crunkz_Follower = ' + data.body.followers.total);
            }
        );

    },
    function (err) {
      console.log('Login failed!', err);
    }
);
