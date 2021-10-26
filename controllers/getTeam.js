const Author = require('../database/models/Author');


module.exports = (req, res)=>{
Author
.find({})
.populate('data') //This populates the author id with actual author information!
.exec(function (err, authors) {
  if (err) return handleError(err);
  res.json(authors);
  // prints "The author is Bob Smith"
})};