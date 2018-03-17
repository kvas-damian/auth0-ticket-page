const express = require('express');
const router = express.Router();
const zendesk = require('../api/zendesk');

/* GET users listing. */
router.get('/tickets/:ticketId(\\d+)', function(req, res, next) {
	zendesk.getTicket(req.params.ticketId).then(ticket => res.json(ticket));
});

router.put('/tickets/:ticketId(\\d+)', function (req, res, next) {
	zendesk.addComment(req.params.ticketId, 361671048472, req.body.comment).then(ticket => res.json(ticket));
});

module.exports = router;
