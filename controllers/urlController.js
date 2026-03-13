const Url = require('../models/Url');
const { nanoid } = require('nanoid');

// @desc    Create Short URL
// @route   POST /api/shorten
// @access  Public
const createShortUrl = async (req, res, next) => {
  try {
    const { url } = req.body;

    // Basic URL validation
    if (!url) {
      res.status(400);
      throw new Error('Please provide a URL to shorten');
    }

    try {
      new URL(url); // Throws an error if invalid URL format
    } catch (err) {
      res.status(400);
      throw new Error('Invalid URL format');
    }

    // Check if the URL already exists in our database
    let existingUrl = await Url.findOne({ originalUrl: url });
    if (existingUrl) {
      return res.status(200).json({
        shortUrl: `${process.env.BASE_URL}/${existingUrl.shortId}`
      });
    }

    // Generate short ID (e.g. 8 characters long)
    const shortId = nanoid(8);

    // Create a new URL entry
    const newUrl = new Url({
      shortId,
      originalUrl: url
    });

    await newUrl.save();

    // Return the shortened URL to the client
    res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${shortId}`
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Redirect to Original URL
// @route   GET /:shortId
// @access  Public
const redirectToOriginalUrl = async (req, res, next) => {
  try {
    const { shortId } = req.params;

    // Look up the shortId in MongoDB
    const urlDoc = await Url.findOne({ shortId });

    if (!urlDoc) {
      // If shortId does not exist, return 404 JSON response
      res.status(404);
      throw new Error('URL not found');
    }

    // Redirect the user to the original URL
    res.redirect(urlDoc.originalUrl);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createShortUrl,
  redirectToOriginalUrl
};
