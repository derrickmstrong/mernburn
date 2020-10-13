// Import mongoose + Initialize schema
const mongoose = require('mongoose'),
schema = mongoose.Schema

// Create Schema(s)
const blogSchema = new schema({
    title: String,
    body: String,
    author: String,
})

// Export blogSchema
module.exports = blogSchema