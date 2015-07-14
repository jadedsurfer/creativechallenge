'use strict';

/* global casper */

casper.test.begin('Index', function suite(test){
  casper.start('http://localhost:3000/', function(){
    test.assertTitle('Creative Challenge', 'Finds page title ');
  });
  casper.run(function(){
    test.done();
  });
});
