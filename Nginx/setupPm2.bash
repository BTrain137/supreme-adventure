# pm2 needs work in a folder called source cannot figure any other way
PROJECTNAME="bryankim.com"
GITREPO="https://github.com/BTrain137/supreme-adventure.git"

sudo mkdir -p /var/www/$PROJECTNAME/source
cd /var/www/$PROJECTNAME/source
sudo git init
sudo git remote add origin $GITREPO
sudo chown -R $USER /var/www/$PROJECTNAME

# After initial setup must ssh into repo and provide .env file
