# /etc/nginx/sites-enabled/www.bryan-kim.com

server {
    listen 80 default_server;
    listen [::]:80;

    server_name www.bryam-kim.com;

    #listen 443 ssl;
    #server_name your_domain.com;
    #ssl_certificate /etc/nginx/ssl/nginx.crt;
    #ssl_certificate_key /etc/nginx/ssl/nginx.key;

    location / {
         proxy_pass http://127.0.0.1:8080;
         proxy_http_version 1.1;
         proxy_set_header Upgrade $http_upgrade;
         proxy_set_header Connection 'upgrade';
         proxy_set_header Host $host;
         proxy_cache_bypass $http_upgrade;
    }

    location /remote_addr {
        default_type text/plain;
        return 200 "$remote_addr\n";
    }
}
