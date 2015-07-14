'use strict';

module.exports = function(options, imports) {
  var debug = imports.debug('apps:submissions');

  var path = require('path');

  var app = imports.server;
  var router = imports.Router();
  var models = imports.models;
  var moment = imports.moment;
  var view = imports.consolidate;
  var staticMW = imports.staticMiddleware;

  function getPath(file){
    return path.join(__dirname, '../', file);
  }

  debug('configure routes');

  router.get('/challenges/:challengeId/submissions', function (req, res, next) {

    var Challenge = models.Challenge;

    Challenge.findOne({
        where: {_id: req.challengeId},
        include: ['submissions']
      },
      function(err, challenge){
        if (err) next();

        var challengeJSON = challenge.toJSON();

        debug('%O', challengeJSON);

        challengeJSON.submissionDueDate =
          moment(challenge.submissionDueDate).format('MMMM D, YYYY');

        view.jade(getPath('views/pages/submissions.jade'), {
          user: req.user,
          url: req.url,
          challenge: challengeJSON
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
