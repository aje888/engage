
module.exports = function(io) {
  io.use(function (socket, next) {

      // If NODE_ENV is not production then we are not on Azure
      // and so the client header's won't exist. Force our username
      // to be a test one.
      if (process.env.NODE_ENV !== 'production') {
        socket.feathers.userId   = '12345';
        socket.feathers.userName = 'fred@capgemini.com';
      }
      else {
        socket.feathers.userId   = socket.request.headers["x-ms-client-principal-id"];
        socket.feathers.userName = socket.request.headers["x-ms-client-principal-name"];
      }

      if( ! socket.feathers.userId ) {
        socket.feathers.userId = '0';
        socket.feathers.userName = 'Anonymous';
      }

  /*    if( ! socket.feathers.userName.includes('@capgemini.com')) {
        // If the user isn't @capgemini.com then we're not interested.
        return next(new Error("User >" + socket.feathers.userName + "< denied socket connection. "));
      }
      else {*/
        return next();
  /*    }*/
  });
};
