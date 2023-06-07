#!/bin/bash
sudo chmod -R 777 /home/ubuntu/watchers-api
cd /home/ubuntu/watchers-api

export NVM_DIR='$HOME/.nvm'
[ -s '$NVM_DIR/nvm.sh' ] && \. '$NVM_DIR/nvm.sh'
[ -s '$NVM_DIR/bash_completion' ] && \. '$NVM_DIR/bash_completion'

npm install
npm run build &&
    npm run start