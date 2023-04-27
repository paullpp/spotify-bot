const express = require('express')
const QueryString = require('qs')
const axios = require('axios')
require('dotenv').config()


var port = 8000
var authurl = 'https://accounts.spotify.com/api/token'

var app = express()

app.get('/login', function(req, res) {
    var state = 'randomstatesixten'
    var scope = 'playlist-read-private playlist-modify-private user-library-read'

    res.redirect('https://accounts.spotify.com/authorize?' + 
        QueryString.stringify({
            response_type: 'code',
            client_id: process.env.CLIENT_ID,
            scope: scope,
            redirect_uri: process.env.REDIRECT_URI,
            state: state
        }))
})

app.get('/callback', async function(req, res) {
    var code = process.env.CODE
    var state = 'randomstatesixten'

    if (state == null) {
        res.redirect('/# '+ 
            querytring.stringify({
                error: 'state_mismatch'
            }))
    } else {
        axios.post(authurl,
            QueryString.stringify({
                code: code,
                redirect_uri: process.env.REDIRECT_URI,
                grant_type: 'authorization_code'
            }), {
              headers: { 
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + (new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
              }
            }).then(function(response) {
                console.log(response)
            })   
    }
})

app.get('/refresh_token', function(req, res) {
    var refresh_token = process.env.REFRESH
    axios.post(authurl,
        QueryString.stringify({
            refresh_token: refresh_token,
            grant_type: 'refresh_token'
        }), {
          headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + (new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
          }
        }).then(function(response) {
            console.log(response.data)
            process.env.TOKEN = response.data.access_token
            res.send({
                'access_token': response.data.access_token
            })
        })  
})
app.listen(port)