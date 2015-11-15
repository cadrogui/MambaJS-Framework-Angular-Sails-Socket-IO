(function(){
  angular
    .module('MambaJSSailsSocket', [])
    .factory('io', io)
    .provider('SocketIO', SocketIOProvider)

  io.$inject = ['$window']

  function io($window){

    if(!$window.io){
      throw new Error('Sails Socket.io not found');
      return angular.noop;
    }else{
      return $window.io;
    }
  }

  function SocketIOProvider(){

    var self = this;

    self.$get = Socket;
    self.opts = {};
    self.config = config;

    function config(opts){
      self.opts = opts;
    }

    function Socket(io, $q, $timeout){

      var service = {
        connect: connect,
        on: on,
        post: post,
        get: get
      }

      return service;

      function validateUrl(url){
        if(url){
          url = url.replace(/^(.+)\/*\s*$/, '$1');
          if (typeof url !== 'string') {
              throw new Error('Invalid or missing URL!\n');
          }else{
            return url;
          }
        }else{
          throw new Error('Invalid or missing URL!\n');
        }
      }

      function connect(){
        io.sails.url = validateUrl(self.opts.url);
      }

      function on(event){
        var deferred = $q.defer();

        io.socket.on(event, function onServerSentEvent (response){
          deferred.resolve({
            SocketResponse: response
          })
        })

        return deferred.promise;
      }

      function post(path, data){
        var deferred = $q.defer();

        io.socket.post(validateUrl(path), data, function(response){
          deferred.resolve({
            SocketResponse: response
          })
        });

        return deferred.promise;
      }

      function get(path, data){
        var deferred = $q.defer();

        io.socket.get(validateUrl(path), data, function(response){
          deferred.resolve({
            SocketResponse: response
          })
        });

        return deferred.promise;
      }

    }

  }

})()
