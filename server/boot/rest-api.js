module.exports = function mountRestApi(server) {
  console.log('rest');
  var restApiRoot = server.get('restApiRoot');
  server.use(restApiRoot, server.loopback.rest());
};
