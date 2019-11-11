// http://pm2.keymetrics.io/docs/usage/application-declaration/
// pm2 kill
// pm2 start ecosystem.config.js --env production
// # /var/www/ecosystem.config.js

module.exports = {
  apps: [
    {
      name: "FantasticHeadBand",
      cwd: "/var/www/fantasticHeadBand/",
      script: "server.js",
      env_production: {
        NODE_ENV: "production",
      }
    },
    {
      name: "bryan-kim.com",
      cwd: "/var/www/bryankim.com/",
      script: "server.js",
      env_production: {
        NODE_ENV: "production",
      }
    },
    {
      name: "shopify-app",
      cwd: "/var/www/shopify-app/",
      script: "server.js",
      env_production: {
        NODE_ENV: "production",
      }
    }
  ]
};
