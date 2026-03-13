const express = require('express');
const { createShortUrl, redirectToOriginalUrl } = require('../controllers/urlController');

const router = express.Router();

// Define routes
router.post('/api/shorten', createShortUrl);
router.get('/:shortId', redirectToOriginalUrl);

module.exports = router;
