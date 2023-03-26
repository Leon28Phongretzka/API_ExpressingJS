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

        // Get Hardwell spotify ID
        spotifyAPI.searchArtists('Hardwell').then(
            function (data) {
                console.log('Hardwell_ID = ' + data.body.artists.items[0].id);
            }
        );
        // Get Martin Garrix spotify ID
        spotifyAPI.searchArtists('Martin Garrix').then(
            function (data) {
                console.log('Martin_Garrix_ID = ' + data.body.artists.items[0].id);
            }
        );
        // Get Sub Zero Project spotify ID
        spotifyAPI.searchArtists('Sub Zero Project').then(
            function (data) {
                console.log('Sub_Zero_Project_ID = ' + data.body.artists.items[0].id);
            }
        );

        // Get KSHMR spotify ID
        spotifyAPI.searchArtists('KSHMR').then(
            function (data) {
                console.log('KSHMR_ID = ' + data.body.artists.items[0].id);
            }
        );

        // Get Dimitri Vegas & Like Mike spotify ID
        spotifyAPI.searchArtists('Dimitri Vegas & LikeMike').then(
            function (data) {
                console.log('Dimitri_Vegas_&_Like_Mike_ID = ' + data.body.artists.items[0].id);
            }
        );

        // Get Don Diablo spotify ID
        spotifyAPI.searchArtists('Don Diablo').then(
            function (data) {
                console.log('Don_Diablo_ID = ' + data.body.artists.items[0].id);
            }
        );

        // Get Apashe ID
        spotifyAPI.searchArtists('Apashe').then(
            function (data)
            {
                console.log('Apashe_ID = ' + data.body.artists.items[0].id);
            }
        );

        // Get Coone ID
        spotifyAPI.searchArtists('Coone').then(
            function(data)
            {
                console.log('Coone_ID = ' + data.body.artists.items[0].id);
            }
        );

        // Get Avicii ID
        spotifyAPI.searchArtists('Avicii').then(
            function(data)
            {
                console.log('Avicii_ID = ' + data.body.artists.items[0].id);
            }
        );

        // Get W&W ID
        spotifyAPI.searchArtists('W&W').then(
            function(data)
            {
                console.log('W&W_ID = ' + data.body.artists.items[0].id);
            }
        );

        // Get Crunkz ID
        spotifyAPI.searchArtists('Crunkz').then(
            function(data)
            {
                console.log('Crunkz_ID = ' + data.body.artists.items[0].id);
            }
        );
    },
    function (err) {
      console.log('Login failed!', err);
    }
);
