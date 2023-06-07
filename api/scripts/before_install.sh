#!/bin/bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 16

DIR="/home/ubuntu/watchers-app"
if [ -d "$DIR" ]; then
    echo "directory already there"
else
    mkdir ${DIR}
fi
