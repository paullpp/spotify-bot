const creds = require('./secrets.json')
const axios = require('axios')
const QueryString = require('qs')

posturl = 'https://api.spotify.com/v1/users/' + creds['user_id'] + '/playlists'

exports.make_playlist = async function() {
    var res = await axios.post(posturl,
            JSON.stringify({
                name: "Liked Song Playlist",
                public: false
            }), {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + creds["token"]
            }
        })
    return res
}
