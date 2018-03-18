const express = require('express');
const router = express.Router();
const zendesk = require('../api/zendesk');

/* GET users listing. */
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

router.put('/tickets/:ticketId(\\d+)', function (req, res, next) {
	zendesk.addComment(req.params.ticketId, 361671048472, req.body.comment).then(ticket => res.json(ticket));
});

module.exports = router;
