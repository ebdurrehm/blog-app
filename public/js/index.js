

//import EditorJS from "@editorjs/editorjs";



const scrollUp = document.querySelector("#scroll-up");
const burger = document.querySelector("#burger-menu");
const ul = document.querySelector("nav ul");
const nav = document.querySelector("nav");
const header = document.querySelector(".bio");
const sectionOne = document.querySelector(".bio");
const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in");
const stackName = document.getElementById('stack-name');
const stackImage = document.getElementById('stack-image');
const stackBadges = document.getElementById('stack-badges');
const stackowerflow = document.getElementById('stackoverflow');
const myAnswers = document.getElementById('stack-my-answers');
//const editor = EditorJS('editorjs');

scrollUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

burger.addEventListener("click", () => {
  ul.classList.toggle("show");
});
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((link) =>
  link.addEventListener("click", () => {
    ul.classList.remove("show");
  })
);


const sectionOneOptions = {
  rootMargin: "-200px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function(
  entries,
  sectionOneObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      header.classList.add("nav-scrolled");
    } else {
      header.classList.remove("nav-scrolled");
    }
  });
},
sectionOneOptions);

sectionOneObserver.observe(sectionOne);

const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -250px 0px"
};

const appearOnScroll = new IntersectionObserver(function(
  entries,
  appearOnScroll
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

sliders.forEach(slider => {
  appearOnScroll.observe(slider);
});


//get my stackowerflow account details
function getStackOwerflowProfile(){
  axios.get('https://api.stackexchange.com/2.3/users/9080743?order=desc&sort=reputation&site=stackoverflow')
  .then((profile)=>{
    const data = profile.data.items[0];
    stackowerflow.href = data.link;
    stackImage.src = data.profile_image
    stackName.innerHTML = `<b>${data.display_name}</b>`;
    stackBadges.innerHTML = 
   `Reputation:<b>${data.reputation}</b> | Gold: <b>${data.badge_counts.gold}</b> | Silver: <b>${data.badge_counts.silver}</b> | Bronze: <b>${data.badge_counts.bronze}</b>`
   
  })
  .catch((e)=>{
    console.log(e);
  })
}

//get my answers
async function getStackOwerflowAnswers(){
  const answers= await axios.get('https://api.stackexchange.com/2.3/users/9080743/answers?order=desc&sort=activity&site=stackoverflow')
  //return founded answers
  return answers.data.items;
}

//get related questions for the answers
async function getStackOwerflowQuestions(){
  const answers = await getStackOwerflowAnswers();
  console.log(answers);
  const answersQuestion =[];
  //get answer and its question id , get question title
  // by the given question id 
  // push object to an array that holds an object whose properties are the answer and question title
  for (let answer of answers){
    let questionTitle = await axios.get(`https://api.stackexchange.com/2.3/questions/${answer.question_id}?order=desc&sort=activity&site=stackoverflow`);
     
    answersQuestion.push({
       answer: answer,
       title: questionTitle.data.items[0].title
     })
  }
  return answersQuestion;
}

//create answer cards and append them to my-answers div
async function setAnswers(){
  const data = await getStackOwerflowQuestions();
  for(let i=0; i<data.length;i++){
    console.log(data[i]);
    const accepted = `<span style="display:flex; flex-direction:row;align-items:center;background-color:green; padding:3px; color:white;"><ion-icon style="color:white;font-size:20px;" name="checkmark-outline"></ion-icon> accepted</span>`;
    const html =`
     <div style="margin:20px; display:flex; flex-direction:row;gap:10px;">
     <a style="color:orange;" href="https://stackoverflow.com/a/${data[i].answer.answer_id}">${data[i].title}</a>
     <span class="answer-score">    |     Answer score: <b>${data[i].answer.score}</b> ${data[i].answer.is_accepted?accepted:''}</span>
     </div>
    `
    const answerCard = document.createElement('div');
    answerCard.className ="answer-card";
    answerCard.innerHTML = html;
    myAnswers.appendChild(answerCard);
  }
 
}

getStackOwerflowProfile();
setAnswers();
/*
========================================================================================================================
*/
//live chat template logic
var socket = io();



  var INDEX = 0; 
  var username;
  var email;
  $("#user-submit").click(function(e) {
    e.preventDefault();
    username = $("#username").val(); 
    email = $("#chat-email").val(); 
    socket.emit('user_joined',{
      username:username,
      email:email
    })
  })

  $("#chat-submit").click(function(e) {
    e.preventDefault();
    var msg = $("#chat-input").val();
    var date = new Date();
    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    if(msg.trim() == ''){
      return false;
    }
    const dataObj = {
      "message":msg,
      "username": username,
      "email":email,
      "time":time
    }
    generate_message_self(dataObj);
    socket.emit('chat', dataObj);   
  })
  socket.on('admin_messages',(serverData)=>{
    console.log(serverData)
    generate_message_user(serverData);
    
  })
  
  function generate_message_self(data) {
  
    INDEX++;
    var myImage="https://cdn1.vectorstock.com/i/1000x1000/29/90/chat-bubble-with-avatar-vector-13582990.jpg";
    var str=`
    <div class="self-msg">
    <p>${data.time}</p>
      <div class="msg-body-1">
      <p><b>${data.username}</b></p>
      <p>${data.message}</p>
      </div>
      <div>
    <img id="msg-img" src="${myImage}"/>
      </div>
    </div>
    `

    $(".chat-logs").append(str);
    $("#cm-msg-"+INDEX).fadeIn(400);
   
     $("#chat-input").val(''); 
      
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000); 
    const msgSendSound = new Audio('https://cdn.freesound.org/previews/315/315878_2075047-lq.ogg');
    msgSendSound.play();
      
  }  

  function generate_message_user(data) {
    
    INDEX++;
    var userImage="https://cdn1.iconfinder.com/data/icons/ui-color/512/Untitled-4-512.png";

    var messageHTML=`
    <div class="user-msg">
    <div>
    <img id="msg-img" src="${userImage}"/>
      </div>
    
      <div class="msg-body-2">
      <p><b>${data.username}</b></p>
      <p>${data.message}</p>
      </div>
      <p>${data.time}</p>
    </div>
    `
  
            //create new message item on the chat log
    $(".chat-logs").append(messageHTML);
    $("#cm-msg-"+INDEX).hide().fadeIn(300);

    //clean the input
     $("#chat-input").val(''); 

    //scroll to bottom
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000); 
     //play audio the sound when a new message receive
     var msgSignal = new Audio('https://cdn.freesound.org/previews/537/537061_7117640-lq.ogg');
     msgSignal.play();
  } 
  
 
  //show chat box
  $("#chat-circle").click(function() {    
    $("#chat-circle").toggle('s');
    $(".chat-box").toggle('s');
  })
  $("#user-submit").click(function() { 
    $("#chat-form").toggle('s');   
    $(".chat-logs").toggle('s');
    $("#chat-input").toggle('s');
    
  })
  
  //close chat box
  $(".chat-box-toggle").click(function() {
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  })
  


