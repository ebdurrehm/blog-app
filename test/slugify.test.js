
const slugify = require('../controllers/slugCreator');

describe('Checking of that the slugify function work correctly', ()=>{
    test('all special characters are replaced', ()=>{
        expect(slugify('şeklin yaxşı olması')).toBe('seklin-yaxsi-olmasi');
    })
    test('all Azerbaijani special characters are replaced', ()=>{
        expect(slugify('əlinin yeni maşını gözəl düzəldilib')).toBe('elinin-yeni-masini-gozel-duzeldilib');
    })
})