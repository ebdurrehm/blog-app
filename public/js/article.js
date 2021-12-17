

const html = document.querySelector('#content');
const tmp = html.textContent;
const id = document.getElementById('id').value;

html.innerHTML = tmp;
document.querySelectorAll('oembed[url]').forEach(element => {
    // Create the <a href="..." class="embedly-card"></a> element that Embedly uses
    // to discover the media.
    const anchor = document.createElement('a');

    anchor.setAttribute('href', element.getAttribute('url'));
    anchor.className = 'embedly-card';

    element.appendChild(anchor);
});

var elem = document.getElementById('coverScreen');
window.addEventListener('load', (event) => {
    elem.style = "display:none;";
})

function readingTime() {
    const text = document.getElementById("content").innerText;
    const avgReadingTime = 225; //avarage adult reading time per minute
    const words = text.trim().split(/\s+/).length;// remove whitespace and separate this words, add this words to array and return array length
    const time = Math.ceil(words / avgReadingTime);
    document.getElementById("readTime").innerText = time;
}
readingTime();


function addComment() {
    const addComment = document.getElementById('addComment');
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const text = document.getElementById('text').value;
    const totalComment = document.getElementById('totalComment');
    const date = new Date();
    const html = `
            <div class="comment-box" >
              <span class="commenter-pic">
               </span>
            <span class="commenter-name">
              <a href="#">${name}</a> <span
                class="comment-time">${date.toLocaleString()}</span>
            </span>
            <p class="comment-txt more">${text}</p>
            <div class="comment-meta">
              <button class="comment-like"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> 0</button>
              <button class="comment-dislike"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i> 0</button>
              <button class="comment-reply reply-popup"><i class="fa fa-reply-all" aria-hidden="true"></i>
                Reply</button>
            </div></div>`;
    const elem = document.createElement('div');
    elem.innerHTML = html;
    const comment = document.getElementById('comment');
    comment.insertBefore(elem, addComment);
    console.log(totalComment.value)
    totalComment.innerText = parseInt(totalComment.innerText) + 1;
<<<<<<< HEAD
    axios.post('http://localhost:3000/comment', { id, name, email, text })
=======
    axios.post('https://ahmadow.azurewebsites.net/comment', { id, name, email, text })
>>>>>>> ba283c6a13942b0e05b747f9d2435aa394feff6d
        .then((response) => {
            console.log(response.data)

        })
        .catch((error) => {
            console.log(error);
        })

}

let boolean = false;
let isLike = false;
function like() {

    window.onclick = (e) => {
<<<<<<< HEAD

        const baseUrl = 'http://localhost:3000/like';
=======
        const baseUrl = 'https://ahmadow.azurewebsites.net/like';
>>>>>>> ba283c6a13942b0e05b747f9d2435aa394feff6d
        boolean = !boolean;
        e.target.style.color = boolean ? 'blue' : 'black';
        let commentId = e.target.getAttribute('data-id');
        console.log(commentId)
        let likeCount = e.target.innerText;
        let like = boolean ? parseInt(likeCount) + 1 : parseInt(likeCount) !== 0 ? parseInt(likeCount) - 1 : 0;
        console.log(like)

        if (commentId !== null && commentId !== NaN) {
            e.target.innerText = like;
            axios.get(baseUrl, { params: { count: like, id: commentId, isLike: !isLike } })
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

}


function dislike() {


    window.onclick = (e) => {
        const baseUrl = 'https://ahmadow.azurewebsites.net/dislike';
        boolean = !boolean;
        let commentId = e.target.getAttribute('data-id');
        console.log(commentId)
        let disLikeCount = e.target.innerText;
        let disLike = boolean ? parseInt(disLikeCount) + 1 : parseInt(disLikeCount) !== 0 ? parseInt(disLikeCount) - 1 : 0;
        console.log(disLike)

        if (commentId !== null && commentId !== NaN) {
            e.target.innerText = disLike;

            axios.get(baseUrl, { params: { count: disLike, id: commentId, isLike: isLike } })
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

}
let isClicked = false;
function likePost() {
    isClicked = !isClicked;
    const likeBtn = document.getElementById('likePost');
    likeBtn.style.color = isClicked ? 'crimson' : 'gray';


    const Btn = document.getElementById('postLike');
    const baseUrl = 'https://ahmadow.azurewebsites.net/postlike';




    let count = parseInt(Btn.innerText);
    let like = isClicked ? count + 1 : count !== 0 ? count - 1 : 0;
    Btn.innerText = like;
    console.log(like);
    axios.get(baseUrl, { params: { likes: like, id: id } })
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        })

}


let isRead = true;
function countRead() {
    const baseUrl = 'https://ahmadow.azurewebsites.net/postread';
    let countRead = document.getElementById('countRead');
    let s = document.getElementById('numb');


    let read = countRead.innerText = isRead ? parseInt(countRead.innerText) + 1 : parseInt(countRead.innerText);

    s.innerText = countRead.innerText;
    if (isRead) {
        axios.get(baseUrl, { params: { readCount: read, id: id } })
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    isRead = false;
}


