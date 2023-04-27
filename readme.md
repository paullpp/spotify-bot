Make sure to create a secrets.json file before developing

format: 

{
  "client_id": "",
  "client_secret": "",
  "redirect_uri": "",
  "code": "",
  "token": "",
  "refresh": "",
  "user_id": ""
}

client_id : client id (spotify dev app page)
client_secret : client secret (spotify dev app page)
redirect_uri : redirect uri (spotify dev app page)
code : auth code from /login endpoint 
token : access token from /callback endpoint
refresh : refresh token from /callback endpoint
user_id : spotify user id (username) (NOT profile name)

node oauth.js for auth

node app.js for app
