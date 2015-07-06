/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/

// Get the code you want to test
var mountApps = require('../boot/spa.js');

// Test suite
console.log('test spa.js');
describe('mountApps', function(){

  var router;
  var server;

  beforeEach(function(){
    router = {
      get: function(path, controller){},
      use: function(path, controller){}
    };
    server = {
      loopback: {
        Router: function(){
         return router;
        },
        static: function(path){}
      },
      use: function(path, router){}
    };
    spyOn(router, 'get');
    spyOn(router, 'use');
    spyOn(server, 'use');
    mountApps(server);
  });

  it('mounts three routes', function(){
    expect(router.get.calls.count()).toEqual(2);
    expect(router.use.calls.count()).toEqual(1);
  });

});


