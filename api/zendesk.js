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

module.exports = {
	// TODO add authorization
	getTicket(ticketId) {
		const ticketPath = `tickets/${ticketId}.json`;
		const commentsPath = `tickets/${ticketId}/comments.json`;

		// TODO error handling, 500s, 404s, ...
		return makeRequest(ticketPath).then(ticket =>
			makeRequest(commentsPath).then(comments => {
				ticket.ticket.comments = comments.comments;
				return ticket.ticket;
			}).then(ticket =>{
				const authorIds = ticket.comments.map(comment => comment.author_id);

				return makeRequest(`users/show_many.json?ids=${[...new Set(authorIds)].join(',')}`).then(authors => {
					const authorOutput = {};

					authors.users.forEach(author => {
						const names = author.name.split(' ');

						authorOutput[author.id] = {
							name: author.name,
							photo: authors.users[0].photo ? authors.users[0].photo.content_url : null,
							initials: names[0][0] + (names[1] ? ' ' + names[1][0] : '')
						}
					});

					ticket.comments.forEach(comment => comment.author = authorOutput[comment.author_id]);
					return ticket;
				});
			})
		);
	},

	addComment(ticketId, authorId, body) {
		const ticketPath = `tickets/${ticketId}.json`;

		return makeRequest(ticketPath, 'PUT', {
			ticket: {
				comment: {
					author_id: authorId,
					body
				}
			}
		});
	}
};
