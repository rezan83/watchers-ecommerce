#!/bin/bash
# sudo chmod -R 777 /watchers-app
# cd /watchers-app

# export NVM_DIR='$HOME/.nvm'
# [ -s '$NVM_DIR/nvm.sh' ] && \. '$NVM_DIR/nvm.sh'
# [ -s '$NVM_DIR/bash_completion' ] && \. '$NVM_DIR/bash_completion'

# npm install  &&
# # npm run build &&
# #     npm run start
# npm run dev

# Stop all servers and start the server
pm2 stop all

## Start app.ts in watch & restart:
pm2 start --interpreter ts-node /home/ubuntu/watchers-app/src/server.ts --watch
