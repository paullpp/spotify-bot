const creds = require('./secrets.json')
const axios = require('axios')
const QueryString = require('qs')

posturl = 'https://api.spotify.com/v1/users/' + creds['user_id'] + '/tracks'