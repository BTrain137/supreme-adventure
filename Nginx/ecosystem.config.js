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
      },
    },
    {
      name: "bryan-kim.com",
      cwd: "/var/www/bryankim.com/source",
      script: "server.js",
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "shopify-app",
      cwd: "/var/www/shopify-app/",
      script: "server.js",
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
  deploy: {
    "bryan-kim.com" : {
      user: "ubuntu",
      key: "../EC2-wedding.pem",
      host: ["ec2-35-169-209-116.compute-1.amazonaws.com"],
      ref: "origin/master",
      repo: "https://github.com/bryan89tran/supreme-adventure.git",
      path: "/var/www/test",
      "post-deploy":
        "npm install && pm2 startOrRestart ./../../ecosystem.json --env production",
    },
  },
};
