# /etc/nginx/sites-enabled/dev.bryan-kim.com
# ssh -i EC2-wedding.pem -nN -R 8888:localhost:3000 ubuntu@bryan-kim.com

server {
    listen 80;
    listen [::]:80;

    server_name dev.bryan-kim.com www.dev.bryan-kim.com;

    location / {
        proxy_pass http://127.0.0.1:8888;
        
        #default_type text/plain;
        #return 200 "$remote_addr\n";
    }
}
