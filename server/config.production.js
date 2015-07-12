module.exports = {
  host: process.env.IP || process.env.WEBSITE_HOSTNAME,
  port: process.env.PORT || process.env.port || 1337
};
