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
$ sudo NODE_ENV=production node server.js
# The script is stored within the package.json
# "start-server": "NODE_ENV=production node server.js",
# For pm2 to run the script
```

## Pm2
```bash
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
# Configure the file with server and port 80 with the correct server_name
# Also the port that the node server is running on
$ sudo systemctl restart nginx
$ systemctl status nginx.service
# For status of the server and possible error logs
```

## SSL 
```bash
$ sudo certbot --nginx -d fantasticheadband.bryan-kim.com
# The cert box would do all the redirecting 
```