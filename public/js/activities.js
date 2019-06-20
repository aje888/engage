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

showActivities();

