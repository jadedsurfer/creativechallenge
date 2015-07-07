// This is the format to use for browser versions of an architect app
// must have both consumes and provides array even if empty
module.exports = [
  {
    setup: require('architect-debug'),
    consumes:[
    ],
    provides:[
      'debug'
    ]
  },
  {
    setup: require('./plugins/math.js'),
    consumes:[
        'debug'
    ],
    provides:[
      'math'
    ]
},
  {
    setup: require('./plugins/app.js'),
    consumes: [
        'math'
    ],
    provides: [

    ]
  }
];
