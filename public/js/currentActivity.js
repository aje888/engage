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

 function findGetParameter(parameterName) {
                              var result = "",
                                             tmp = [];
                              location.search
                                             .substr(1)
                                             .split("&")
                                             .forEach(function (item) {
                                               tmp = item.split("=");
                                               if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
                                             });
                              return result;
               }

			   

const addActivity = activity => {
  const tiles = $('.tiles');
  tiles.append(`<div id="page-content-wrapper">
					<div class="container-fluid">
						<div class="row">
						<h2>${activity.Name}</h2>
						</div>
						<div class="row">
							<div>
								<img src="images/capgemini2.jpg" style="width: 100%">
							</div>
						</div>
						<div class="row">
							<div class="column leftSmall">
								<div class="row">
									<h3>Contact Details<h3>
									<p>${activity.ContactList}</p>
								</div>
								<div class="row">
									<a class="twitter-timeline" data-height="500" href="https://twitter.com/Capgemini?ref_src=twsrc%5Etfw">Tweets by Capgemini</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>								</div></div>
								<div class="column rightBig">
								<div class="row">
								<h3>About</h3>
								<p>${activity.Description}</p>
								</div>
								<div class="row">
										<a href="https://twitter.com/intent/tweet?button_hashtag=${activity.TwitterHashtags}&ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-show-count="false">Tweet ${activity.TwitterHashtags}</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
										<a href="mailto:izzie.kent@capgemini.com"><h2>Sign Up!</h2></a>
								</div>
								<h3 id="eventHeader">Related Events</h3>
								<div id="eventDiv" class="events"></div>
							</div>
						</div>
					</div>
				</div>`);
};

const showEvents = async events => {

  var eventDiv = $("#eventDiv");

  events.forEach(event => eventDiv.append(`<p>Title: <b>${event.Title}</b>. Where: <b>${event.Town}</b>. When: <b>${event.EventStart}</b>. <a href="${event.LinkToEvent}">Attend</a></p>`));
}

// Shows the current activity
const showActivities = async () => {
  const activity = await client.service('activity').get(findGetParameter("activity_id"));

  addActivity(activity);

  if( activity.events.length > 0 ) {
    showEvents(activity.events);
  }
  else {
    var eventsHeader = document.getElementById("eventHeader");

    eventsHeader.style.display = "none";

    var eventDiv = document.getElementById("eventDiv");

    eventDiv.style.display = "none";
  }
};

showActivities();

