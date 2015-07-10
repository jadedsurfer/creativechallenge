module.exports = {
  host: process.env.IP || process.env.WEBSITE_HOSTNAME,
  port: process.env.port || process.env.PORT || 1337
};
