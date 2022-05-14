

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