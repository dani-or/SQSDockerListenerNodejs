#!/bin/ash
NODE_PATH="/usr/local/lib/node_modules" >> ${ENV}
git config --global user.email "dockers@nequi.com.co" 
nequi-ci getenvivar -l -f -s ${STAGE} -x -e >> ${ENV}
source ${ENV}
echo "Starting Node.Js app"
node /usr/src/app/index.js
echo "Node.Js app ended"