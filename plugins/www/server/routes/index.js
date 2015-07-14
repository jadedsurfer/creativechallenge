'use strict';

module.exports = function(options, imports) {
  var debug = imports.debug('apps:www');

  var path = require('path');

  var app = imports.server;
  var router = imports.Router();
  var staticMW = imports.staticMiddleware;
  var view = imports.consolidate;
  var moment = imports.moment;
  var models = imports.models;

  function getPath(file){
    return path.join(__dirname, '../', file);
  }

  debug('configure routes');

  router.get('/', function (req, res, next) {

    var Challenge = models.Challenge;

    Challenge.findOne({where: {state: 'active'}}, function(err, challenge){
      if (err) next();

      view.jade(getPath('views/pages/index.jade'), {
        user: req.user,
        url: req.url,
        challenge: {
          id: challenge.id,
          title: challenge.title,
          submissionDueDate:
            moment(challenge.submissionDueDate).format('MMMM D, YYYY')
        }
      }, function(err, html){
        if (err) throw err;
        res.send(html);
      });
    });
  });

  debug('.use router');
  app.use('/', router);

  debug('serve static files from public dir');
  var pathToStatic = path.join(__dirname, '../../', 'public');
  app.middleware('files', staticMW(pathToStatic));

  return router;
};
