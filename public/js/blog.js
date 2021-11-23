var elem = document.getElementById('coverScreen');
    var postSize=0;
    //window.location.search = ?page=2 and regex extract number from here
    var currentPage=window.location.search !==''?window.location.search.match(/\d+/)[0]:1;
    console.log(currentPage);
    window.addEventListener('load', (event) =>{
        axios.get('/blog.json')
        .then((size)=>{
          postSize=size.data;
          console.log(`post: ${postSize}`)
          for(var i=1; i<=Math.round(postSize/5);i++){
            var btnPage = document.getElementById('pageBtn');
            var html = '<a href="/blog?page='+i+'" id="'+i+'">'+ i+ '</a>';
            var elem = document.createElement("div");
            elem.innerHTML=html;
            elem.classList.add('btnStyle');
            btnPage.appendChild(elem);
    
         }
         document.getElementById(currentPage).style="color:white;";
         document.getElementById(currentPage).parentElement.style="background-color: crimson; color:white;";
        })
        .catch(
          (error)=>{
            console.log(error);
          }
        )
        elem.style="display:none;";})

       
     