const config = require('../config');
const fetch = require("node-fetch");

const API_URL = 'https://will-code-for-pizza.zendesk.com/api/v2/';


function makeRequest(path, method='GET', body) {
	const url = `${API_URL}${path}`;
	const basicAuthToken = new Buffer(`${config.ZENDESK_API_USER}/token:${config.ZENDESK_API_TOKEN}`, "utf8")
		.toString("base64");

	return fetch(url, {
		headers: { Authorization: `Basic ${basicAuthToken}`, 'Content-Type': 'application/json' },
		method,
		body: JSON.stringify(body)
	}).then(res => {
		if (res.status === 200 || res.status === 201) {
			return res.json();
		} else if (res.status === 404) {
			return null;
		} else {
			console.log(res);
			const error = new Error(res.status);
			error.response = res.statusText;
			return Promise.reject(error);
		}
	});
}

function formatAuthor(author) {
	const names = author.name.split(' ');

	return {
		email: author.email,
		name: author.name,
		photo: author.photo ? author.photo.content_url : null,
		initials: names[0][0] + (names[1] ? ' ' + names[1][0] : '')
	}
}

module.exports = {
	getTicket(ticketId) {
		const ticketPath = `tickets/${ticketId}.json?include=users`;
		const commentsPath = `tickets/${ticketId}/comments.json?include=users`;

		return makeRequest(ticketPath).then(ticketResponse => {
			if (ticketResponse) {
				return makeRequest(commentsPath).then(comments => {
					const ticket = {
						subject: ticketResponse.ticket.subject,
						submitter_id: ticketResponse.ticket.submitter_id,
						collaborators: ticketResponse.ticket.collaborator_ids.map(userId => formatAuthor(ticketResponse.users.find(user => user.id === userId)))
					};

					ticket.comments = comments.comments.map(comment => ({
						author: formatAuthor(comments.users.find(user => user.id === comment.author_id)),
						author_id: comment.author_id,
						created_at: comment.created_at,
						html_body: comment.html_body,
						id: comment.id,
					}));
					return ticket;
				});
			}

			return Promise.resolve();
		});
	},

	getRequestedTickets(userId) {
		const path = `users/${userId}/tickets/requested.json`;

		return makeRequest(path).then(res => {
			return res.tickets.map(ticket => ({
				id: ticket.id,
				subject: ticket.subject
			}))
		});
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

			return this.getUser(authorId).then(user => ({
				author: formatAuthor(user),
				author_id: comment.author_id,
				html_body: comment.html_body,
				created_at: res.audit.created_at,
				id: comment.id
			}));
		});
	},

	getUser(userId) {
		const path = `users/${userId}.json`;

		return makeRequest(path).then(res => res.user);
	},

	findUser(email) {
		const path = `search.json?query=type:user email:"${email}"`;

		return makeRequest(path).then(res => {
			return res.results && res.results[0];
		});
	},

	createUser(email, name) {
		return makeRequest('users.json', 'POST', {
			user: {
				email,
				name
			}
		}).then(res => res.user);
	}
};
