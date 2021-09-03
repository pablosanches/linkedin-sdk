# LinkedInSDK

#### Official API Docs

https://developer.linkedin.com/docs/guide/v2

#### Usage
```js
const LinkedInSDK = require('linkedin-sdk');
const linkedin = new LinkedInSDK(clientID, clientSecret, redirectURI);

// Getting the authorization window link
let authURI = linkedin.getAuthUrl(['r_liteprofile'], 'state-param-here');

// Exchanging the authorization code by a access token
linkedin
    .setToken(token)
    .getAccessToken()
    .then(data => {})
    .catch(err => {})

// Refreshing the token
linkedin
    .setToken(token)
    .refreshToken()
    .then(data => {})
    .catch(err => {})

// Getting the token instrospection
linkedin
    .setToken(token)
    .tokenIntrospection()
    .then(data => {})
    .catch(err => {})

// Getting the user profile
linkedin
    .setToken(token)
    .getProfile()
    .then(profile => {})
    .catch(err => {})
```
