import auth0 from 'auth0-js';

export default class Auth {
	auth0 = new auth0.WebAuth({
		domain: 'will-code-for-pizza.eu.auth0.com',
		clientID: 'blnEMCR5i8tvWfKITsmVCv3mgrfLgiNv',
		redirectUri: 'http://localhost:3000/callback',
		audience: 'https://will-code-for-pizza.eu.auth0.com/userinfo',
		responseType: 'token id_token',
		scope: 'openid'
	});

	login() {
		this.auth0.authorize();
	}
}
