const axios = require('axios')
const QueryString = require('qs')
require('dotenv').config()

const posturl = 'https://api.spotify.com/v1/users/' + process.env.USER_ID + '/playlists'

exports.make_playlist = async function() {
    var res = await axios.post(posturl,
            JSON.stringify({
                name: "Liked Song Playlist",
                public: false
            }), {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.TOKEN
            }
        })
    return res
}
