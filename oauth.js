const creds = require('./secrets.json') 
const express = require('express')
const QueryString = require('qs')
const axios = require('axios')


var port = 8000
var authurl = 'https://accounts.spotify.com/api/token'

var app = express()

app.get('/login', function(req, res) {
    var state = 'randomstatesixten'
    var scope = 'playlist-read-private playlist-modify-private user-library-read'

    res.redirect('https://accounts.spotify.com/authorize?' + 
        QueryString.stringify({
            response_type: 'code',
            client_id: creds['client_id'],
            scope: scope,
            redirect_uri: creds['redirect_uri'],
            state: state
        }))
})

app.get('/callback', async function(req, res) {
    var code = creds['code']
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
                redirect_uri: creds['redirect_uri'],
                grant_type: 'authorization_code'
            }), {
              headers: { 
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + (new Buffer.from(creds['client_id'] + ':' + creds['client_secret']).toString('base64'))
              }
            }).then(function(response) {
                console.log(response)
            })   
    }
})

app.get('/refresh_token', function(req, res) {
    var refresh_token = creds['refresh']
    axios.post(authurl,
        QueryString.stringify({
            refresh_token: refresh_token,
            grant_type: 'refresh_token'
        }), {
          headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + (new Buffer.from(creds['client_id'] + ':' + creds['client_secret']).toString('base64'))
          }
        }).then(function(response) {
            console.log(response)
            res.send({
                'access_token': response['access_token']
            })
        })  
})
app.listen(port)