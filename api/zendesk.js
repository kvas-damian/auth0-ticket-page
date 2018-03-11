const config = require('../config');
const fetch = require("node-fetch");

const API_URL = 'https://will-code-for-pizza.zendesk.com/api/v2/';


function makeRequrest(path, method='GET') {
	const url = `${API_URL}${path}`;
	const basicAuthToken = new Buffer(`${config.ZENDESK_API_USER}/token:${config.ZENDESK_API_TOKEN}`, "utf8")
		.toString("base64");

	// TODO add error handling
	return fetch(url, { headers: { Authorization: `Basic ${basicAuthToken}` } }).then(res => res.json());
}

module.exports = {
	// TODO add authorization
	getTicket(ticketId) {
		const ticketPath = `tickets/${ticketId}.json`;
		const commentsPath = `tickets/${ticketId}/comments.json`;

		// TODO error handling, 500s, 404s, ...
		return makeRequrest(ticketPath).then(ticket =>
			makeRequrest(commentsPath).then(comments => {
				ticket.ticket.comments = comments.comments;
				return ticket.ticket;
			})
		);
	}
};
