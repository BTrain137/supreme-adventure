# FantasticHeadBand

## - Google domains
Register the subdomain
```
fantasticheadband.bryan-kim.com/
fantasticheadband
```

## Git
```bash
$ git clone <repo> /var/www/fantasticHeadBand
# Login
$ sudo npm install
# The installs scripts should cd into clients and also install
$ cd client npm install && cd ..
# For some reason the production environment isn't set to prod
# had to set the production myself
$ sudo npm run build
# Build the optimize react production version
```

## Pm2
```bash
# Normally the following executes on a local environment 
# to evoke production mode
$ sudo NODE_ENV=production node server.js

## FOLLOWING: optional if pm2 ecosystem is used
## These CMDs are to use to evoke each sub domain

# The script is stored within the package.json
# "start-server": "NODE_ENV=production node server.js",
# For pm2 to run the script
# While still inside the folder fantasticHeadBand
$ pm2 start npm --name FantasticHeadBand -- run start-server
# pm2 start npm --name "{app_name}" -- run {script_name}
$ cd ../bryan-kim.com
$ pm2 start npm --name bryan-kim.com -- run start
# To run other server
```

## Nginx
```bash
$ sudo vim /etc/nginx/site-available/fantasticheadband.bryan-kim.com
```
```conf
# /etc/nginx/sites-enabled/fantasticheadband.bryan-kim.com
server {
    listen 80 default_server;
    listen [::]:80;

    server_name fantasticheadband.bryan-kim.com www.fantasticheadband.bryan-kim.com;

    location / {
         proxy_pass http://127.0.0.1:3001;
         proxy_http_version 1.1;
         proxy_set_header Upgrade $http_upgrade;
         proxy_set_header Connection 'upgrade';
         proxy_set_header Host $host;
         proxy_cache_bypass $http_upgrade;
    }

}
```
```bash
$ sudo ln -s /etc/nginx/sites-available/fantasticheadband.bryan-kim.com /etc/nginx/sites-enabled/
# Creating a sim link so Nginx can read from during startup

$ sudo systemctl restart nginx
$ systemctl status nginx.service
# For status of the server and possible error logs
```

## SSL 
```bash
$ sudo certbot --nginx -d fantasticheadband.bryan-kim.com
# The cert box would do all the redirecting 
```

## Pm2 for many instance
```js
// /var/www/ecosystem.config.js
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
    }
  ]
};
```
```bash
$ pm2 start ecosystem.config.js --env production
```