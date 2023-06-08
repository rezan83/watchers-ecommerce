#!/bin/bash

# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
# . ~/.nvm/nvm.sh
# nvm install 16

# Install node.js and PM2 globally
sudo apt-get update
sudo apt-get install nodejs-legacy -y
sudo apt-get install npm -y
sudo npm install pm2 -g

# DIR="/watchers-app"
# if [ -d "$DIR" ]; then
#     echo "directory already there"
# else
#     mkdir ${DIR}
# fi
