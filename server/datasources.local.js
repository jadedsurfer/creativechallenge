module.exports = {
  'mongolab': {
    'name': 'mongolab',
    'connector': 'mongodb',
    'url': 'mongodb://' + process.env.MONGOLAB_USER + ':' + process.env.MONGOLAB_PASSWORD + '@ds036698.mongolab.com:36698/creativechallenge',
    'debug': true
  }
};
