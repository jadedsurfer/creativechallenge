'use strict';

/* global casper */

casper.test.begin('Singup', function suite(test){
  casper.start('http://localhost:3000/signup', function(){
    test.assertTitle('Creative Challenge', 'Finds page title ');
  });
  casper.run(function(){
    test.done();
  });
});
