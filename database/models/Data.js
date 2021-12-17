var mongoose = require("mongoose");


const opts = {toJSON: {virtuals: true}};
const Schema = mongoose.Schema;
const userSchema = new Schema({
    author: String,
    title: String,
    content: String,
    description: String,
    date: { type: Date, default: Date.now },
    slug: String,
    tags: [String],
    image: String,
    likes: { type: Number, default: 0 },
    readCount: { type: Number, default: 0 },
    comment: [{
        name: String,
        email: String,
        text: String,
        like: {type: Number, default: 0},
        dislike: {type: Number, default: 0},
        createdAt: {type: Date, default: Date.now}

    }]

}, opts);

userSchema.virtual('url').get(function () {
  return "/blog/" + this.slug;
});

const data = mongoose.model('data', userSchema);

module.exports = data;