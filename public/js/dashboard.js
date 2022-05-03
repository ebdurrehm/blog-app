

//editor for creating post
CKEDITOR.replace('editor1');


var body = document.querySelector("body");
var x = document.getElementById('x');


function display(modals) {
  var modal = document.getElementById(modals);
  modal.style.display = "block";
  modal.style.opacity = "1";

}
//hide modal when click X 
function hide(modalid) {
  var modal = document.getElementById(modalid);
  modal.style.display = "none";
}

//search post
function searchPost(elem, method, event){
  var keyword = document.getElementById('keyword').value;
  var f0 = document.getElementById(elem);
  var url = f0.getAttribute('action');

  event.preventDefault();
    axios.get(url, { params: { keyword: keyword } })
      .then((response) => {
        //display main container of the returned posts
        document.getElementById('response').style.display = "flex";
        console.log(response.data);
        //hide searching form because the posts displaying
        document.getElementById('searchPost').style.display = "none";

        // Create elements on the DOM as many as 
        //the number of objects in the list that were returned by response
        for (var i = 0; i < response.data.length; i++) {
          //create post's html and pass data that comes from database
          var html = '<div class="up-del">' +
            '<a class="upd-a" id="upd-a" href="/admin/update/' + response.data[i]._id + '" onclick="displayUpdateEditor(event)"><i class="fas fa-pen-square icon upd-a"></i> Update</a>' +
            '<a id="del-a" class="del-a" href="/admin/delete/' + response.data[i]._id + '" onclick="deletePost(event,this)"><i class="fas fa-minus-square icon del-a"></i> Delete</a></div>' + '<div class="postImage">'
            + '<img class="imgPost" src="' + response.data[i].image +
            '"></div><div class="postInfo"><h4 class="postTitle">'
            + response.data[i].title +
            '</h4><p class="postDate text" >'
            + response.data[i].date +
            '</p><p class="postDesc text">' + response.data[i].description + '</p></div>'
          //create post div
          var div = document.createElement('div');
          div.className = "responsePost";
          div.innerHTML = html;
          //add created div to main container div
          document.getElementById('response').appendChild(div);

        }
      })
      .catch((error) => {
        document.getElementById("failure").style.display = "block";
        document.getElementById('fail-msg').innerText = error;
        setInterval(() => {
          document.getElementById('failure').style.display = "none";
        }, 4000);
        console.log(error);
      })
  
}

function request(elem, method, event) {
  var f0 = document.getElementById(elem);
  var url = f0.getAttribute('action');

  event.preventDefault();
  CKEDITOR.instances.editor1.updateElement(); //update textarea with editor text
  //create formdata object
  var formdata = new FormData(f0);
  console.log(formdata.content);

 
    axios.post(url, formdata).then(
      function (response) {
        var modal = document.getElementById("success");
        //display success modal
        modal.style.display = "block";
        console.log(response.data);
        //assaign the link of the new post to modal a elment
        document.getElementById('new').href = response.data.url;
      }
    ).catch(function (error) {
      //when an error occur, display error message to the user
      document.getElementById("failure").style.display = "block";
      document.getElementById('fail-msg').innerText = error;
      //after 4 second hide error message
      setInterval(() => {
        document.getElementById('failure').style.display = "none";
      }, 4000);
      console.log(error);
    })
  
}

//post delete function     
function deletePost(event, element) {
  //stop refreshing page or opening new page
  event.preventDefault();
  // get url for sending query to database with axios
  var url = document.getElementById('del-a').href;
  console.log(url);
  axios.get(url).then(
    (response) => {
      //Get the main div element where the clicked element is located,
      // which contains the post information
      var postDiv = element.closest("#response>div");
      //and delete this element because this post was deleted on the database
      console.log(element.id)
      postDiv.remove();
      console.log("the response>" + response)
      var modal = document.getElementById("success");
      modal.style.display = "block";
      var scsMsg = document.getElementById('scsMsg');
      console.log(response.data);
      scsMsg.innerText = response.data;


    }
  ).catch(
    (error) => {
      document.getElementById("failure").style.display = "block";
      document.getElementById('fail-msg').innerText = error;
      setInterval(() => {
        document.getElementById('failure').style.display = "none";
      }, 4000);
    }
  )

}

//display editing modal
function displayUpdateEditor(event) {
  event.preventDefault();
  document.getElementById('updatePost').style.display = "block";

}
//update post
function updatePost(event, element) {

  event.preventDefault();
  var form = document.getElementById('updateForm');
  document.getElementById('updatePost').style.display = "none";
  //update textarea with editor text
  CKEDITOR.instances.editor1.updateElement();
  const formdata = new FormData(form);
  var url = document.getElementById('upd-a').href;
  var modal = document.getElementById("success");
  var scsMsg = document.getElementById('scsMsg');

  axios.post(url, formdata)
    .then((response) => {
      modal.style.display = "block";
      console.log(response.data);
      scsMsg.innerText = response.data;
      document.getElementById('response').innerHTML = "";
      request('searchPost', 'get', event)
    })
    .catch((error) => {
      document.getElementById("failure").style.display = "block";
      document.getElementById('fail-msg').innerText = error;
      setInterval(() => {
        document.getElementById('failure').style.display = "none";
      }, 4000);
    })
}





