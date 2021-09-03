'use strict';

const axios = require('axios');

/**
 * A class to consume the RestFul API based on LinkedIn documentation.
 * https://developer.linkedin.com/docs/guide/v2
 */
module.exports = class LinkedInSDK {

    /**
     * Class constructor
     * 
     * @param client_id 
     * @param client_secret 
     * @param redirect_uri 
     */
    constructor (client_id, client_secret, redirect_uri)
    {
        this.oauth_url = 'https://www.linkedin.com/oauth/v2';

        this.client_id = client_id;
        this.client_secret = client_secret;
        this.redirect_uri = redirect_uri;

        if (!this.client_id) throw new Error('client_id is required');
        if (!this.client_secret) throw new Error('client_secret is required');
        if (!this.redirect_uri) throw new Error('redirect_uri is required');
    }

    /**
     * Get authorization URL
     * 
     * @param scope 
     * @param state 
     * @returns {string}
     */
    getAuthUrl(scope, state = '')
    {
        scope = encodeURIComponent(scope.join(','));
        state = encodeURIComponent(state);

        return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&state=${state}&scope=${scope}`;
    }

    /**
     * Set the access token
     * 
     * @param token 
     * @returns {LinkedInSDK}
     */
    setToken(token)
    {
        this.token = token;

        return this;
    }

    /**
     * Transform the authorization code in a access token
     * 
     * @param code 
     * @returns {Promise<Object>}
     */
    async getAccessToken(code)
    {
        if (!code) throw new Error ('Code is required.');

        const url = `https://www.linkedin.com/oauth/v2/accessToken`;
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', this.redirect_uri);
        params.append('client_id', this.client_id);
        params.append('client_secret', this.client_secret);

        let config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }

        return axios.post(url, params, config);
    }

    /**
     * Refresh the token
     * 
     * @returns {Promise<Object>}
     */
    async refreshToken()
    {
        if (!this.token) throw new Error ('Token is required.');

        const url = `https://www.linkedin.com/oauth/v2/accessToken`;
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', this.token);
        params.append('client_id', this.client_id);
        params.append('client_secret', this.client_secret);

        let config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }

        return axios.post(url, params, config);
    }

    /**
     * Get the token instrospection
     * 
     * @returns {Promise<Object>}
     */
    async tokenIntrospection()
    {
        if (!this.token) throw new Error ('Token is required.');

        const url = `https://www.linkedin.com/oauth/v2/introspectToken`;
        const params = new URLSearchParams();
        params.append('token', this.token);
        params.append('client_id', this.client_id);
        params.append('client_secret', this.client_secret);

        let config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }

        return axios.post(url, params, config);
    }

    /**
     * Get the user profile
     * 
     * @returns {Promise<Object>}
     */
    async getProfile()
    {
        if (!this.token) throw new Error ('Token is required.');

        const url = 'https://api.linkedin.com/v2/me';
        return axios.get(url, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
    }
};