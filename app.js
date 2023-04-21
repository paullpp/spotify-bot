const creds = require('./secrets.json')
const axios = require('axios')
const QueryString = require('qs')
const { make_playlist } = require('./playlist')

var create_playlist = async function() {
    var res = new Promise (function(resolve, reject) {
        setTimeout(function() {
            resolve(make_playlist())
         },100);
        })
        res.then(result => console.log(''))

        return res
}

create_playlist().then(function(data) {
    console.log(data.data['id'])
})

