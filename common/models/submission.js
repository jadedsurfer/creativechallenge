module.exports = function(Submission) {

  Submission.definition.properties.created.default = Date.now;

};
