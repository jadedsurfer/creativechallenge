/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/

// Get the code you want to test
var spa = require('../index');

// Test suite
console.log('test spa/index.js');
describe('setUpOptions', function(){

  it('uses defaults when options are not provided', function(){

    var expected = {
      mountIndexHtmlToRoute: '/index',
      mountBuildJsToRoute: '/js/build.js',
      relativePathToEntryHtml: '../../client/index.html',
      relativePathToEntryJs: '../../client/app/js/app.js',
      staticRoot: '/client/'
    };

    var options = spa.setUpOptions({});

    expect(options).toEqual(expected);

  });

  it('uses configured options when provided', function(){
    var expected = {
      mountIndexHtmlToRoute: '/mountIndexHtmlToRoute',
      mountBuildJsToRoute: '/mountBuildJsToRoute.js',
      relativePathToEntryHtml: 'relativePathToEntryHtml.html',
      relativePathToEntryJs: 'relativePathToEntryJs.js',
      staticRoot: '/staticRoot'
    };
    var options = spa.setUpOptions(expected);

    expect(options).toEqual(expected);
  });

});

describe('resolvePaths', function(){

  it('resolves the full path for relative paths in the options', function(){

    var path = require('path');

    var options = {
      mountIndexHtmlToRoute: '/index',
      mountBuildJsToRoute: '/js/build.js',
      relativePathToEntryHtml: '../../client/index.html',
      relativePathToEntryJs: '../../client/app/js/app.js',
      staticRoot: '/client/'
    };

    var expected = {
      mountIndexHtmlToRoute: '/index',
      mountBuildJsToRoute: '/js/build.js',
      relativePathToEntryHtml: '../../client/index.html',
      relativePathToEntryJs: '../../client/app/js/app.js',
      staticRoot: '/client/',
      pathToEntryHtml: path.join(__dirname, '../../../../client/index.html'),
      pathToEntryJs: path.join(__dirname, '../../../../client/app/js/app.js')
    };

    var actual = spa.resolvePaths(options);

    expect(actual).toEqual(expected);

  });

});

describe('setUpRouter', function(){

  var router;
  var staticMiddleware;
  var options;

  beforeEach(function(){

    // mock other injected dependencies
    router = {
      routes: {},
      get: function(mountPoint, path){
        this.routes[mountPoint] = path;
      },
      use: function(mountPoint, path){
        this.routes[mountPoint] = path;
      }
    };
    staticMiddleware = function(path){
      return path;
    };
    options = {
      mountIndexHtmlToRoute: '/index',
      mountBuildJsToRoute: '/js/build.js',
      staticRoot: '/client/',
      pathToEntryHtml: '../../../../client/index.html',
      pathToEntryJs: '../../../../client/app/js/app.js'
    };

    spyOn(spa, 'serveHtml').and.callFake(function(path){
      return path;
    });
    spyOn(spa, 'serveBrowserified').and.callFake(function(path){
      return path;
    });

    router = spa.setUpRouter(router, staticMiddleware, options);

  });

  it('mounts 3 paths', function(){
    expect(Object.keys(router.routes).length).toEqual(3);
  });

  it('mounts html entry point', function(){
    expect(router.routes[options.mountIndexHtmlToRoute]).toEqual(
      options.pathToEntryHtml);
  });

  it('mounts js entry point', function(){
    expect(router.routes[options.mountBuildJsToRoute]).toEqual(
      options.pathToEntryJs);
  });

  it('mounts static route', function(){
    expect(router.routes['/']).toEqual(
      options.staticRoot);
  });


});

describe('serveHtml', function(){

  it('returns a function', function(){
    var returned = spa.serveHtml('');
    expect(returned).toEqual(jasmine.any(Function));
  });

});

describe('serveBrowserified', function(){

  it('returns a function', function(){
    var returned = spa.serveBrowserified('');
    expect(returned).toEqual(jasmine.any(Function));
  });

});

