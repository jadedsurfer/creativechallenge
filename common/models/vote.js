module.exports = function(Vote) {

  Vote.definition.properties.created.default = Date.now;

};
