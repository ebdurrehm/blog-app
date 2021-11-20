var mongoose = require('mongoose');


const Schema = mongoose.Schema;
const AuthorSchema = Schema({
    name: String,
    surname: String,
    email: String,
    article: [{ type: Schema.Types.ObjectId, ref: 'data' }],
    image: String,
    bio: String,

})

module.exports = mongoose.model('authors', AuthorSchema);