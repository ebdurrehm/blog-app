/*
========================================================================================================================
*/
//live chat template logic
var socket = io();
const adminClient = {};
adminClient.init = function(){


  socket.on('users',(users)=>{
    
    console.log(users);
    const rooms = document.getElementById('rooms');
    rooms.innerHTML = `${users.map(user=>`
    <li class="clearfix" data-id="${user.id}" onclick="adminClient.showMessages(this.dataset.id)">
    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar">
    <div class="about">
        <div class="name">${user.username}</div>
        <div class="status"> <i class="fa fa-circle offline"></i> left 7 mins ago </div>                                            
    </div>
</li>`)}`
  })

  socket.on('message-1',(data)=>{
    const msgHistory = document.querySelector('.m-b-0');
    const msg = `
      
      <div class="message-data text-right">
          <span class="message-data-time">${data.time}</span>
          <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar">
      </div>
      <div class="message other-message float-right"> ${data.message}</div>
  
      `
     const element = document.createElement('li');
     element.className = 'clearfix';
     element.innerHTML = msg;
     msgHistory.appendChild(element);
  })
}

  

adminClient.showMessages = function(id){
    console.log(id);
    socket.emit('message',id,(res)=>{
      const msgHistory = document.querySelector('.m-b-0');
      msgHistory.innerHTML = `${res.map(msg=>(`
      <li class="clearfix">
      <div class="message-data text-right">
          <span class="message-data-time">${msg.data.time}</span>
          <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar">
      </div>
      <div class="message other-message float-right"> ${msg.data.message}</div>
  </li>
      `))}`
    });
  }
  adminClient.writeMessage = function(e){
    e.preventDefault();
    const msg = document.getElementById('adminMsg').value;
    const date = new Date();
    const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const msgHistory = document.querySelector('.m-b-0');
    const adminMsg = `
    <div class="message-data">
        <span class="message-data-time">${time}</span>
    </div>
    <div class="message my-message">${msg}</div>                                    
`
    const element = document.createElement('li');
    element.className = 'clearfix';
    element.innerHTML = adminMsg;
    msgHistory.appendChild(element);
    const adminMessage = {
        username:'Abdurrahim (admin)',
        message: msg,
        time: time
    }

    socket.emit('admin_message',adminMessage);

  }

adminClient.init();
