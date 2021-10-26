const html = document.querySelector('#content');
const tmp = html.textContent;
html.innerHTML = tmp;
document.querySelectorAll( 'oembed[url]' ).forEach( element => {
        // Create the <a href="..." class="embedly-card"></a> element that Embedly uses
        // to discover the media.
        const anchor = document.createElement( 'a' );

        anchor.setAttribute( 'href', element.getAttribute( 'url' ) );
        anchor.className = 'embedly-card';

        element.appendChild( anchor );
    } );

    var elem = document.getElementById('coverScreen');
    window.addEventListener('load', (event) =>{
        elem.style="display:none;";})

        function readingTime() {
            const text = document.getElementById("content").innerText;
            const avgReadingTime = 225; //avarage adult reading time per minute
            const words = text.trim().split(/\s+/).length;// remove whitespace and separate this words, add this words to array and return array length
            const time = Math.ceil(words / avgReadingTime);
            document.getElementById("readTime").innerText = time;
          }
          readingTime();
