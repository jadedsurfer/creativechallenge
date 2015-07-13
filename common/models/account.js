module.exports = function(Account) {

  Account.definition.properties.created.default = Date.now;

};
