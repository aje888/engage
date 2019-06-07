
## Installing and Starting the Server

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install dependencies

    ```
    cd path/to/csrweb
    npm install
    ```

3. Start app

    ```
    npm start
    ```

4. Goto to browser and go to [localhost:3030](http://localhost:3030/)


## API Development

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g feathers-cli             # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers generate model                 # Generate a new Model
$ feathers help                           # Show all commands
```

## Web Development

The easiest way to use the API from the web site is using the feathers client which is detailed below. For all commands it is possible to use vanilla HTTP if necessary which is detailed [here](https://docs.feathersjs.com/api/client/rest.html#http-api).

### How to use the Feathers client

1. Include the following script dependency in your HTML

```
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/core-js/2.1.4/core.min.js"></script>
<script src="//unpkg.com/@feathersjs/client@^3.0.0/dist/feathers.js"></script>
<script src="//unpkg.com/socket.io-client@1.7.3/dist/socket.io.js"></script>
```

2. Within your website script, create the feathers client object and connect to the API

```
// Establish a Socket.io connection
const socket = io();
// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const client = feathers();
// Set up Socket.io client with the socket
client.configure(feathers.socketio(socket));
```

3. The **client** object can now be used to contact the API.

For example, the following would get all activities.

```
const activities = await client.service('activity').find();
```


### Community Hub API

API documentation is available at /docs (i.e. when starting locally it will be [http://localhost:3030/docs](http://localhost:3030/docs)).

Each service (API end point) has the standard Feathers service methods as detailed [here](https://docs.feathersjs.com/api/databases/common.html).

#### Examples

* Finding / Querying

Get the first 20 activities ordered by createdAt descending.

```
const activity = await client.service('activity').find({
  query: {
    $sort: { createdAt: -1 },
    $limit: 20
  }
});
```

Some services are paginated which means each call returns fixed number of records as determined by the limit and further calls must be made using $offset. For example, the above call would give the first 20 results, the second 20 can be obtained by doing:

```
const activity = await client.service('activity').find({
  query: {
    $sort: { createdAt: -1 },
    $limit: 20,
    $offset: 20
  }
});
```

Full details are available [here](https://docs.feathersjs.com/api/databases/common.html#pagination).

If a service has pagination the results will return with a total to tell you how many calls are required to get the full number of records. For example:


```
{
    "total": 3,
    "limit": 10,
    "skip": 0,
    "data": [
        {
            "name": "Test Activity",
            "_id": "1wlyMjmIU6mkUNhX"
        },
        {
            "name": "Test Activity",
            "_id": "KF1wdHf6uA8Z28YN"
        },
        {
            "name": "Test Activity",
            "_id": "SDQ39AM83t3hQsDH"
        }
    ]
}
```

If pagination is not enabled the data will be returned directly:

```
[
  {
      "name": "Test Activity",
      "_id": "1wlyMjmIU6mkUNhX"
  },
  {
      "name": "Test Activity",
      "_id": "KF1wdHf6uA8Z28YN"
  },
  {
      "name": "Test Activity",
      "_id": "SDQ39AM83t3hQsDH"
  }
]
```

* Getting specific records

All services have an \_id field which uniquely identifies the record. This can be used to retrieve the record:

```
const activity = await client.service('activity').get("SDQ39AM83t3hQsDH");
```

* Create records

```

const activity = await client.service('activity').create(
  {
    "Name": "Activity Name",
    "Description": "Activity Description",
    "Type": "Charity",
    "LogoLink": "http://www.mylogo.com",
    "TwitterHashtags": "#LegoLeague",
    "EventHubId": "123",
    "EventHubHashtags": "#LegoLeague",
    "FollowLink": "http://www.microsoftteams.com",
    "VolunteerLink": "http://www.microsoftforms.com",
    "TimePeriod": "Jan-Jun 2020",
    "ContactList": "John and Jane Smith",
    "InfoLink": "http://www.findoutmorehere.com"
  }
);
```

This call will return the created activity. The \_id field is created automatically and returned in the call.

* Update records

This is a complete replacement of all fields with that provided in the data.

```
const activity = await client.service('activity').update("SDQ39AM83t3hQsDH",
  {
    "Name": "Activity Name",
    "Description": "Activity Description",
    "Type": "Charity",
    "LogoLink": "http://www.mylogo.com",
    "TwitterHashtags": "#LegoLeague",
    "EventHubId": "123",
    "EventHubHashtags": "#LegoLeague",
    "FollowLink": "http://www.microsoftteams.com",
    "VolunteerLink": "http://www.microsoftforms.com",
    "TimePeriod": "Jan-Jun 2020",
    "ContactList": "John and Jane Smith",
    "InfoLink": "http://www.findoutmorehere.com"
  }
);
```

* Patch records

This merged existing and new data of an existing records.

```
const activity = await client.service('activity').patch("SDQ39AM83t3hQsDH",
  {
    "VolunteerLink": "http://www.microsoftforms.com",
    "TimePeriod": "Jan-Jun 2020"
  }
);
```

* Delete records

```
const activity = await client.service('activity').remove("SDQ39AM83t3hQsDH");
```

#### Querying

For all services it is possible to do basic querying to search for records. Documentation is available [here](https://docs.feathersjs.com/api/databases/querying.html).

For example, the following would get all activities with a type of 'Charity':

```
const activity = await client.service('activity').find({
  query: {
    Type: "Charity"
  }
});
```
