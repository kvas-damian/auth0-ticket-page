const express = require('express');
const router = express.Router();
const zendesk = require('../api/zendesk');

router.get('/tickets/:ticketId(\\d+)', function(req, res, next) {
	zendesk.getTicket(req.params.ticketId).then(ticket => {
		if (ticket) {
			return res.json(ticket);
		} else {
			res.status(404).send('Not found');
		}
	}).catch(error => {
		console.log(error);
		res.status(500).send('Server encountered an unexpected error. Please try again later');
	});
});

router.get('/tickets', function(req, res, next) {
	const userEmail = req.user['https://will-code-for-pizza.blackpress.pl/email'];
	zendesk.findUser(userEmail).then(user => {
		if (user) {
			zendesk.getRequestedTickets(user.id).then(tickets => {
				res.json(tickets);
			});
		} else {
			res.status(403).send('Forbiden');
		}
	});
});

router.put('/tickets/:ticketId(\\d+)', function (req, res, next) {
	// TODO check email verified
	const userEmail = req.user['https://will-code-for-pizza.blackpress.pl/email'];
	zendesk.findUser(userEmail).then(user => {
		if (user) {
			zendesk.addComment(req.params.ticketId, user.id, req.body.comment).then(ticket => res.json(ticket));
		} else {
			const userName = req.user['https://will-code-for-pizza.blackpress.pl/name'];
			const newUser = zendesk.createUser(userEmail, userName);
			zendesk.addComment(req.params.ticketId, newUser.id, req.body.comment).then(ticket => res.json(ticket));
		}
	});
});

module.exports = router;
