const creds = require('./secrets.json')
const axios = require('axios')
const QueryString = require('qs')
const { make_playlist } = require('./playlist')
const { get_liked } = require('./songs')
const { insert_playlist } = require('./insert')

var created_id = 0
var total = 0
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

var liked_call = async function(head) {
    var res = new Promise (function(resolve, reject) {
        setTimeout(function() {
            resolve(get_liked(head))
        }, 100)
        })
        res.then(result => console.log(''))

        return res
}

var add_songs = async function(id, uris) {
    var res = new Promise (function(resolve, reject) {
        setTimeout(function() {
            resolve(insert_playlist(id, uris))
        }, 100)
        })
        res.then(result => console.log(''))

        return res
}

liked_call(0).then(function(data) {
    total = data.data.total
    processed = 20
    songarr = data.items

    for (i = 0; i < (data.data['items']).length; i++) {
        //console.log(data.data.items[i].track.uri)
        uriarr.push(data.data.items[i].track.uri)
    }

    while (processed < total) {
        liked_call(processed).then(function(data) {
            var temparr = []
            for (i = 0; i < (data.data['items']).length; i++) {
                //console.log(data.data.items[i].track.uri)
                temparr.push(data.data.items[i].track.uri)
            }
            add_songs(created_id, temparr).then(function(data) {
                console.log(data.data.snapshot_id)
            })
        })
        processed += 20   
    }
})





