'use strict';

module.exports = function(options, imports) {
  var debug = imports.debug('apps:aws-signer');

  var app = imports.server;
  var router = imports.Router();

  var crypto = require('crypto');

// sign data
  router.use('/signer', function (req, res) {
    res.send(crypto
        .createHmac('sha1', process.env.AWS_SECRET_ACCESS_KEY)
        .update(
        new Buffer(req.query.to_sign.toString('base64'))
      )
        .digest('base64')
    );
  });

  debug('.use router');
  app.use('/', router);

  return router;
};
