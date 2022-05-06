module.exports = (req,res)=>{
    const cv = `${__dirname}/../public/files/cv.pdf`;
    res.download(cv);
}