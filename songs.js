const creds = require('./secrets.json')
const axios = require('axios')
const QueryString = require('qs')

const geturl = 'https://api.spotify.com/v1/me/tracks' 
// + creds['user_id'] + '/tracks'

// add limit and head params for incremental retrieval
exports.get_liked = async function(head) {
    var res = await axios.get(geturl + '?offset=' + head,
            {   
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + creds["token"]
                }
            })
    return res
}
