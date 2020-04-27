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
      name: "bryankim.com",
      cwd: "/var/www/bryankim.com/source",
      script: "server.js",
      env_production: {
        NODE_ENV: "production",
      },
    }
  ],
  deploy: {
    "bryankim.com" : {
      user: "ubuntu",
      key: "../EC2-wedding.pem",
      host: ["ec2-35-169-209-116.compute-1.amazonaws.com"],
      ref: "origin/master",
      repo: "https://github.com/bryan89tran/supreme-adventure.git",
      // Pm2 goes into source folder
      // /var/www/bryankim.com/source
      path: "/var/www/bryankim.com",
      "post-deploy":
        "npm install && pm2 startOrRestart ./../../ecosystem.config.js --env production",
    },
  },
};
