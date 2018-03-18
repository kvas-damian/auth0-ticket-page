const config = require('../config');
const fetch = require("node-fetch");

const API_URL = 'https://will-code-for-pizza.zendesk.com/api/v2/';


function makeRequest(path, method='GET', body) {
	const url = `${API_URL}${path}`;
	const basicAuthToken = new Buffer(`${config.ZENDESK_API_USER}/token:${config.ZENDESK_API_TOKEN}`, "utf8")
		.toString("base64");

	// TODO add error handling
	return fetch(url, {
		headers: { Authorization: `Basic ${basicAuthToken}`, 'Content-Type': 'application/json' },
		method,
		body: JSON.stringify(body)
	}).then(res => res.json());
}

function formatAuthor(author) {
	const names = author.name.split(' ');

	return {
		name: author.name,
		photo: author.photo ? author.photo.content_url : null,
		initials: names[0][0] + (names[1] ? ' ' + names[1][0] : '')
	}
}

module.exports = {
	// TODO add authorization
	getTicket(ticketId) {
		const ticketPath = `tickets/${ticketId}.json`;
		const commentsPath = `tickets/${ticketId}/comments.json?include=users`;

		// TODO error handling, 500s, 404s, ...
		return makeRequest(ticketPath).then(ticketResponse =>
			makeRequest(commentsPath).then(comments => {
				const ticket = {
					subject: ticketResponse.ticket.subject,
					submitter_id: ticketResponse.ticket.submitter_id
				};

				ticket.comments = comments.comments.map(comment => ({
					author: formatAuthor(comments.users.find(user => user.id === comment.author_id)),
					author_id: comment.author_id,
					created_at: comment.created_at,
					html_body: comment.html_body,
					id: comment.id,
				}));
				return ticket;
			})
		);
	},

	addComment(ticketId, authorId, body) {
		const ticketPath = `tickets/${ticketId}.json?include=users`;

		return makeRequest(ticketPath, 'PUT', {
			ticket: {
				comment: {
					author_id: authorId,
					body
				}
			}
		}).then(res => {
			const comment = res.audit.events[0];

			return {
				author: formatAuthor(res.users.find(user => user.id === comment.author_id)),
				author_id: comment.author_id,
				html_body: comment.html_body,
				created_at: res.audit.created_at,
				id: comment.id
			};
		});
	}
};
