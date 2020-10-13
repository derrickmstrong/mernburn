// Import express + Initialize blog routes, app
const express = require('express'),
blogRouter = require('./blog'),
app = express()

// Use blog routes
app.use(blogRouter)

// Export app
module.exports = app;
