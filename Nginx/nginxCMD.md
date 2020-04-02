systemctl status nginx.service
pm2 start ecosystem.config.js --env production

git pull origin master && npm run build && pm2 restart shopify