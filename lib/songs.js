const axios = require('axios')
const QueryString = require('qs')
require('dotenv').config()

const geturl = 'https://api.spotify.com/v1/me/tracks' 

exports.get_liked = async function(head) {
    var res = await axios.get(geturl + '?offset=' + head,
            {   
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + process.env.TOKEN
                }
            })
    return res
}
