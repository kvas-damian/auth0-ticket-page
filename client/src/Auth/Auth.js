import auth0 from 'auth0-js';
import {AUTH_REDIRECT_URL, AUTH0_DOMAIN, AUTH0_CLIENT_ID} from '../config';

export default class Auth {
	auth0 = new auth0.WebAuth({
		domain: AUTH0_DOMAIN,
		clientID: AUTH0_CLIENT_ID,
		redirectUri: AUTH_REDIRECT_URL,
		audience: `https://${AUTH0_DOMAIN}/api/v2/`,
		responseType: 'token id_token',
		scope: 'openid'
	});

	constructor() {
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.handleAuthentication = this.handleAuthentication.bind(this);
		this.isAuthenticated = this.isAuthenticated.bind(this);
	}

	login() {
		this.auth0.authorize();
	}

	handleAuthentication() {
		this.auth0.parseHash((err, authResult) => {
			if (authResult && authResult.accessToken && authResult.idToken) {
				this.setSession(authResult);
				window.location = '/';
			} else if (err) {
				window.location = '/';
				console.log(err);
			}
		});
	}

	setSession(authResult) {
		// Set the time that the Access Token will expire at
		let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
		localStorage.setItem('access_token', authResult.accessToken);
		localStorage.setItem('id_token', authResult.idToken);
		localStorage.setItem('expires_at', expiresAt);
		// navigate to the home route
		window.location = '/';
	}

	logout() {
		// Clear Access Token and ID Token from local storage
		localStorage.removeItem('access_token');
		localStorage.removeItem('id_token');
		localStorage.removeItem('expires_at');
		// navigate to the home route
		window.location = '/';
	}

	isAuthenticated() {
		// Check whether the current time is past the
		// Access Token's expiry time
		let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
		return new Date().getTime() < expiresAt;
	}

	getAccessToken() {
		return localStorage.getItem('access_token');
	}
}
