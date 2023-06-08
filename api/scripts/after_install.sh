#!/bin/bash

sudo chmod -R 777 /home/ubuntu/watchers-app
cd /home/ubuntu/watchers-app

sudo npm install

# if pgrep ts-node; then pkill ts-node; fi
# if pgrep node; then pkill node; fi
