# Turn Liked Songs into Playlist

## Dependencies:

- node
- npm

Add your spotify client id to the .env file as `CLIENT_ID=youridhere`

Add the redirect URL to the .env file as `REDIRECT_URI=http://localhost:8080/callback`

## Execution - Auth:

- npm install
- npm run auth

Authentication: 

1. Open `localhost:8000/login` in browser

2. Login with Spotify Account

3. copy `code=copythisrandomstring` from URL
 * Example: `http://localhost:8000/callback?code=NApCCgfiuenfd2aBkWtQ&state=34fFs29kd09
 * Copy the code from that URL
 * in this example, you would copy `NApCCgfiuenfd2aBkWtQ`
 
4. in .env file, add `CODE=yourcopiedcodehere`

5. Ctrl + C the running node process

6. re-start the server with npm run auth

7. Open `localhost:8000/callback` in browser

8. Make sure values printed in terminal window were correctly added to .env
 * This includes `TOKEN` and `REFRESH`
 
## Exectuion - App:

- npm run app

## Notes:

Spotify doesn't have the best API servers. 50X responses are common for endpoints such as the one used to add tracks to a playlist. This will result in unreliable execution, and out of 500 liked songs, around 250-350 random liked songs will be added to the newly created playlist. This is an ongoing issue. 