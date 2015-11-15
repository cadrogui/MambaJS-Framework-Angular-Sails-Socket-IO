# Mamba JS Framework
#### Angular Sails Socket-IO Wrapper

![](http://legalintelligence.cl/logo-mamba.png)

This is a small Sails Socket IO Wrapper to perform promised api calls throught sockets to an SailsJS REST service for AngularJS Framework.

#### Installation
- Load the [sails.io.js](https://github.com/balderdashy/sails.io.js) library
- Include this library in your html main file.

#### Inject in the module in your app

`````
(function () {
    angular.module('App', [
        'MambaJSSailsSocket'
    ])
})();
`````

#### Configuration
In your app configure inject and setup like this:

````
(function () {
  angular
    .module('App')
    .config(configure);

  configure.$inject = ['SocketIOProvider'];

  function configure(SocketIOProvider) {
    SocketIOProvider.config({ url: 'http://localhost:1337'});
  }
})();
`````

In your app run inject like this:

`````
(function () {
    angular
    .module('App')
    .run(runBlock);

    runBlock.$inject = ['SocketIO'];

    function runBlock(SocketIO) {
      SocketIO.connect()
    }

})();
`````

#### Usage in some controller


`````
(function () {
    angular
    .module('App')
    .controller('SomeController', SomeController);

    SomeController.$inject = ['SocketIO'];

    function SomeController(SocketIO) {

        SocketIO.post('/controller/action', { foo: 'bar' })
       .then(function(msg){
            console.log(msg);
        })

        SocketIO.on('someEvent')
        .then(function(res){
            console.log(res);
         })
    }
})();
`````
