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
              <button class="comment-like"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> 99</button>
              <button class="comment-dislike"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i> 149</button>
              <button class="comment-reply reply-popup"><i class="fa fa-reply-all" aria-hidden="true"></i>
                Reply</button>
            </div></div>`;
    const elem = document.createElement('div');
    elem.innerHTML = html;
    const comment = document.getElementById('comment');
    comment.insertBefore(elem, addComment);
    console.log(totalComment.value)
    totalComment.innerText = parseInt(totalComment.innerText) + 1;
    axios.post('https://ahmadow.azurewebsites.net/comment', { id, name, email, text })
        .then((response) => {
            console.log(response.data)

        })
        .catch((error) => {
            console.log(error);
        })

}


function like (){
    const likeBtn = document.getElementsByClassName('comment-like');
    //under development
}
