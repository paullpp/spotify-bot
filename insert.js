const creds = require('./secrets.json')
const axios = require('axios')
const QueryString = require('qs')

base = 'https://api.spotify.com/v1/playlists/'
endpoint = '/tracks'

exports.insert_playlist = async function(id, uris) {
    var res = await axios.post(base + id + endpoint,
            JSON.stringify({
                uris: uris
            }), {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + creds["token"]
            }
        })
    return res
}


