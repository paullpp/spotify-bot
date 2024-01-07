const axios = require('axios')
const QueryString = require('qs')
const { make_playlist } = require('./playlist')
const { get_liked } = require('./songs')
const { insert_playlist } = require('./insert')
require('dotenv').config()

var created_id = 0
var uriarr = []
var songarr = []
var processed = 0

var create_playlist = async function() {
    var res = new Promise (function(resolve, reject) {
        setTimeout(function() {
            resolve(make_playlist())
         },100)
        })
        res.then(result => console.log(''))

        return res
}

create_playlist().then(function(data) {
    created_id = data.data['id']
})

var liked_call = function(head) {
    var res = new Promise (function(resolve, reject) {
        setTimeout(function() {
            resolve(get_liked(head))
        }, 1000)
        })
        res.then(result => console.log(''))

        return res
}

var add_songs = async function(id, uris, processed) {
    added = 0
    while (added < processed) {
        endindex = added + 100
        await insert_playlist(id, uris.slice(added, endindex)).then(data => console.log(data.data.snapshot_id))
        added += 100
    }
}
  
var get_uris = async function() {
    var total = 1000
    var processed = 0
    while (processed < total) {
        await liked_call(processed).then(function(data) {
            total = data.data.total
            for (i = 0; i < (data.data['items']).length; i++) {
                uriarr.push(data.data.items[i].track.uri)
            }
        })
        processed += 50
    }
    return processed
}

get_uris().then(function(data) {
    console.log(uriarr.length)
    add_songs(created_id, uriarr, data).then(function(data) {
        console.log(data)
    })
})





