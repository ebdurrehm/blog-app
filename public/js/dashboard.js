
  CKEDITOR.replace( 'editor1' );
  

var body = document.querySelector("body");
var x = document.getElementById('x');

function display(modals){
  var modal = document.getElementById(modals);
  modal.style.display = "block";
  modal.style.opacity = "1";

}
//hide modal when click X 
function hide(modalid){
  var modal= document.getElementById(modalid);
  modal.style.display="none";
}


if(window.location.href !=='http://localhost:3000/admin'){
 console.log(window.location.href==='http://localhost:3000/admin');
  var body = document.querySelector("body");
  var modal = document.getElementById("modal");
  modal.style.display = "block";
 
}

function search(form){
          var value = document.getElementsByName('search')[0].value;
          var form = document.getElementById(form);
          var value2 = document.getElementsByName('content')[0].value;
          var action = "http://localhost:3000/admin?"+value+'&'+value2;
        form.action = action;
      }
window.addEventListener('load', ()=>{
  var f0 = document.getElementById('f0');
      var url = f0.getAttribute('action');
      f0.addEventListener('submit', function(event){
        event.preventDefault();
        CKEDITOR.instances.editor1.updateElement(); //update textarea with editor text

        var formdata = new FormData(f0);
        console.log(formdata.content);
        axios.post(url, formdata).then(
          function(response){
            var modal = document.getElementById("success");
            modal.style.display = "block";
            console.log(response.data);
            document.getElementById('new').href=response.data.url;
          }
        ).catch(function(error){
          document.getElementById("failure").style.display="block";
          document.getElementById('fail-msg').innerText=error;
          setInterval(()=>{
            document.getElementById('failure').style.display="none";
          }, 4000);
          console.log(error);
        })
      })
})
      

