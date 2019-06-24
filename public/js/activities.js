/* global document, window, feathers, moment, io, $ */

// Establish a Socket.io connection
const socket = io();
// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const client = feathers();

client.configure(feathers.socketio(socket));
// Use localStorage to store our login token
client.configure(feathers.authentication({
  storage: window.localStorage
}));


// Renders a new message and finds the user that belongs to the message
const addActivity = activity => {
  // Find the user belonging to this message or use the anonymous user if not found
  const tiles = $('.tiles');
  tiles.append(`<article class="style1">
                        <span class="image">
                          <img src="images/capimage.jpg" alt="" />
                        </span>
                        <a href="event.html?activity_id=${activity._id}">
                          <h2 class="arrow">${activity.Name}</h2>
                          <div class="content">
                            <h6>${activity.Name}</h6>
                          </div>
                        </a>
                      </article>`);
};

// Shows the activities
const showActivities = async () => {
  // Find the latest 10 messages. They will come with the newest first
  // which is why we have to reverse before adding them
  const activities = await client.service('activity').find({
    query: {
     // $sort: { createdAt: -1 },
      $limit: 10
    }
  });

  activities.data.forEach(addActivity);
};

const setLoginModel = async () => {
  // Get the modal
  var modal = document.getElementById("loginModal");

  // Get the button that opens the modal
  var btn = document.getElementById("loginBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  var emailText = document.getElementById("emailText");

  var emailButton = document.getElementById("emailButton");

  // When the user clicks on the button, open the modal 
  btn.onclick = function() {
    modal.style.display = "block";
    emailButton.innerHTML="Send";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
    emailButton.innerHTML="Send";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      emailButton.innerHTML="Send";
    }
  }

  emailButton.onclick = async () => {
    var userEmail = emailText.value;

    const email = await client.service('email-reminder').create({
        "Email": userEmail,
        "URL": "https://communityhub.azurewebsites.net/activities.html"
      }); 

    emailButton.innerHTML="Sent!";
  }
}

showActivities();

setLoginModel();
